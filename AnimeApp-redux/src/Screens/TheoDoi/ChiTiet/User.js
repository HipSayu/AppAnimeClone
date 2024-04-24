import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import axios from 'axios';

import GlobalStyles from '~/Styles/GlobalStyles';
import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AMV/AnimeMV';
import { CreateFollow, GetUserVideo, UnFollow } from '~/Services/Api';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function User({ route }) {
    const login = useSelector((state) => state.loginReducer);

    const isFollow = route.params.isFollow;
    const isUser = route.params.isUser;
    console.log('isUser', isUser);
    const userId = login.userInfo.id;

    console.log('userId', userId);

    const [userData, setUserData] = useState({ videoUserFollow: [] });

    const [isfollows, setIfollows] = useState(isFollow);

    const navigation = useNavigation();

    const userFollowId = route.params.data;

    console.log('isFollow', isFollow);

    console.log('userFollowId', userFollowId);

    useEffect(() => {
        GetUserVideo(userFollowId)
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, []);

    const handleTheoDoi = (userIdLogin, userFollow) => {
        if (!isfollows) {
            CreateFollow(userIdLogin, userFollow)
                .then((res) => {
                    setIfollows(!isfollows);
                })
                .catch((err) => {
                    console.log('Lỗi Follow Chưa đăng nhập', err);
                });
        } else {
            UnFollow(userIdLogin, userFollow)
                .then((res) => {
                    setIfollows(!isfollows);
                })
                .catch((err) => {
                    console.log('Lỗi UnFollow', err);
                });
        }
    };

    console.log('userData', userData);
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
