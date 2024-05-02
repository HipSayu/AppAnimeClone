import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import GlobalStyles from '~/Styles/GlobalStyles';
import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import { GetUserVideo } from '~/Services/Api';
import { CheckIsFollow, followUser, unFollowUser } from '~/Services/Api/instanceAxios';

import AsyncStorage from '@react-native-async-storage/async-storage';
const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function User({ route }) {
    const login = useSelector((state) => state.loginReducer);

    const isFollow = route.params.isFollow;

    const dispatch = useDispatch();

    var isUser = route.params.isUser;

    const userFollowId = route.params.data;

    var userId = login.userInfo.id;

    console.log('userId', userId);

    const [userData, setUserData] = useState({ videoUserFollow: [] });

    const [isfollows, setIfollows] = useState(isFollow);

    const [userInfor, setUserInfor] = useState();

    const navigation = useNavigation();

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    // console.log('isFollow', isFollow);

    console.log('userFollowId', userFollowId);

    console.log('userInfor', userInfor);

    useEffect(() => {
        GetUserVideo(userFollowId)
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, []);

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
        if (userInfor != undefined) {
            CheckIsFollow(userId, userFollowId)
                .then((res) => {
                    console.log('isfollow axios', res.data);

                    setIfollows(res.data);
                })
                .catch((err) => {
                    console.log('Check Error isfollow', err);
                });
        }
    }, [userInfor]);

    const handleTheoDoi = (userIdLogin, userFollow) => {
        if (!isfollows) {
            followUser(userIdLogin, userFollow)
                .then((res) => {
                    dispatch({
                        type: 'GET_USERFOLLOW_HOME_RESQUEST',
                        payload: { SDT: userInfor.sđt },
                    });
                    setIfollows(!isfollows);
                })
                .catch((err) => {
                    console.log('Lỗi Follow Chưa đăng nhập', err);
                });
        } else {
            unFollowUser(userIdLogin, userFollow)
                .then((res) => {
                    dispatch({
                        type: 'GET_USERFOLLOW_HOME_RESQUEST',
                        payload: { SDT: userInfor.sđt },
                    });
                    console.log('check unfollow', res);
                    setIfollows(!isfollows);
                })
                .catch((err) => {
                    console.log('Lỗi UnFollow', err);
                });
        }
    };
    if (userId == userFollowId) {
        isUser = true;
    }

    // console.log('userData', userData);
    return (
        <View style={{ marginTop: 30 }}>
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
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar
                        userName={userData.userName}
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
                                width={2.1}
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
        </View>
    );
}

const styles = StyleSheet.create({});
