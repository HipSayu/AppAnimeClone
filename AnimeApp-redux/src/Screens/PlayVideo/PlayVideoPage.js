import { Button, Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import MainVideoHomePage from './MainVideo/MainVideoHomePage';

export default function PlayVideoPage({ route }) {
    const [inFullscreen, setInFullsreen] = useState(false);

    const refVideo = useRef(null);

    const IdVideo = route.params.data;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    console.log('IdVideo', IdVideo);

    return (
        <>
            <View style={{ backgroundColor: '#fff' }}>
                <View style={{ marginTop: 30 }}>
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
                                uri: 'http://localhost:5179/api/File/GetVideo/KakaShi.mp4',
                            },
                            ref: refVideo,
                        }}
                        fullscreen={{
                            inFullscreen: inFullscreen,
                            enterFullscreen: async () => {
                                setStatusBarHidden(true, 'fade');
                                inFullscreen(!inFullscreen);
                                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
                                refVideo2.current.setStatusAsync({
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
            <MainVideoHomePage />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    top: -windowHeight / 1.1,
                    paddingHorizontal: 10,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ImageBackground
                        style={{ width: 20, height: 20 }}
                        source={require('~/Assets/Icon/IconReturn.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/List.png')} />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({});
