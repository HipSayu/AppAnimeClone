import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

import MainVideoHomePage from './MainVideo/MainVideoHomePage';

import { useDispatch, useSelector } from 'react-redux';

export default function PlayVideoPage({ route }) {
    const [inFullscreen, setInFullsreen] = useState(false);

    const dispatch = useDispatch();

    const refVideo = useRef(null);

    const navigation = useNavigation();

    let IdVideo = route.params.data;

    let animevideo = route.params.AnimeVideos;

    const getVideoData = useSelector((state) => state.getVideoPlayReducer);
    let video = getVideoData.videoinformation;

    useEffect(() => {
        dispatch({
            type: 'GET_VIDEO_PLAY_RESQUEST',
            payload: { IdVideo: IdVideo },
        });
    }, [IdVideo]);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <>
            <View style={{ backgroundColor: '#fff', zIndex: 2 }}>
                <View style={{ marginTop: 30 }}>
                    {/* IconBack */}
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            marginBottom: 1,
                        }}
                    >
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ImageBackground
                                style={{ width: 20, height: 20 }}
                                source={require('~/Assets/Icon/IconReturn.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ImageBackground
                                style={{ width: 20, height: 20 }}
                                source={require('~/Assets/Icon/List.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <VideoPlayer
                        style={{
                            videoBackgroundColor: 'black',
                            height: inFullscreen ? windowWidth : windowHeight / 3.6,
                            width: inFullscreen ? windowHeight : windowWidth,
                        }}
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: ResizeMode.CONTAIN,
                            source: {
                                uri: video.urlVideo,
                            },
                            ref: refVideo,
                        }}
                        fullscreen={{
                            inFullscreen: inFullscreen,
                            enterFullscreen: async () => {
                                setStatusBarHidden(true, 'fade');
                                setInFullsreen(!inFullscreen);
                                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
                                refVideo.current.setStatusAsync({
                                    shouldPlay: true,
                                });
                            },
                            exitFullscreen: async () => {
                                setStatusBarHidden(false, 'fade');
                                inFullscreen(!inFullscreen);
                                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
                            },
                        }}
                    />
                </View>
            </View>
            <MainVideoHomePage data={video} animeVideo={animevideo} likes={video.likes} />
        </>
    );
}

const styles = StyleSheet.create({});
