import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { setStatusBarHidden } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getDataStorage } from '~/Common/getDataStorage';

export default function CreateAnime() {
    const [image, setImage] = useState('');
    const [inFullscreen, setInFullsreen] = useState(false);
    const [video, setVideo] = useState({ uri: '', duration: 0 });
    const [nameVideo, setNameVideo] = useState('');
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const refVideo = useRef(null);

    const dispatch = useDispatch();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const HOST = process.env.EXPO_PUBLIC_API_URL_HOST;
    const VIDEO = process.env.EXPO_PUBLIC_API_URL_VIDEO;
    const FILE = process.env.EXPO_PUBLIC_API_URL_FILE;

    var login = useSelector((state) => state.loginReducer);

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    useEffect(() => {
        getDataStorage('my_login')
            .then((data) => {
                setUserInfor(data);
            })
            .catch((error) => {
                Popup('Error Read Login', error.message);
            });
    }, [login]);

    // console.log('userId', userId);

    const handleVideoPickerPress = async () => {
        let resultVideo = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!resultVideo.canceled) {
            setVideo(resultVideo.assets[0]);
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

    const handleUpload = async (uriVideo, uriImage) => {
        if (nameVideo == '') {
            Alert.alert('Thông báo', 'Nhập tên video', [
                {
                    text: 'Oke',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]);
        } else {
            //Video
            let formDataVideo = new FormData();
            formDataVideo.append('file', {
                uri: uriVideo,
                type: 'video/mp4',
                name: `${nameVideo}.mp4`,
            });
            let configVideo = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${HOST}${FILE}/upload_test`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formDataVideo,
            };
            //Image
            let formDataImage = new FormData();
            formDataImage.append('file', {
                uri: uriImage,
                type: 'image/jpeg',
                name: `${nameVideo}.jpg`,
            });

            let configImage = {
                method: 'POST',
                maxBodyLength: Infinity,
                url: `${HOST}${FILE}/upload_test`,
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formDataImage,
            };

            Promise.all([axios.request(configVideo), axios.request(configImage)])
                .then((res) => {
                    var urlVideo = res[0].data;
                    var urlAvatar = res[1].data;
                    console.log('res1', res[0].data);
                    console.log('res2', res[1].data);

                    let configCreateVideo = {
                        method: 'POST',
                        maxBodyLength: Infinity,
                        url: `${HOST}${VIDEO}/create`,
                        data: {
                            videoId: 'string',
                            userId: userId,
                            nameVideos: nameVideo,
                            urlVideo: urlVideo,
                            avatarVideoUrl: urlAvatar,
                            time: Math.round(video.duration / 1000),
                            animeId: 1,
                        },
                    };

                    axios
                        .request(configCreateVideo)
                        .then((res) => {
                            // console.log('Upload Succes', res);
                            Alert.alert('Thông báo', 'Upload Video Success ', [
                                {
                                    text: 'Oke',
                                    onPress: () => {
                                        setNameVideo('');
                                        dispatch({
                                            type: 'CHANGE_NAME_RESQUEST',
                                        });
                                    },
                                    style: 'cancel',
                                },
                            ]);
                        })
                        .catch((error) => {
                            // console.log('Upload Video Lỗi', error);
                            Alert.alert('Thông báo', 'Upload Video Error ', [
                                {
                                    text: 'Oke',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                            ]);
                        });
                })
                .catch((err) => console.log(err));
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'space-between' }}>
            {userId != undefined ? (
                <View style={{ justifyContent: 'space-between', flex: 1 }}>
                    <View style={{ marginTop: 30, justifyContent: 'space-between' }}>
                        {video.uri != '' && (
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
                                        uri: video.uri,
                                    },
                                    ref: refVideo,
                                }}
                                fullscreen={{
                                    inFullscreen: inFullscreen,
                                    enterFullscreen: async () => {
                                        setStatusBarHidden(true, 'fade');
                                        setInFullsreen(!inFullscreen);
                                        await ScreenOrientation.lockAsync(
                                            ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
                                        );
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
                        {video.uri != '' && (
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
                                            console.log('uri', video.uri);
                                            console.log('duration', video.duration);
                                            handleUpload(video.uri, image);
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
                                    if (video.uri == '') {
                                        handleVideoPickerPress();
                                    } else {
                                        setVideo({ uri: '', duration: 0 });
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
                                {video.uri == '' ? (
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
                </View>
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Chưa đăng nhập</Text>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
