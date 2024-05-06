import { Alert, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useEffect, useState } from 'react';

import ActionList from '../Action/ActionList';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT_REQUEST } from '~/Services/Action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserHomePage({}) {
    const [isLogin, setIsLogin] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const login = useSelector((state) => state.loginReducer);

    useEffect(() => {
        setUserInfo(login.userInfo);
        getData();
    }, [login]);

    const getData = async () => {
        try {
            var user = await AsyncStorage.getItem('my_login');
            user = JSON.parse(user);
            setUserInfo(user);
        } catch (e) {
            console.log('error Token', e);
        }
    };

    console.log('userInfo', userInfo);

    const handleLogout = () => {
        Alert.alert('Thông báo', 'Bạn có muốn đăng xuất ', [
            {
                text: 'OK',
                onPress: () => {
                    dispatch({
                        type: LOGOUT_REQUEST,
                        payload: { SDT: 'Logout', userName: 'Logout', password: 'Logout' },
                    });
                    dispatch({
                        type: 'DELETE_ANIME_CONTINUCE_RESQUEST',
                    });
                    dispatch({
                        type: 'DELETE_VIDEO_HOME_RESQUEST',
                    });
                    navigation.navigate('HomeScreenPage');
                },
                style: 'cancel',
            },
            {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
            },
        ]);
    };

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
                {userInfo == null ? (
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
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('User', { data: userInfo.id, isFollow: false, isUser: true });
                        }}
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
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

                <ActionList onPress={handleLogout} IconLeft={require('~/Assets/Icon/help.png')} Name="Logout" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
