import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import ActionList from '../Action/ActionList';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import Avatar from '~/Components/AvatarUser/Avatar';

export default function UserHomeAccesPage({}) {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5179/api/Login/Login?NumberPhone=84904179061&UserName=Admin&Password=16112003`)
            .then((response) => {
                // console.log(response);
                setUserInfo(response.data);
            })
            .catch((error) => {
                console.log('Lỗi');
            });
    }, []);

    console.log('userInfo', userInfo);

    return (
        <View style={{ paddingTop: 10 }}>
            {/* Header */}
            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ImageBackground
                            style={{ width: 20, height: 20, marginRight: 20, marginTop: 10 }}
                            source={require('~/Assets/Icon/Camera.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ImageBackground
                            style={{ width: 20, height: 20, marginRight: 20, marginTop: 10 }}
                            source={require('~/Assets/Icon/QR.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ImageBackground
                            style={{ width: 20, height: 20, marginRight: 20, marginTop: 10 }}
                            source={require('~/Assets/Icon/Email.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ marginLeft: 10, marginTop: 10 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ImageBackground
                        borderRadius={30}
                        style={{ width: 60, height: 60 }}
                        source={{ uri: userInfo.avatarUrl }}
                    />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={[GlobalStyles.h3, {}]}>{userInfo.userName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                    {userInfo.videos}
                                </Text>
                                <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>Video</Text>
                            </View>
                            <View style={{ marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                    {userInfo.follower}
                                </Text>
                                <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                    Người theo dõi
                                </Text>
                            </View>
                            <View style={{ marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                    {userInfo.following}
                                </Text>
                                <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>Đang theo dõi</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <ActionList Name="Lịch sử" />
                <ActionList IconLeft={require('~/Assets/Icon/Download.png')} Name="Đã tải xuống" />
                <ActionList IconLeft={require('~/Assets/Icon/Muc.png')} Name="Mục ưa thích" />
                <ActionList IconLeft={require('~/Assets/Icon/store.png')} Name="Cửa hàng" />
                <ActionList IconLeft={require('~/Assets/Icon/settings.png')} Name="Cài đặt" />
                <ActionList IconLeft={require('~/Assets/Icon/help.png')} Name="Trợ giúp" />
                <ActionList IconLeft={require('~/Assets/Icon/message.png')} Name="Phản hồi" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
