import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';

import { LOGIN_REQUEST } from '~/Services/Action/action';

import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

export default function LoginSDTPage({ route }) {
    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // const [error, setError] = useState('');
    // const [isLoading, setIsLoading] = useState(false);
    // const [userInfo, setUserInfo] = useState([]);

    const dispatch = useDispatch();

    const [isUserName, setIsUserName] = useState(true);
    const [isPassword, setIsPassword] = useState(true);

    const SDT = route.params.SDT;

    // var login = useSelector((state) => state.loginReducer);

    // useEffect(() => {
    //     setError(login.error);
    //     setIsLoading(login.isLoading);
    //     setUserInfo(login.userInfo);
    // }, [error]);

    const handleSubmit = () => {
        if (isUserName && isPassword && userName.length > 0 && password.length > 0) {
            Alert.alert('Thông báo', 'Bạn có chắc muốn đăng nhập', [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        axios
                            .get(
                                `http://localhost:5179/api/Login/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`,
                            )
                            .then((res) => {
                                dispatch({
                                    type: LOGIN_REQUEST,
                                    payload: { SDT, userName: userName, password: password },
                                });
                                Alert.alert('Thông báo', 'Đăng nhập thành công ', [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.navigate('UserHomePage'),
                                        style: 'cancel',
                                    },
                                ]);
                            })
                            .catch((error) => {
                                Alert.alert('Thông báo', 'Tài khoản mật khẩu không chính xác', [
                                    {
                                        text: 'Nhập lại',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                    },
                                ]);
                            });
                    },
                },
            ]);
        } else {
            Alert.alert('Thông báo', 'Tài khoản mật khẩu không chính xác', [
                {
                    text: 'Nhập lại',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]);
        }
    };

    const handleUserName = (text) => {
        if (!text.startsWith(' ')) {
            setUserName(text);
        }
        if (text.trim().length < 5) {
            setIsUserName(false);
        } else {
            setIsUserName(true);
        }
    };

    const handlePassword = (text) => {
        if (!text.startsWith(' ')) {
            setPassword(text);
        }
        if (text.trim().length < 8) {
            setIsPassword(false);
        } else {
            setIsPassword(true);
        }
    };
    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/IconReturn.png')} />
            </TouchableOpacity>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
                <Text style={GlobalStyles.h3}>Đăng nhập</Text>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                    }}
                >
                    <Text style={GlobalStyles.h4}>UserName</Text>
                    <View>
                        <TextInput
                            autoFocus={true}
                            value={userName}
                            onChangeText={handleUserName}
                            numeric
                            secureTextEntry={false}
                            placeholder={'Username'}
                            style={{ borderBottomWidth: 1, width: windowWidth / 1.5, marginLeft: 10, paddingLeft: 10 }}
                        ></TextInput>
                        {!isUserName && (
                            <Text style={[{ marginLeft: 15, color: GlobalStyles.red.color }, GlobalStyles.h5]}>
                                UserName tối thiểu 5 ký tự
                            </Text>
                        )}
                    </View>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                    }}
                >
                    <Text style={GlobalStyles.h4}>Password</Text>
                    <View>
                        <TextInput
                            autoFocus={false}
                            value={password}
                            onChangeText={handlePassword}
                            numeric
                            secureTextEntry={true}
                            placeholder={'Password'}
                            style={{ borderBottomWidth: 1, width: windowWidth / 1.5, marginLeft: 10, paddingLeft: 10 }}
                        ></TextInput>
                        {!isPassword && (
                            <Text style={[{ marginLeft: 15, color: GlobalStyles.red.color }, GlobalStyles.h5]}>
                                Password tối thiểu 8 ký tự
                            </Text>
                        )}
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        handleSubmit();
                    }}
                    style={{
                        backgroundColor: GlobalStyles.blue.color,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Đăng Nhập</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({});
