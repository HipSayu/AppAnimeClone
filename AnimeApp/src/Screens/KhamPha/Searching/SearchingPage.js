import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function SearchingPage() {
    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <ImageBackground
                    borderRadius={10}
                    style={{ width: windowWidth / 1.05, height: 0 }}
                    source={require('~/Assets/Image/AnimeBackground.png')}
                />
            </View>
            <View style={{ marginTop: 10, marginLeft: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text style={GlobalStyles.h4}>Lịch sử tìm kiếm</Text>
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/trash.png')} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingLeft: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <ImageBackground
                        style={{ width: 20, height: 20, marginRight: 10 }}
                        source={require('~/Assets/Icon/Clock.png')}
                    />
                    <Text>Thầy cúng đại chiến</Text>
                </View>
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/Close.png')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
