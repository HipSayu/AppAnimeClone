import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function SearchHistory({ Search, handleOnpress = () => {} }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingLeft: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <ImageBackground
                    style={{ width: 20, height: 20, marginRight: 10, marginTop: 5 }}
                    source={require('~/Assets/Icon/Clock.png')}
                />
                <TouchableOpacity
                    onPress={() => {
                        handleOnpress();
                    }}
                    style={{ padding: 5 }}
                >
                    <Text>{Search}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ padding: 5 }}>
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/Close.png')} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});
