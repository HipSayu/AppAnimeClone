import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function ActionList({
    onPress = function () {},
    IconLeft = require('~/Assets/Icon/Clock.png'),
    Name = 'Thầy cúng đại chiến',
    IconRight = require('~/Assets/Icon/ArrowIcon.png'),
}) {
    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <ImageBackground style={{ width: 20, height: 20, marginRight: 10 }} source={IconLeft} />
                    <Text style={GlobalStyles.h4}>{Name}</Text>
                </View>
                <ImageBackground style={{ width: 20, height: 20 }} source={IconRight} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
