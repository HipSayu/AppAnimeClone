import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';

import { getDataStorage } from '~/Common/getDataStorage';
import Popup from '~/Common/Constanst';
import Loading from '~/Components/Adicator/Loading';

const DataNav = [
    { Image: require('~/Assets/Icon/IconNav/List.png'), Name: 'Mục lục' },
    { Image: require('~/Assets/Icon/IconNav/Clock.png'), Name: 'Lịch Chiếu' },
    { Image: require('~/Assets/Icon/IconNav/RetroTV.png'), Name: 'Xếp hạng' },
    { Image: require('~/Assets/Icon/IconNav/MembershipCard.png'), Name: 'Premium' },
];

export default function AnimeHomePage() {
    const [userInfor, setUserInfor] = useState(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const getAnime = useSelector((state) => state.GetAnimeHomeReducer);
    let anime = getAnime.Animes;
    let isloadingAnime = getAnime.isLoading;
    let error = getAnime.error;

    const getAnimeContinuce = useSelector((state) => state.getAnimeContinuceReducer);
    let animeContinuce = getAnimeContinuce.animes;

    const login = useSelector((state) => state.loginReducer);
    let isLogin = login.isLogin;

    useEffect(() => {
        getDataStorage('my_login')
            .then((data) => {
                setUserInfor(data);
            })
            .catch((error) => {
                Popup('Error Read Login', error.message);
            });
    }, [login]);

    console.log('userInfor', userInfor);

    useEffect(() => {
        if (isLogin || userInfor != null) {
            dispatch({
                type: 'GET_ANIME_CONTINUCE_RESQUEST',
            });
        }
        dispatch({
            type: 'GET_ANIME_HOME_RESQUEST',
        });
    }, [isLogin, userInfor]);

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: Error Network</Text>
            </View>
        );
    }
    return (
        <View style={[styles.Page, { backgroundColor: 'white' }]}>
            {/* Header Title */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image */}
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground
                        borderRadius={5}
                        style={{
                            width: windowWidth / 1.05,
                            height: 173,
                            marginTop: 10,
                            flexDirection: 'column-reverse',
                        }}
                        source={require('~/Assets/Image/SoloLeveling.jpeg')}
                    >
                        <Text style={[GlobalStyles.h4, { marginLeft: 5, marginBottom: 5, color: '#454545' }]}>
                            Chỉ mình tôi thăng cấp
                        </Text>
                    </ImageBackground>
                </View>
                {/* Nav */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                    }}
                >
                    {DataNav.map((item, index) => (
                        <View style={{ alignItems: 'center', marginHorizontal: 10 }} key={index}>
                            <ImageBackground source={item.Image} style={{ width: 50, height: 50 }} />
                            <Text style={GlobalStyles.h4_Medium}>{item.Name}</Text>
                        </View>
                    ))}
                </View>
                {/* Tiếp tục */}
                <View style={{ marginTop: 20 }}>
                    {animeContinuce.length > 0 && (
                        <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10 }]}>Tiếp tục xem</Text>
                    )}

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', marginLeft: 10 }}
                    >
                        {animeContinuce.map((item, index) => (
                            <AnimeVideo
                                key={index}
                                idAnime={item.id}
                                navigation={navigation}
                                quality={item.quality}
                                width={windowWidth / 2.5}
                                height={96}
                                image={{ uri: item.animeUrl }}
                                name={item.nameAnime}
                            />
                        ))}
                    </ScrollView>
                </View>
                {/* Đang thịnh hành */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10 }]}>Đang thịnh hành</Text>
                    {isloadingAnime ? (
                        <Loading />
                    ) : (
                        <View
                            style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginLeft: 10,
                            }}
                        >
                            {anime.map((item, index) => (
                                <AnimeVideo
                                    idAnime={item.id}
                                    navigation={navigation}
                                    key={index}
                                    quality={item.quality}
                                    width={windowWidth / 2.2}
                                    height={96}
                                    image={{ uri: item.animeUrl }}
                                    name={item.nameAnime}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
            {/* Anime List */}
        </View>
    );
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: GlobalStyles.white.color,
        alignItems: 'center',
    },
});
