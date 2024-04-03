import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AMV/AnimeMV';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function User({ route }) {
    const [userData, setUserData] = useState({ videoUserFollow: [] });

    const navigation = useNavigation();

    const userFollowId = route.params.data;

    console.log('userFollowId', userFollowId);

    useEffect(() => {
        axios
            .get(`http://localhost:5179/api/User/get-user-with-Video-by-id/${userFollowId}`)
            .then((res) => {
                setUserData(res.data);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, []);

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
                        <Text style={[GlobalStyles.h5, GlobalStyles.blue]}>Đang theo dõi</Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar
                        UserName={userData.userName}
                        Following={userData.following}
                        Follower={userData.follower}
                        Likes="9M"
                        Avatar={{ uri: userData.avatarUrl }}
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
                                Width={2.1}
                                Height={100}
                                ViewAvatar={`1.M lượt xem    ${video.dayAgo} ngày trước`}
                                IsSearch={true}
                                NameVideo={video.nameVideos}
                                UserName=""
                                sourceAnime={{ uri: video.avatarVideoUrl }}
                                flexDirection="row"
                                IsHasAvatar={false}
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
