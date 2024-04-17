import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { PacmanIndicator } from 'react-native-indicators';

import GlobalStyles from '~/Styles/GlobalStyles';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AMV/AnimeMV';
import { getAnimeHomePage, getVideoHomePage } from '~/Services/Api';

export default function DeXuatHomePage() {
    const [amv, setAmv] = useState([]);
    const [anime, setAnime] = useState([]);
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        getVideoHomePage()
            .then((response) => {
                setAmv(response.data.items);
            })
            .catch((error) => {
                console.log('Lỗi Video');
            });
    }, []);

    useEffect(() => {
        getAnimeHomePage()
            .then((response) => {
                setAnime(response.data.items);
            })
            .catch((error) => {
                console.log('Lỗi Anime');
            });
    }, []);

    return (
        <View style={styles.Page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.HeaderWrapper}>
                    <Text style={[GlobalStyles.h4_Regular]}>Anime</Text>
                    <ImageBackground
                        style={{ width: 20, height: 20 }}
                        source={require('~/Assets/Icon/ArrowIcon.png')}
                    />
                </View>
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 10 }}>
                        {anime.map((item, index) => (
                            <AnimeVideo
                                idAnime={item.id}
                                navigation={navigation}
                                key={index}
                                marginRight={20}
                                Quality={item.quality}
                                Image={{ uri: item.animeUrl }}
                                Name={item.nameAnime}
                                width={windowWidth / 2.6}
                                height={182}
                            />
                        ))}
                    </ScrollView>
                </View>
                {amv.length == 0 ? (
                    <View style={{ alignItems: 'center', marginTop: windowHeight / 5 }}>
                        <PacmanIndicator size={100} color="black" />
                    </View>
                ) : (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        {/* ImageVideo */}
                        {amv.map((video, index) => (
                            <AnimeMV
                                dataAvatar={video.usderId}
                                navigation={navigation}
                                dataVideo={video.id}
                                key={index}
                                sourceAvartar={{ uri: video.avatarUserUrl }}
                                sourceAnime={{ uri: video.avatarVideoUrl }}
                                NameVideo={video.nameVideos}
                                Time={'01:36'}
                                UserName={video.nameUser}
                                Viewer={'99'}
                                inViewer={true}
                            />
                        ))}
                    </View>
                )}
            </ScrollView>
            {/* Anime List */}
        </View>
    );
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: GlobalStyles.white.color,
    },
    HeaderWrapper: {
        paddingLeft: 10,
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    Nav: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    NavText: {
        marginRight: 10,
    },
});
