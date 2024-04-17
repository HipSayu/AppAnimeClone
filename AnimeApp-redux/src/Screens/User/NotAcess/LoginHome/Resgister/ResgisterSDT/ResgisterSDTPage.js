import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import React, { useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import { CreateUser } from '~/Services/Api';

const windowWidth = Dimensions.get('window').width;

export default function ResgisterSDTPage({ route }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [isUserName, setIsUserName] = useState(true);
    const [isPassword, setIsPassword] = useState(true);
    const [isRePassword, setIsRePassword] = useState(true);

    const SDT = route.params.SDT;

    const navigation = useNavigation();

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

    const handleRePassword = (text) => {
        if (!text.startsWith(' ')) {
            setRePassword(text);
        }
        if (text.trim() !== password.trim()) {
            setIsRePassword(false);
        } else {
            setIsRePassword(true);
        }
    };
    const handleSubmit = () => {
        if (
            isUserName &&
            isPassword &&
            isRePassword &&
            userName.length > 0 &&
            password.length > 0 &&
            rePassword.length > 0
        ) {
            let data = {
                userName,
                password,
                rePassword,
                SDT,
            };
            Alert.alert('Thông báo', 'Bạn có chắc muốn đăng kí và đồng ý với điều khoản', [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => {
                        //API
                        CreateUser(userName, password)
                            .then((res) => {
                                console.log('>>Check Response', res);
                                Alert.alert('Thông báo', 'đăng ký thành công vui lòng đăng nhập', [
                                    {
                                        text: 'OK',
                                        onPress: () => navigation.navigate('LoginSDTPage', { SDT: SDT }),
                                        style: 'cancel',
                                    },
                                ]);
                            })
                            .catch((error) => {
                                console.log('>>Check Error', error);
                            });
                    },
                },
            ]);
            console.log('>>CheckData', data);
        } else {
            Alert.alert('Thông báo', 'Nhập thông tin chưa đầy đủ', [
                {
                    text: 'Nhập lại',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
            ]);
        }
    };
    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => {
                    navigation.navigate('SDTPage');
                }}
            >
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/IconReturn.png')} />
            </TouchableOpacity>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
                <Text style={GlobalStyles.h3}>Đăng ký bằng Số điện thoại</Text>
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
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 20,
                        justifyContent: 'space-between',
                        paddingHorizontal: 15,
                    }}
                >
                    <Text style={GlobalStyles.h4}>RePassword</Text>
                    <View>
                        <TextInput
                            autoFocus={false}
                            value={rePassword}
                            onChangeText={handleRePassword}
                            numeric
                            secureTextEntry={true}
                            placeholder={'RePassword'}
                            style={{ borderBottomWidth: 1, width: windowWidth / 1.5, marginLeft: 10, paddingLeft: 10 }}
                        ></TextInput>
                        {!isRePassword && (
                            <Text style={[{ marginLeft: 15, color: GlobalStyles.red.color }, GlobalStyles.h5]}>
                                Password nhập lại không đúng
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
                    <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({});
