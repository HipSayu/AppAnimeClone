import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';
export default function AnimeVideo({
    Quality = '',
    ContinueText = '',
    width = 138,
    height = 182,
    Textinner = '',
    marginRight = 10,
    marginTop = 10,
    Name = 'Noname',
    Image = require('~/Assets/Image/Shikimori.png'),
}) {
    return (
        <TouchableOpacity style={{ marginRight: marginRight, marginTop: marginTop }}>
            {/* Image */}
            {ContinueText !== '' ? (
                <View>
                    <ImageBackground
                        borderRadius={5}
                        resizeMode="cover"
                        style={{
                            width: width,
                            height: height,
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                        }}
                        source={Image}
                    >
                        {Textinner != '' ? (
                            <Text
                                style={[{ top: height / 1.2, right: width / 3 }, GlobalStyles.h5, GlobalStyles.white]}
                            >
                                {Textinner}
                            </Text>
                        ) : (
                            <></>
                        )}
                        {/* 4K */}
                        {Quality != '' ? (
                            <View
                                style={[
                                    {
                                        width: 20,
                                        height: 20,
                                        backgroundColor: GlobalStyles.blue.color,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                    },
                                ]}
                            >
                                <Text style={[GlobalStyles.h5_Medium, { color: GlobalStyles.white.color }]}>
                                    {Quality}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                    </ImageBackground>
                    {/* Name Anime */}
                    <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>{Name}</Text>
                    <Text style={[GlobalStyles.h4_Regular, GlobalStyles.gray, { width: width - width * 0.2 }]}>
                        {ContinueText}
                    </Text>
                </View>
            ) : (
                <View>
                    <ImageBackground
                        borderRadius={5}
                        resizeMode="cover"
                        style={{
                            width: width,
                            height: height,
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                        }}
                        source={Image}
                    >
                        {/* 4K */}
                        {Quality != '' ? (
                            <View
                                style={[
                                    {
                                        width: 20,
                                        height: 20,
                                        backgroundColor: GlobalStyles.blue.color,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                    },
                                ]}
                            >
                                <Text style={[GlobalStyles.h5_Medium, { color: GlobalStyles.white.color }]}>
                                    {Quality}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                    </ImageBackground>
                    {/* Name Anime */}
                    <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>
                        <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>{Name}</Text>
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
