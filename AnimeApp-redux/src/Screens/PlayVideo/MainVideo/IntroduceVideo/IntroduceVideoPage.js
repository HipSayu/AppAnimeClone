import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';

import GlobalStyles from '~/Styles/GlobalStyles';

import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import { disLikeVideo, likeVideo } from '~/Services/Api/instanceAxios';
import { getDataStorage } from '~/Common/getDataStorage';
import Loading from '~/Components/Adicator/Loading';
import Popup from '~/Common/Constanst';

export default function IntroduceVideoPage({ data, animeVideo, likes }) {
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const likeVideoData = useSelector((state) => state.checkLikeVideoReducer);

    let isLike = likeVideoData.isLike;

    const videoData = useSelector((state) => state.getVideoPlayVideoPageReducer);
    let video = videoData.videos;
    let isLoadingVideo = videoData.isLoading;

    const numberLike = useSelector((state) => state.getLikeVideoReducer);
    let like = numberLike.likes;

    const idVideo = data.id;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const login = useSelector((state) => state.loginReducer);

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    useEffect(() => {
        dispatch({
            type: 'GET_VIDEO_PLAY_PLAY_VIDEO_PAGE_RESQUEST',
            payload: { idVideo: idVideo, pageSize: 10, pageIndex: 1 },
        });
        getDataStorage('my_login')
            .then((data) => {
                setUserInfor(data);
            })
            .catch((error) => {
                Popup('Error Read Login', error.message);
            });
    }, [login]);

    useEffect(() => {
        dispatch({
            type: 'GET_LIKE_VIDEO_RESQUEST',
            payload: { IdVideo: data.id },
        });
        console.log('userId PlayVideo', userId);
        dispatch({
            type: 'GET_CHECK_IS_LIKE_VIDEO_RESQUEST',
            payload: { userId: userId, idVideo: idVideo },
        });
    }, [login, userInfor]);

    const handleLike = (userId, idVideo) => {
        if (userId != undefined && !isLike) {
            likeVideo(userId, idVideo)
                .then((res) => {
                    dispatch({
                        type: 'GET_CHECK_IS_LIKE_VIDEO_RESQUEST',
                        payload: { userId: userId, idVideo: idVideo },
                    });
                    dispatch({
                        type: 'GET_LIKE_VIDEO_RESQUEST',
                        payload: { IdVideo: data.id },
                    });
                })
                .catch((err) => {
                    Popup('Chưa đăng nhập');
                });
        } else {
            disLikeVideo(userId, idVideo)
                .then((res) => {
                    dispatch({
                        type: 'GET_CHECK_IS_LIKE_VIDEO_RESQUEST',
                        payload: { userId: userId, idVideo: idVideo },
                    });
                    dispatch({
                        type: 'GET_LIKE_VIDEO_RESQUEST',
                        payload: { IdVideo: data.id },
                    });
                })
                .catch((err) => {
                    Popup('Chưa đăng nhập');
                });
        }
    };

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
                {isLoadingVideo ? (
                    <Loading />
                ) : (
                    <View>
                        {video.map((item, index) => (
                            <AnimeMV
                                key={index}
                                navigation={navigation}
                                dataAvatar={item.usderId}
                                dataVideo={item.id}
                                nameVideo={item.nameVideos}
                                sourceAvartar={{ uri: item.avatarUserUrl }}
                                userName={item.nameUser}
                                sourceAnime={{ uri: item.avatarVideoUrl }}
                                width={2.1}
                                height={100}
                                ViewAvatar="1.M lượt xem"
                                widthAvatar={20}
                                isSearch={true}
                                flexDirection="row"
                                isHasICon={false}
                            />
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
