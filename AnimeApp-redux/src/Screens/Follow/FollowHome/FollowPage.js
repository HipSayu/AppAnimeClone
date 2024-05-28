import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';

import { getDataStorage } from '~/Common/getDataStorage';
import Popup from '~/Common/Constanst';
import Loading from '~/Components/Adicator/Loading';

const windowWidth = Dimensions.get('window').width;

export default function FollowPage() {
    const [userInfor, setUserInfor] = useState(null);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const login = useSelector((state) => state.loginReducer);

    const userFollowHomePage = useSelector((state) => state.getUserfollowHomeReducer);
    let userFollow = userFollowHomePage.userFollows;
    let isLoadingFollow = userFollowHomePage.isLoading;

    const userNotFollowData = useSelector((state) => state.getUserNotFollowReducer);
    let userNotFollow = userNotFollowData.userNotFollow;
    let isLoadingNotFollow = userNotFollowData.isLoading;

    useEffect(() => {
        getDataStorage('my_login')
            .then((data) => {
                setUserInfor(data);
            })
            .catch((error) => {
                Popup('Error Read Login', error.message);
            });
    }, [login]);

    console.log('userInfor Follow', userInfor);

    if (userInfor != null) {
        var userId = userInfor.id;
    }

    useEffect(() => {
        if (userInfor != null) {
            dispatch({
                type: 'GET_USERFOLLOW_HOME_RESQUEST',
                payload: { pageSize: 10, pageIndex: 1, userId: userId },
            });
            dispatch({
                type: 'GET_USER_NOT_FOLLOW_RESQUEST',
                payload: { userId: userId },
            });
        }
    }, [userInfor]);

    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            {userId != undefined ? (
                <View style={{ marginTop: 25 }}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 15 }}
                        horizontal={true}
                    >
                        {isLoadingFollow ? (
                            <View style={{ alignItems: 'center', justifyContent: 'center', width: windowWidth }}>
                                <Loading />
                            </View>
                        ) : (
                            userFollow.map((user, index) => (
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
                            ))
                        )}
                    </ScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {isLoadingFollow ? (
                            <Loading />
                        ) : (
                            userFollow.map((item, index) =>
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
                            )
                        )}

                        <Text style={[{ marginLeft: 10, marginTop: 10 }, GlobalStyles.h4]}>
                            Khám phá nhà sáng tạo khác
                        </Text>
                        <View style={{ paddingHorizontal: 10 }}>
                            {isLoadingNotFollow ? (
                                <Loading />
                            ) : (
                                userNotFollow.map((item, index) => (
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
                                ))
                            )}
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
