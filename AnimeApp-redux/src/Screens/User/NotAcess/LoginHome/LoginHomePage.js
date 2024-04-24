import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Checkbox from 'expo-checkbox';

import React, { useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function LoginHomePage() {
    const [isChecked, setChecked] = useState(false);

    const navigation = useNavigation();

    return (
        <View
            style={{
                backgroundColor: GlobalStyles.white.color,
                flex: 1,
                justifyContent: 'space-between',
                paddingTop: 10,
            }}
        >
            <View>
                <TouchableOpacity
                    style={{ marginTop: 30, marginLeft: 10 }}
                    onPress={() => {
                        navigation.push('UserHomePage');
                    }}
                >
                    <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/Close.png')} />
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground style={{ width: 208, height: 201 }} source={require('~/Assets/App.png')} />
                    <Text style={[GlobalStyles.h4, { marginTop: 10 }]}>Đăng Nhập Vào App</Text>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <ImageBackground style={{ width: 40, height: 40 }} source={require('~/Assets/Facebook.png')} />
                        <Text style={[GlobalStyles.h4_Medium, { marginLeft: 5 }]}>Đăng nhập bằng facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <ImageBackground style={{ width: 40, height: 40 }} source={require('~/Assets/Google.png')} />
                        <Text style={[GlobalStyles.h4_Medium, { marginLeft: 5, width: 185 }]}>
                            {' '}
                            Đăng nhập bằng Google{' '}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                        <ImageBackground style={{ width: 40, height: 40 }} source={require('~/Assets/Twitter.png')} />
                        <Text style={[GlobalStyles.h4_Medium, { marginLeft: 5, width: 180 }]}>
                            Đăng nhập bằng Twitter{'   '}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            isChecked ? navigation.navigate('NumberPhonePage') : null;
                        }}
                        style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}
                    >
                        <Text style={[GlobalStyles.h4_Medium, { marginLeft: 5 }]}>
                            Đăng nhập bằng <Text style={[GlobalStyles.h4, GlobalStyles.blue]}>Điện thoại</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View
                style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: windowWidth / 1.2,
                    marginBottom: 10,
                    marginLeft: 10,
                }}
            >
                <Checkbox
                    style={{ marginHorizontal: 10 }}
                    value={isChecked}
                    onValueChange={setChecked}
                    color={isChecked ? '#4630EB' : undefined}
                />
                <Text>Nếu tiếp tục bạn đã đồng ý với điều khoản sử dụng và chính sách riêng tư của app</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
