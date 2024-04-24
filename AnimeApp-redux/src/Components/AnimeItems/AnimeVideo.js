import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';

export default function AnimeVideo({
    idAnime,
    isSearch = false,
    quality = '',
    continueText = '',
    width = 138,
    height = 182,
    textInner = '',
    marginRight = 10,
    marginTop = 10,
    name = 'Noname',
    image = require('~/Assets/Image/Shikimori.png'),
    navigation = function () {},
}) {
    const styleIsSearch = {
        marginLeft: isSearch ? 10 : 0,
    };
    !isSearch ? (Searchlayout = 'column') : (Searchlayout = 'row');

    const handleOnpressNavigation = () => {
        axios
            .get(`http://localhost:5179/api/Anime/get-anime-video?AnimeId=${idAnime}`)
            .then((res) => {
                // console.log(res.data);
                navigation.navigate('PlayVideoPage', {
                    data: res.data.animeVideos[0].idVideo,
                    AnimeVideos: res.data.animeVideos,
                });
            })
            .catch((err) => {
                console.log('Lỗi Axios', err);
            });
    };

    return (
        <TouchableOpacity
            onPress={() => {
                handleOnpressNavigation();
            }}
            style={{ marginRight: marginRight, marginTop: marginTop }}
        >
            {/* Image */}
            {continueText !== '' ? (
                <View style={{ flexDirection: Searchlayout }}>
                    <ImageBackground
                        borderRadius={5}
                        resizeMode="cover"
                        style={{
                            width: width,
                            height: height,
                            justifyContent: 'flex-end',
                            flexDirection: 'row',
                        }}
                        source={image}
                    >
                        {textInner != '' ? (
                            <Text
                                style={[{ top: height / 1.2, right: width / 3 }, GlobalStyles.h5, GlobalStyles.white]}
                            >
                                {textInner}
                            </Text>
                        ) : (
                            <></>
                        )}
                        {/* 4K */}
                        {quality != '' ? (
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
                                    {quality}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                    </ImageBackground>
                    <View style={styleIsSearch}>
                        {/* Name Anime */}
                        <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>{name}</Text>
                        {/* Text phụ */}
                        <Text style={[GlobalStyles.h4_Regular, GlobalStyles.gray, { width: width - width * 0.2 }]}>
                            {continueText}
                        </Text>
                        {isSearch ? (
                            <View
                                style={{
                                    backgroundColor: GlobalStyles.blue.color,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    marginTop: 10,
                                }}
                            >
                                <ImageBackground
                                    style={{ width: 20, height: 20, marginRight: 10 }}
                                    source={require('~/Assets/Icon/tv.png')}
                                />
                                <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Yêu thích</Text>
                            </View>
                        ) : (
                            <></>
                        )}
                    </View>
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
                        source={image}
                    >
                        {/* 4K */}
                        {quality != '' ? (
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
                                    {quality}
                                </Text>
                            </View>
                        ) : (
                            <></>
                        )}
                    </ImageBackground>
                    {/* Name Anime */}
                    <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>
                        <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>{name}</Text>
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({});
