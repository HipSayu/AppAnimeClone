import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';

import { PacmanIndicator } from 'react-native-indicators';

import GlobalStyles from '~/Styles/GlobalStyles';
import AnimeMV from '~/Components/AMV/AnimeMV';
import { CheckIslike, disLikeVideo, getLikeVideoById, getVideoDeXuat, likeVideo } from '~/Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IntroduceVideoPage({ data, animeVideo, likes }) {
    const [video, setVideo] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const [like, setLike] = useState(likes);
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;

    const windowHeight = Dimensions.get('window').height;

    const login = useSelector((state) => state.loginReducer);

    // let userId = login.userInfo.id;

    // console.log('animeVideo Introduce', animeVideo);

    // console.log('Data Introduce', data);

    //GetVideo DeXuat
    if (userInfor != undefined) {
        var userId = userInfor.id;
        console.log('userId', userId);
    }

    if (userInfor != undefined) {
        var token = userInfor.token.accessToken;
    }

    const getData = async () => {
        try {
            var jsonValue = await AsyncStorage.getItem('my_login');
            jsonValue = JSON.parse(jsonValue);
            setUserInfor(jsonValue);
        } catch (e) {
            console.log('get AsyncStogare', e);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getVideoDeXuat(data)
            .then((res) => {
                console.log('Get Video De Xuat succsses');
                setVideo(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Get Video De Xuat Introduce', err);
            });
    }, [data]);

    //GetLike
    useEffect(() => {
        getLikeVideoById(data)
            .then((res) => {
                setLike(res.data.likes);
            })
            .catch((err) => {
                console.log('Lỗi Axios', err);
            });
    }, [like]);

    //Check isLike

    useEffect(() => {
        if (userId != undefined) {
            CheckIslike(userId, data)
                .then((res) => {
                    setIsLike(res.data);
                })
                .catch((err) => {
                    console.log('Lỗi CheckIsLike ', err);
                });
        } else {
            console.log('Chưa đăng nhập');
        }
    }, []);

    const handleLike = (userId, idVideo) => {
        if (userId != undefined && !isLike) {
            likeVideo(userId, idVideo)
                .then((res) => {
                    setLike((prev) => prev + 1);
                    setIsLike(!isLike);
                })
                .catch((err) => {
                    console.log('Lỗi Like', err);
                });
        } else {
            disLikeVideo(userId, idVideo)
                .then((res) => {
                    setLike((prev) => prev - 1);
                    setIsLike(!isLike);
                })
                .catch((err) => {
                    console.log('Lỗi unLike', err);
                });
        }
    };

    // console.log('video Introduce', video);

    if (likes > 1000) {
        setLike(likes / 1000 + 'K');
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: GlobalStyles.white.color,
                height: windowHeight / 1,
                paddingBottom: 20,
                zIndex: 2,
            }}
        >
            <View style={{ marginLeft: 20 }}>
                {/* NameVideo */}
                <Text
                    style={[GlobalStyles.h3_Medium, { width: windowWidth / 1.2, marginTop: 10 }]}
                    ellipsizeMode="clip"
                >
                    {data.nameVideos}
                </Text>
                {/* Active  */}
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingRight: 20,
                        marginTop: 10,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            handleLike(userId, data.id);
                        }}
                        style={{ alignItems: 'center', marginLeft: 5 }}
                    >
                        {!isLike ? (
                            <ImageBackground
                                source={require('~/Assets/Icon/IconActive/Like.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        ) : (
                            <ImageBackground
                                source={require('~/Assets/Icon/IconActive/LikeActive.png')}
                                style={{ width: 30, height: 30 }}
                            />
                        )}

                        <Text style={GlobalStyles.h5_Medium}>{like}</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Bookmark.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>Yêu thích</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Download.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>Tải xuống</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Share.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>Share</Text>
                    </View>
                </View>
                {animeVideo == undefined ? (
                    <></>
                ) : (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', marginTop: 10 }}
                    >
                        {animeVideo.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PlayVideoPage', {
                                        data: item.idVideo,
                                        AnimeVideos: animeVideo,
                                    });
                                }}
                                key={index}
                            >
                                <View
                                    style={{
                                        marginRight: 15,
                                        borderRadius: 10,
                                        backgroundColor: data.id == item.idVideo ? '#979797' : '#e3e3e3',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        paddingVertical: 15,
                                        paddingHorizontal: 20,
                                    }}
                                >
                                    <Text style={GlobalStyles.h4}>{index + 1}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                )}
                <View>
                    <Text style={[GlobalStyles.h3_Medium, { marginTop: 10 }]}>Đề xuất cho bạn</Text>
                </View>
                {video.lenght == 0 ? (
                    <PacmanIndicator size={100} color="black" />
                ) : (
                    <View>
                        {video.map((item, index) => (
                            <AnimeMV
                                key={index}
                                navigation={navigation}
                                dataAvatar={item.usderId}
                                dataVideo={item.id}
                                NameVideo={item.nameVideos}
                                sourceAvartar={{ uri: item.avatarUserUrl }}
                                UserName={item.nameUser}
                                sourceAnime={{ uri: item.avatarVideoUrl }}
                                Width={2.1}
                                Height={100}
                                ViewAvatar="1.M lượt xem"
                                widthAvatar={20}
                                IsSearch={true}
                                flexDirection="row"
                                IsHasICon={false}
                            />
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
