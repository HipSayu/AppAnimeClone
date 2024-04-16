import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import React, { useState } from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

import axios from 'axios';

const regexNumberPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export default function SDTPage() {
    const windowWidth = Dimensions.get('window').width;

    const navigation = useNavigation();

    const [number, setNumber] = useState();

    const [validate, setValidate] = useState('');

    const [isSDT, setIsSDT] = useState(false);

    const HandleValidation = (number) => {
        if (!regexNumberPhone.test(number.trim())) {
            axios
                .get(`http://localhost:5179/api/Login/CheckSDT/${number}`)
                .then((response) => {
                    navigation.navigate('LoginSDTPage', { SDT: number });
                })
                .catch((error) => {
                    navigation.navigate('ResgisterSDTPage', { SDT: number });
                });
        } else {
            setValidate('Số điện thoại không chính xác');
            setIsSDT(false);
            return false;
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
                            onChangeText={setNumber}
                            keyboardType={'numeric'}
                            autoFocus={true}
                            numeric
                            placeholder="Nhập số điện thoại"
                            style={{ borderBottomWidth: 1, width: windowWidth / 1.5, marginLeft: 10, paddingLeft: 10 }}
                        ></TextInput>
                        <Text style={[{ marginLeft: 15, color: GlobalStyles.red.color }, GlobalStyles.h5]}>
                            {validate}
                        </Text>
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
