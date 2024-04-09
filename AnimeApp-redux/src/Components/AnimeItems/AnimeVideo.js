import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';

export default function AnimeVideo({
    idAnime,
    IsSearch = false,
    Quality = '',
    ContinueText = '',
    width = 138,
    height = 182,
    Textinner = '',
    marginRight = 10,
    marginTop = 10,
    Name = 'Noname',
    Image = require('~/Assets/Image/Shikimori.png'),
    navigation = function () {},
}) {
    const styleIsSearch = {
        marginLeft: IsSearch ? 10 : 0,
    };
    !IsSearch ? (Searchlayout = 'column') : (Searchlayout = 'row');

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
            {ContinueText !== '' ? (
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
                    <View style={styleIsSearch}>
                        {/* Name Anime */}
                        <Text style={[GlobalStyles.h4_Medium, { width: width, marginTop: 5 }]}>{Name}</Text>
                        {/* Text phụ */}
                        <Text style={[GlobalStyles.h4_Regular, GlobalStyles.gray, { width: width - width * 0.2 }]}>
                            {ContinueText}
                        </Text>
                        {IsSearch ? (
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
