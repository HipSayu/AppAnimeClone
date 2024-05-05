import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useSelector } from 'react-redux';

import { getUserNotFollow } from '~/Services/Api/instanceAxios';
import { getDataStorage } from '~/Common/getDataStorage';
import Popup from '~/Common/Constanst';

export default function FollowPage() {
    const [userFollow, setUserFollow] = useState([]);
    const [userNotFollow, setUserNotFollow] = useState([]);
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const navigation = useNavigation();

    const login = useSelector((state) => state.loginReducer);

    const userFollowHomePage = useSelector((state) => state.GetUserfollowHomeReducer);

    if (userInfor != undefined) {
        var userId = userInfor.id;
        var token = userInfor.token.accessToken;
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

    useEffect(() => {
        if (userFollowHomePage.Userfollows.length != 0) {
            setUserFollow(userFollowHomePage.Userfollows);
        } else {
            getDataStorage('my_home_userfollows')
                .then((data) => {
                    setUserFollow(data.items);
                })
                .catch((error) => {
                    Popup('Error Read Login');
                });
        }
    }, [login, userFollowHomePage]);

    useEffect(() => {
        getUserNotFollow(userId)
            .then((res) => {
                setUserNotFollow(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi get User not Follow', err);
            });
    }, [login, token, userFollowHomePage]);

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
                                numberphoneUserLogin={userInfor.sđt}
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
                                    numberphoneUserLogin={userInfor.sđt}
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
