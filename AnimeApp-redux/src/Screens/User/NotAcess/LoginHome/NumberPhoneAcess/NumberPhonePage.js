import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import React, { useState } from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

import { checkNumberPhone } from '~/Services/Action/Login';

import Popup from '~/Common/Constanst';

const regexNumberPhone = /^[0-9\-\+]{9,15}$/;

const windowWidth = Dimensions.get('window').width;
export default function NumberPhonePage() {
    const navigation = useNavigation();

    const [number, setNumber] = useState('');

    const [isNumberPhone, setIsNumberPhone] = useState(true);

    const handleNumberPhoneChange = (text) => {
        if (!text.startsWith(' ')) {
            setNumber(text);
        }
        if (!regexNumberPhone.test(number.trim())) {
            setIsNumberPhone(true);
        } else {
            setIsNumberPhone(false);
        }
    };

    const HandleValidation = (number) => {
        if (regexNumberPhone.test(number.trim())) {
            checkNumberPhone(number)
                .then((response) => {
                    console.log('response', response.data);
                    navigation.navigate('LoginNumberPhonePage', { SDT: number });
                })
                .catch((error) => {
                    navigation.navigate('ResgisterNumberPhonePage', { SDT: number });
                });
        } else {
            Popup('Số điện thoại không chính xác');
        }
    };

    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => {
                    navigation.push('UserHomePage');
                }}
            >
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/IconReturn.png')} />
            </TouchableOpacity>
            <View style={{ marginLeft: 10, marginTop: 10 }}>
                <Text style={GlobalStyles.h3}>Số điện thoại</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'center' }}>
                    <Text style={GlobalStyles.h4}>VN +84</Text>
                    <View>
                        <TextInput
                            value={number}
                            onChangeText={handleNumberPhoneChange}
                            keyboardType={'numeric'}
                            autoFocus={true}
                            numeric
                            placeholder="Nhập số điện thoại"
                            style={{ borderBottomWidth: 1, width: windowWidth / 1.5, marginLeft: 10, paddingLeft: 10 }}
                        ></TextInput>
                        {isNumberPhone && (
                            <Text style={[{ marginLeft: 15, color: GlobalStyles.red.color }, GlobalStyles.h5]}>
                                Số điện thoại không chính xác
                            </Text>
                        )}
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
                <TouchableOpacity
                    onPress={() => {
                        var a = HandleValidation(number);
                    }}
                    style={{
                        backgroundColor: GlobalStyles.blue.color,
                        borderRadius: 5,
                        padding: 10,
                        alignItems: 'center',
                    }}
                >
                    <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Tiếp</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
