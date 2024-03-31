import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function SearchHistory() {
    return (
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
    );
}

const styles = StyleSheet.create({});
