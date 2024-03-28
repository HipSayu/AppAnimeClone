import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function LoginHomePage() {
    const navigation = useNavigation();
    return (
        <>
            <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => {
                    navigation.push('UserHomePage');
                }}
            >
                <Text>Trở về</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LoginHomePage');
                    }}
                >
                    <Text>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LoginHomePage');
                    }}
                >
                    <Text>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LoginHomePage');
                    }}
                >
                    <Text>Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('SDTPage');
                    }}
                >
                    <Text>Điện thoại</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({});
