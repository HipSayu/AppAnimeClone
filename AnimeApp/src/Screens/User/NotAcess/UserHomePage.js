import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
export default function UserHomePage() {
    const darkMode = useSelector((state) => state.AppReducer.darkMode);
    const isLoading = useSelector((state) => state.AppReducer.isLoading);
    const dispash = useDispatch();

    console.log('darkMode :', darkMode);

    const backgroundColor = {
        backgroundColor: darkMode ? 'black' : 'white',
    };
    const navigation = useNavigation();
    return (
        <View style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }, backgroundColor]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('LoginHome');
                }}
            >
                <Text>Login</Text>
                <Switch
                    value={darkMode}
                    onValueChange={() => dispash({ type: 'CHANGE_APP_MODE', payload: { darkMode: !darkMode } })}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({});
