import { Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';

export default function CreateAnime() {
    const [image, setImage] = useState('');
    const [inFullscreen, setInFullsreen] = useState(false);
    const [video, setVideo] = useState('');
    const [nameVideo, setNameVideo] = useState('');
    const refVideo = useRef(null);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const handleVideoPickerPress = async () => {
        let resultVideo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!resultVideo.canceled) {
            setVideo(resultVideo.assets[0].uri);
        }
        console.log('check Video Upload', resultVideo.assets[0]);
    };

    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        console.log('check Image Upload', result.assets[0]);
    };

    const handleUpload = (uri) => {
        const formData = new FormData();
        formData.append('files', {
            uri,
        });

        axios
            .post('http://localhost:5179/api/File/uploadfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log('Upload success:', response);
            })

            .catch((error) => {
                console.log('Upload error:', error);
            });
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
            <View style={{ marginTop: 30, justifyContent: 'space-between' }}>
                {video && (
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
                                uri: video,
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
                )}
                {video && (
                    <View style={{ alignItems: 'center' }}>
                        <View
                            style={{
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 20,
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={[GlobalStyles.h4, { marginTop: 15 }]}>Name Video</Text>
                            <View>
                                <TextInput
                                    autoFocus={false}
                                    value={nameVideo}
                                    onChangeText={setNameVideo}
                                    numeric
                                    placeholder={'Name Video'}
                                    style={{
                                        borderBottomWidth: 1,
                                        width: windowWidth / 1.5,
                                        marginLeft: 10,
                                        paddingLeft: 10,
                                    }}
                                ></TextInput>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log(video);
                                    handleUpload(video);
                                }}
                                style={{
                                    alignItems: 'center',
                                    marginTop: 30,
                                    width: windowWidth / 1.5,
                                    backgroundColor: GlobalStyles.blue.color,
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 20,
                                }}
                            >
                                <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Upload Video</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (video == '') {
                                handleVideoPickerPress();
                            } else {
                                setVideo('');
                            }
                        }}
                        style={{
                            backgroundColor: GlobalStyles.blue.color,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginBottom: 20,
                        }}
                    >
                        {video == '' ? (
                            <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Load Video</Text>
                        ) : (
                            <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Clear Video</Text>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (image == '') {
                                handleImagePickerPress();
                            } else {
                                setImage('');
                            }
                        }}
                        style={{
                            backgroundColor: GlobalStyles.blue.color,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginBottom: 20,
                        }}
                    >
                        {image == '' ? (
                            <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Load Image</Text>
                        ) : (
                            <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Clear Image</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
