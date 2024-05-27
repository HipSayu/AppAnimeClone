import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import GlobalStyles from '~/Styles/GlobalStyles';
import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';

import { getUserById, followUser, unFollowUser } from '~/Services/Action/UserPage';
import { getDataStorage } from '~/Common/getDataStorage';
import Popup from '~/Common/Constanst';
import Loading from '~/Components/Adicator/Loading';
const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function User({ route }) {
    const [userInfor, setUserInfor] = useState();

    // const isFollow = route.params.isFollow;

    var isUser = route.params.isUser;
    const userFollowId = route.params.data;

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const login = useSelector((state) => state.loginReducer);
    let userData;

    const userVideo = useSelector((state) => state.getUserVideoReducer);
    if (userVideo.userVideo.length != 0) {
        userData = userVideo.userVideo;
        var isloadingVideo = userVideo.isLoading;
    }

    var userId = login.userInfo.id;

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    const checkIsFollow = useSelector((state) => state.checkUserFollowReducer);
    let isfollows = checkIsFollow.success;
    let isLoadingFollow = checkIsFollow.isLoading;

    useEffect(() => {
        console.log('dispatch');
        dispatch({
            type: 'GET_USER_VIDEO_RESQUEST',
            payload: { userFollowId: userFollowId },
        });
    }, []);

    useEffect(() => {
        getDataStorage('my_login')
            .then((data) => {
                getUserById(data.id)
                    .then((res) => {
                        setUserInfor(res.data);
                    })
                    .catch((error) => {
                        console.log('user error', error);
                    });
            })
            .catch((error) => {
                Popup('Error Read Login', error.message);
            });
    }, []);

    useEffect(() => {
        if (userInfor != undefined) {
            dispatch({
                type: 'CHECK_USER_FOLLOW_RESQUEST',
                payload: { userId: userId, userFollowId: userFollowId },
            });
        }
    }, [userInfor]);

    const handleTheoDoi = (userIdLogin, userFollow) => {
        if (!isfollows) {
            followUser(userIdLogin, userFollow)
                .then((res) => {
                    dispatch({
                        type: 'GET_USERFOLLOW_HOME_RESQUEST',
                        payload: { pageSize: 10, pageIndex: 1, userId: userIdLogin },
                    });
                    dispatch({
                        type: 'GET_USER_NOT_FOLLOW_RESQUEST',
                        payload: { userId: userIdLogin },
                    });
                    dispatch({
                        type: 'CHECK_USER_FOLLOW_RESQUEST',
                        payload: { userId: userIdLogin, userFollowId: userFollow },
                    });
                })
                .catch((err) => {
                    Popup(`Chưa đăng nhập`);
                });
        } else {
            unFollowUser(userIdLogin, userFollow)
                .then((res) => {
                    dispatch({
                        type: 'GET_USERFOLLOW_HOME_RESQUEST',
                        payload: { pageSize: 10, pageIndex: 1, userId: userIdLogin },
                    });
                    dispatch({
                        type: 'GET_USER_NOT_FOLLOW_RESQUEST',
                        payload: { userId: userIdLogin },
                    });
                    dispatch({
                        type: 'CHECK_USER_FOLLOW_RESQUEST',
                        payload: { userId: userIdLogin, userFollowId: userFollow },
                    });
                })
                .catch((err) => {
                    Popup(`Chưa đăng nhập `);
                });
        }
    };
    if (userId == userFollowId) {
        isUser = true;
    }

    return (
        <View style={{ marginTop: 30 }}>
            {isLoadingFollow ? (
                <Loading />
            ) : (
                <ImageBackground
                    style={{ width: windowWidth, height: windowHeight / 4, justifyContent: 'space-between' }}
                    source={{ uri: userData.backgroundUrl }}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ImageBackground
                                style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                                source={require('~/Assets/Icon/IconReturn.png')}
                            />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ImageBackground
                                    style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                                    source={require('~/Assets/Icon/Share.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <ImageBackground
                                    style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                                    source={require('~/Assets/Icon/List.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {isUser == undefined && (
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <View
                                style={{
                                    borderWidth: 1,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    marginRight: 10,
                                    borderColor: GlobalStyles.blue.color,
                                }}
                            >
                                {isfollows ? (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleTheoDoi(userId, userFollowId);
                                        }}
                                    >
                                        <Text style={[GlobalStyles.h5, GlobalStyles.blue]}>Đang theo dõi</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleTheoDoi(userId, userFollowId);
                                        }}
                                    >
                                        <Text style={[GlobalStyles.h5, GlobalStyles.blue]}>Theo dõi</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    )}
                    {isUser && (
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <View
                                style={{
                                    borderWidth: 1,
                                    paddingVertical: 5,
                                    paddingHorizontal: 10,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                    marginRight: 10,
                                    borderColor: GlobalStyles.blue.color,
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate('UserInformationPage', userInfor);
                                    }}
                                >
                                    <Text style={[GlobalStyles.h5, GlobalStyles.blue]}>Sửa thông tin</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </ImageBackground>
            )}
            {isloadingVideo ? (
                <Loading />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                        <Avatar
                            navigation={navigation}
                            userName={userData.tieuSu}
                            following={userData.following}
                            follower={userData.follower}
                            likes="9M"
                            avatar={{ uri: userData.avatarUrl }}
                        />
                    </View>
                    <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10, marginTop: 10 }]}>Video</Text>
                    <View style={{ marginLeft: 10 }}>
                        {!userData.length > 0 &&
                            userData.videoUserFollow.map((video, index) => (
                                <AnimeMV
                                    navigation={navigation}
                                    dataVideo={video.id}
                                    key={video.id}
                                    width={2.3}
                                    height={100}
                                    viewAvatar={`1.M lượt xem    ${video.dayAgo} ngày trước`}
                                    isSearch={true}
                                    nameVideo={video.nameVideos}
                                    userName=""
                                    sourceAnime={{ uri: video.avatarVideoUrl }}
                                    flexDirection="row"
                                    isHasAvatar={false}
                                    time={`00:${video.time}`}
                                />
                            ))}
                    </View>
                    {/* Footer */}
                    <View style={{ height: windowHeight / 3.9 }}></View>
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
