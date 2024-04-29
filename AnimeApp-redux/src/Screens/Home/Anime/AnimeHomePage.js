import { ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import { getAnimeHomePage } from '~/Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataNav = [
    { Image: require('~/Assets/Icon/IconNav/List.png'), Name: 'Mục lục' },
    { Image: require('~/Assets/Icon/IconNav/Clock.png'), Name: 'Lịch Chiếu' },
    { Image: require('~/Assets/Icon/IconNav/RetroTV.png'), Name: 'Xếp hạng' },
    { Image: require('~/Assets/Icon/IconNav/MembershipCard.png'), Name: 'Premium' },
];

export default function AnimeHomePage() {
    const [animeContinuce, SetAnimeContinuce] = useState([]);
    const [anime, setAnime] = useState([]);
    const [isHasAnime, setIsHasAnime] = useState(true);
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;

    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        getAnimeHomePage((pageSize = 5), (pageIndex = 1), (keyword = 'c'))
            .then((response) => {
                setAnime(response.data.items);
            })
            .catch((error) => {
                console.log('Lỗi Anime');
            });
    }, []);

    var getAnime = useSelector((state) => state.GetAnimeHomeReducer);

    const getAnimeHomeData = async () => {
        try {
            var animeHomes = await AsyncStorage.getItem('my_home_animes');
            animeHomes = JSON.parse(animeHomes);
            console.log('animeHome', animeHomes);
            if (animeHomes != null) {
                SetAnimeContinuce(animeHomes.items);
            } else {
                setIsHasAnime(!isHasAnime);
            }
        } catch (e) {
            console.log('get AsyncStogare', e);
        }
    };
    console.log('getAnime', getAnime);

    useEffect(() => {
        if (getAnime.Animes.length != 0) {
            SetAnimeContinuce(getAnime.Animes);
        } else if (getAnime.Animes.length == 0 && isHasAnime) {
            getAnimeHomeData();
        } else {
            SetAnimeContinuce([]);
        }
    }, [isHasAnime, getAnime]);

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
                    <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10 }]}>Tiếp tục xem</Text>
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
