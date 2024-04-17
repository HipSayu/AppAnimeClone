import { ImageBackground, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import GlobalStyles from '~/Styles/GlobalStyles';

import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import { getAnimeHomePage } from '~/Services/Api';

//Anime
const Anime = [
    { Name: 'Shikimori không chỉ dễ thương thôi đâu', Image: require('~/Assets/Image/Shikimori.png'), Quality: '4K' },
    { Name: 'Rồng hầu gái nhà kobayashi', Image: require('~/Assets/Image/Torhu.jpg'), Quality: '4K' },
    { Name: 'Lycoris Recoil', Image: require('~/Assets/Image/LycorisRecoil.png'), Quality: '2K' },
    { Name: 'Nhà có 5 tô bún', Image: require('~/Assets/Image/NhaCoNamNangDau.jpg'), Quality: '2K' },
];

const DataNav = [
    { Image: require('~/Assets/Icon/IconNav/List.png'), Name: 'Mục lục' },
    { Image: require('~/Assets/Icon/IconNav/Clock.png'), Name: 'Lịch Chiếu' },
    { Image: require('~/Assets/Icon/IconNav/RetroTV.png'), Name: 'Xếp hạng' },
    { Image: require('~/Assets/Icon/IconNav/MembershipCard.png'), Name: 'Premium' },
];
const Continue = [
    { Image: require('~/Assets/Image/DateAlive.png'), Name: 'Cuộc hẹn sống còn' },
    { Image: require('~/Assets/Image/ChainsawMan.jpg'), Name: 'Chainsaw Man' },
    { Image: require('~/Assets/Image/Spy.jpg'), Name: 'Spy x Family' },
];

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function AnimeHomePage() {
    const [animeContinuce, SetAnimeContinuce] = useState([]);
    const [anime, setAnime] = useState([]);

    useEffect(() => {
        getAnimeHomePage((pageSize = 4), (pageIndex = 1), (keyword = 'a'))
            .then((response) => {
                setAnime(response.data.items);
            })
            .catch((error) => {
                console.log('Lỗi Anime');
            });
    }, []);

    useEffect(() => {
        getAnimeHomePage((pageSize = 3), (pageIndex = 2), (keyword = 'c'))
            .then((response) => {
                SetAnimeContinuce(response.data.items);
            })
            .catch((error) => {
                console.log('Lỗi Anime');
            });
    }, []);

    return (
        <View style={[styles.Page, { backgroundColor: 'white' }]}>
            {/* Header Title */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Image */}
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground
                        borderRadius={5}
                        style={{
                            width: windowWidth / 1.05,
                            height: 173,
                            marginTop: 10,
                            flexDirection: 'column-reverse',
                        }}
                        source={require('~/Assets/Image/SoloLeveling.jpeg')}
                    >
                        <Text style={[GlobalStyles.h4, { marginLeft: 5, marginBottom: 5, color: '#454545' }]}>
                            Chỉ mình tôi thăng cấp
                        </Text>
                    </ImageBackground>
                </View>
                {/* Nav */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                    }}
                >
                    {DataNav.map((item, index) => (
                        <View style={{ alignItems: 'center', marginHorizontal: 10 }} key={index}>
                            <ImageBackground source={item.Image} style={{ width: 50, height: 50 }} />
                            <Text style={GlobalStyles.h4_Medium}>{item.Name}</Text>
                        </View>
                    ))}
                </View>
                {/* Tiếp tục */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10 }]}>Tiếp tục xem</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ flexDirection: 'row', marginLeft: 10 }}
                    >
                        {anime.map((item, index) => (
                            <AnimeVideo
                                key={index}
                                Quality={item.quality}
                                width={windowWidth / 2.5}
                                height={96}
                                Image={{ uri: item.animeUrl }}
                                Name={item.nameAnime}
                            />
                        ))}
                    </ScrollView>
                </View>
                {/* Đang thịnh hành */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10 }]}>Đang thịnh hành</Text>
                    <View
                        style={{
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginLeft: 10,
                        }}
                    >
                        {animeContinuce.map((item, index) => (
                            <AnimeVideo
                                key={index}
                                Quality={item.quality}
                                width={windowWidth / 2.2}
                                height={96}
                                Image={{ uri: item.animeUrl }}
                                Name={item.nameAnime}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
            {/* Anime List */}
        </View>
    );
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: GlobalStyles.white.color,
        alignItems: 'center',
    },
});
