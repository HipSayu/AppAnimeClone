import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { PacmanIndicator } from 'react-native-indicators';

import GlobalStyles from '~/Styles/GlobalStyles';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import { getAnimeHomePage, getVideoHomePage } from '~/Services/Api';

import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecommentHomePage() {
    const [amv, setAmv] = useState([]);
    const [anime, setAnime] = useState([]);
    const [isHasVideo, setIsHasVideo] = useState(true);

    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    var getVideo = useSelector((state) => state.GetVideoHomeReducer);

    const getVideoHomeData = async () => {
        try {
            var videoHomes = await AsyncStorage.getItem('my_home_videos');
            videoHomes = JSON.parse(videoHomes);
            console.log('videoHomes', videoHomes);
            if (videoHomes != null) {
                setAmv(videoHomes.items);
            } else {
                setIsHasVideo(!isHasVideo);
            }
        } catch (e) {
            console.log('get AsyncStogare', e);
        }
    };

    // console.log('getVideo', getVideo);

    useEffect(() => {
        if (getVideo.Videos.length != 0) {
            setAmv(getVideo.Videos);
        } else if (getVideo.Videos.length == 0 && isHasVideo) {
            getVideoHomeData();
        } else {
            getVideoHomePage()
                .then((response) => {
                    setAmv(response.data.items);
                })
                .catch((error) => {
                    console.log('Lỗi Video');
                });
        }
    }, [isHasVideo, getVideo]);

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
                                quality={item.quality}
                                image={{ uri: item.animeUrl }}
                                name={item.nameAnime}
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
                                nameVideo={video.nameVideos}
                                time={'01:36'}
                                userName={video.nameUser}
                                viewer={'99'}
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
