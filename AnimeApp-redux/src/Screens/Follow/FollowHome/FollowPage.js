import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserFollow, getUserNotFollow } from '~/Services/Api/instanceAxios';

export default function FollowPage() {
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
        getUserFollow(userId)
            .then((res) => {
                setUserFollow(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi get User Follow', err);
            });
    }, [login, token]);

    useEffect(() => {
        getUserNotFollow(userId)
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
