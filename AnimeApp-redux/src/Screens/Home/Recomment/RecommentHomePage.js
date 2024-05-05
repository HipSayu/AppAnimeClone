import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';

import { useDispatch, useSelector } from 'react-redux';

import { getDataStorage } from '~/Common/getDataStorage';
import Loading from '~/Components/Adicator/Loading';

export default function RecommentHomePage() {
    const [amv, setAmv] = useState([]);

    const [isHasVideo, setIsHasVideo] = useState(true);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const login = useSelector((state) => state.loginReducer);

    const getVideo = useSelector((state) => state.GetVideoHomeReducer);
    let videoiSLoading = getVideo.isLoading;

    const getAnime = useSelector((state) => state.GetAnimeHomeReducer);
    let anime = getAnime.Animes;
    let isloadingAnime = getAnime.isLoading;

    useEffect(() => {
        if (getVideo.Videos.length != 0) {
            setAmv(getVideo.Videos);
        } else if (getVideo.Videos.length == 0 && isHasVideo) {
            getDataStorage('my_home_videos').then((data) => {
                if (data == null) {
                    setIsHasVideo(!isHasVideo);
                } else {
                    setAmv(data.items);
                }
            });
        } else {
            console.log('disptach');
            dispatch({
                type: 'GET_VIDEO_HOME_RESQUEST_NOT_LOGIN',
            });
            setIsHasVideo(!isHasVideo);
        }
    }, [isHasVideo, getVideo]);

    useEffect(() => {
        dispatch({
            type: 'GET_ANIME_HOME_RESQUEST',
        });
    }, [login]);

    return (
        <View style={styles.Page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.HeaderWrapper}>
                    <Text style={[GlobalStyles.h4]}>Anime</Text>
                    <ImageBackground
                        style={{ width: 20, height: 20 }}
                        source={require('~/Assets/Icon/ArrowIcon.png')}
                    />
                </View>
                <View>
                    {isloadingAnime ? (
                        <Loading />
                    ) : (
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
                    )}
                </View>
                <View style={styles.HeaderWrapper}>
                    <Text style={[GlobalStyles.h4]}>Video</Text>
                    <ImageBackground
                        style={{ width: 20, height: 20 }}
                        source={require('~/Assets/Icon/ArrowIcon.png')}
                    />
                </View>
                {videoiSLoading ? (
                    <Loading />
                ) : (
                    <View style={{ alignItems: 'center' }}>
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
