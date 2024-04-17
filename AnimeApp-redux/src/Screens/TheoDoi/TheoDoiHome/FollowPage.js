import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AMV/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function FollowPage() {
    const [userFollow, setUserFollow] = useState([]);
    const [userNotFollow, setUserNotFollow] = useState([]);

    const navigation = useNavigation();

    const login = useSelector((state) => state.loginReducer);

    var userId = login.userInfo.id;

    console.log('userId', userId);

    useEffect(() => {
        if (userId != undefined) {
            axios
                .get(
                    `http://localhost:5179/api/User/get-all-user-follow?UserId=${userId}&pageSize=3&pageIndex=1&keyword=a`,
                )
                .then((res) => {
                    setUserFollow(res.data.items);
                })
                .catch((err) => {
                    console.log('Lỗi get User Follow', err);
                });
        } else {
            console.log('Chưa đăng nhập');
        }
    }, [userId]);

    useEffect(() => {
        if (userId != undefined) {
            axios
                .get(
                    `http://localhost:5179/api/User/get-all-user-not-follow?UserId=${userId}&pageSize=5&pageIndex=1&keyword=a`,
                )
                .then((res) => {
                    setUserNotFollow(res.data.items);
                })
                .catch((err) => {
                    console.log('Lỗi get User not Follow', err);
                });
        } else {
            console.log('Chưa đăng nhập');
        }
    }, [userId]);

    console.log('userFollow', userFollow);

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
                                Avatar={{ uri: user.avatarUrl }}
                                UserName={user.userName}
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
                                    UserName={item.userName}
                                    NameVideo={video.nameVideos}
                                    IsHasICon={false}
                                    flexDirection="column-reverse"
                                    ViewAvatar={video.dayAgo + ' ngày trước'}
                                    IsUser={true}
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
                                    Avatar={{ uri: item.avatarUrl }}
                                    UserName={item.userName}
                                    isSearch={true}
                                    data={item.userFollowId}
                                    Time="600 người theo dõi | 20 Videos"
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
