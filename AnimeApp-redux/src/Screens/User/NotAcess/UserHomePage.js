import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import ActionList from '../Action/ActionList';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useSelector } from 'react-redux';

export default function UserHomePage({}) {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    const navigation = useNavigation();

    const login = useSelector((state) => state.loginReducer);

    useEffect(() => {
        setIsLogin(login.isLogin);
        setUserInfo(login.userInfo);
    }, [login]);

    // console.log('CheckUserInfor login', login);

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
            {/* Account */}
            <View style={{ marginLeft: 10, marginTop: 10 }}>
                {!isLogin ? (
                    // Chưa login
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginHome')}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                        <ImageBackground
                            borderRadius={25}
                            style={{ width: 50, height: 50 }}
                            source={require('~/Assets/Avatar/Avatar.png')}
                        />
                        <Text style={[{ marginLeft: 20 }, GlobalStyles.h4]}>Đăng nhập</Text>
                    </TouchableOpacity>
                ) : (
                    // Login
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
                                        {userInfo.following}
                                    </Text>
                                    <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                        Người theo dõi
                                    </Text>
                                </View>
                                <View style={{ marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                        {userInfo.follower}
                                    </Text>
                                    <Text style={[GlobalStyles.h4, { color: GlobalStyles.gray.color }]}>
                                        Đang theo dõi
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

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
