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

    const navigation = useNavigation();

    const login = useSelector((state) => state.loginReducer);

    const userId = login.userInfo.id;

    if (userId != undefined) {
        useEffect(() => {
            axios
                .get(
                    `http://localhost:5179/api/User/get-all-user-follow?UserId=${userId}&pageSize=3&pageIndex=1&keyword=a`,
                )
                .then((res) => {
                    setUserFollow(res.data.items);
                })
                .catch((err) => {
                    console.log('Lỗi Seacrh', err);
                });
        }, [userId]);
    }

    console.log('userFollow', userFollow);

    return (
        <>
            {userId != undefined ? (
                <View style={{ marginTop: 25, backgroundColor: GlobalStyles.white.color }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 15 }}
                        horizontal={true}
                    >
                        {userFollow.map((user, index) => (
                            <Avatar
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
                                    key={video.id}
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
                            <Avatar isSearch={true} Time="600 người theo dõi | 20 Videos" />
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
        </>
    );
}

const styles = StyleSheet.create({});
