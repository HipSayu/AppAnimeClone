import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import Popup from '~/Common/Constanst';

export default function Information({ name, data, page = '', route }) {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                if (page != '') {
                    navigation.navigate(page, route);
                } else {
                    Popup('Đang phát triển');
                }
            }}
        >
            <View
                style={{
                    marginTop: 20,
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    alignItems: 'center',
                }}
            >
                <Text style={GlobalStyles.h4}>{name}</Text>
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={GlobalStyles.h4_Medium}>{data}</Text>

                    <ImageBackground
                        style={{ width: 20, height: 20, marginLeft: 20 }}
                        source={require('~/Assets/Icon/ArrowIcon.png')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
