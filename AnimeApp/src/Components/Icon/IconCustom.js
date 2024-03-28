import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import GlobalStyles from '~/Styles/GlobalStyles';
import React from 'react';

export default function IconCustom({ size, sourceIcon = '', text }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {sourceIcon === 'Heart' ? (
                <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={require('~/Assets/Icon/IconNav/Heart.png')}
                />
            ) : (
                <></>
            )}
            {sourceIcon === 'HeartActive' ? (
                <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={require('~/Assets/Icon/IconNav/HeartActive.png')}
                />
            ) : (
                <></>
            )}
            {sourceIcon === 'HomeActive' ? (
                <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={require('~/Assets/Icon/IconNav/HomePageActive.png')}
                />
            ) : (
                <></>
            )}

            {sourceIcon === 'Home' ? (
                <ImageBackground style={{ width: 30, height: 30 }} source={require('~/Assets/Icon/IconNav/Home.png')} />
            ) : (
                <></>
            )}
            {sourceIcon === 'AddCreate' ? (
                <ImageBackground style={{ width: 40, height: 40 }} source={require('~/Assets/Icon/IconNav/Add.png')} />
            ) : (
                <></>
            )}
            {sourceIcon === 'SearchActive' ? (
                <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={require('~/Assets/Icon/IconNav/SearchActive.png')}
                />
            ) : (
                <></>
            )}
            {sourceIcon === 'Search' ? (
                <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={require('~/Assets/Icon/IconNav/Search.png')}
                />
            ) : (
                <></>
            )}
            {sourceIcon === 'UserActive' ? (
                <ImageBackground
                    style={{ width: 30, height: 30 }}
                    source={require('~/Assets/Icon/IconNav/UserActive.png')}
                />
            ) : (
                <></>
            )}
            {sourceIcon === 'User' ? (
                <ImageBackground style={{ width: 30, height: 30 }} source={require('~/Assets/Icon/IconNav/User.png')} />
            ) : (
                <></>
            )}

            {text !== '' ? <Text style={GlobalStyles.h5}>{text} </Text> : <></>}
        </View>
    );
}

const styles = StyleSheet.create({});
