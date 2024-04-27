import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FollowPage() {
    const host = process.env.EXPO_PUBLIC_API_URL_HOST;
    let headers = {};

    const instance = axios.create({
        baseURL: `${host}`,
        timeout: 300000,
        headers,
    });

    const getLocalToken = async () => {
        var my_login = await AsyncStorage.getItem('my_login');
        return userInfor.token.accessToken;
    };

    const getLocalRefreshToken = async () => {
        var my_login = await AsyncStorage.getItem('my_login');
        return { accessToken: userInfor.token.accessToken, refreshToken: userInfor.token.refreshToken };
    };

    instance.setToken = async (accessToken, refreshToken) => {
        // instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
        var my_login = await AsyncStorage.getItem('my_login');
        console.log('my_login3', my_login);
        console.log('new accessToken', accessToken);
        userInfor.token.accessToken = accessToken;
        userInfor.token.refreshToken = refreshToken;
        AsyncStorage.setItem('my_login', JSON.stringify(userInfor));
    };

    async function refreshToken() {
        return instance.post('/Login/refresh_token', await getLocalRefreshToken());
    }

    async function getDataWithOutAuto() {
        return instance.get(`/Search/get-all-page?pageSize=10&pageIndex=1&UserId=${userId}`, {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`, // headers token
            },
        });
    }

    instance.interceptors.response.use(
        (response) => {
            console.log('response search', response.data);

            console.log('test intercepter', response.status);

            return response;
        },
        async (error) => {
            console.log('Error status', error.response.status);
            if (error.response.status === 401) {
                console.log('get new token using refresh token', await getLocalRefreshToken());
                await refreshToken()
                    .then(async (rs) => {
                        console.log('get token refreshToken', rs.data.data);
                        await instance.setToken(rs.data.data.accessToken, rs.data.data.refreshToken);
                        const config = rs.config;
                        config.headers.Authorization = `Bearer ${rs.data.data.accessToken}`;
                        config.baseURL = `${host}`;
                        return instance(config);
                    })
                    .catch((error) => {
                        console.log('looix', error);
                    });
            }
        },
    );
    const test = () => {
        getDataWithOutAuto();
    };

    const [userFollow, setUserFollow] = useState([]);
    const [userNotFollow, setUserNotFollow] = useState([]);
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const navigation = useNavigation();

    const HOST = process.env.EXPO_PUBLIC_API_URL_HOST;
    const USER = process.env.EXPO_PUBLIC_API_URL_USER;

    var login = useSelector((state) => state.loginReducer);

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    if (userInfor != undefined) {
        var token = userInfor.token.accessToken;
    }

    console.log('userId', userId);
    const getData = async () => {
        try {
            var jsonValue = await AsyncStorage.getItem('my_login');
            jsonValue = JSON.parse(jsonValue);
            setUserInfor(jsonValue);
        } catch (e) {
            console.log('get AsyncStogare', e);
        }
    };

    // console.log('userId', userId);
    useEffect(() => {
        getData();
    }, [login]);

    useEffect(() => {
        axios
            .get(`${HOST}${USER}/get-all-user-follow?UserId=${userId}&pageSize=3&pageIndex=1&keyword=a`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUserFollow(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi get User Follow', err);
            });
    }, [login, token]);

    useEffect(() => {
        axios
            .get(`${HOST}${USER}/get-all-user-not-follow?UserId=${userId}&pageSize=5&pageIndex=1&keyword=a`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUserNotFollow(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi get User not Follow', err);
            });
    }, [login, token]);

    console.log('userFollow', userFollow);
    console.log('userInfor', userInfor);
    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            {userId != undefined ? (
                <View style={{ marginTop: 25 }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 15 }}
                        horizontal={true}
                    >
                        {userFollow.map((user, index) => (
                            <Avatar
                                isFollow={true}
                                data={user.userFollowId}
                                navigation={navigation}
                                key={index}
                                styleCustom={{ marginHorizontal: 10 }}
                                avatar={{ uri: user.avatarUrl }}
                                userName={user.userName}
                            />
                        ))}
                    </ScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {userFollow.map((item, index) =>
                            item.videoUserFollow.map((video, indexVideo) => (
                                <AnimeMV
                                    navigation={navigation}
                                    key={video.id}
                                    dataVideo={video.id}
                                    sourceAvartar={{ uri: item.avatarUrl }}
                                    sourceAnime={{ uri: video.avatarVideoUrl }}
                                    userName={item.userName}
                                    nameVideo={video.nameVideos}
                                    isHasICon={false}
                                    flexDirection="column-reverse"
                                    viewAvatar={video.dayAgo + ' ngày trước'}
                                    isUser={true}
                                />
                            )),
                        )}

                        <Text style={[{ marginLeft: 10, marginTop: 10 }, GlobalStyles.h4]}>
                            Khám phá nhà sáng tạo khác
                        </Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            {userNotFollow.map((item, index) => (
                                <Avatar
                                    userIdLogin={userId}
                                    navigation={navigation}
                                    key={index}
                                    avatar={{ uri: item.avatarUrl }}
                                    userName={item.userName}
                                    isSearch={true}
                                    data={item.userFollowId}
                                    time="600 người theo dõi | 20 Videos"
                                />
                            ))}
                            <TouchableOpacity
                                onPress={() => {
                                    test();
                                }}
                            >
                                <Text>Click Me</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Footer */}
                        <View style={{ height: 100 }}></View>
                    </ScrollView>
                </View>
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Chưa đăng nhập</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});
