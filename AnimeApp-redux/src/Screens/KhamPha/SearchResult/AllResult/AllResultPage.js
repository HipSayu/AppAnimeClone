import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AMV/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import { PacmanIndicator } from 'react-native-indicators';
import { getAnimeHomePage, getVideoHomePage } from '~/Services/Api';

export default function AllResultPage({ data }) {
    const [result, setResult] = useState([]);

    const [anime, setAnime] = useState([]);

    const navigation = useNavigation();
    useEffect(() => {
        getVideoHomePage(10, 1, data)
            .then((res) => {
                setResult(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, [data]);

    useEffect(() => {
        getAnimeHomePage(2, 1, data)
            .then((res) => {
                setAnime(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, [data]);

    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {!Array.isArray(result) ? (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <PacmanIndicator size={100} />
                </View>
            ) : (
                <View>
                    {result.length == 0 ? (
                        <View style={{ alignItems: 'center' }}>
                            <ImageBackground
                                style={{ width: 150, height: 150 }}
                                source={require('~/Assets/NoSearch.png')}
                            ></ImageBackground>
                            <Text>Xin lỗi kết quả tìm kiếm không phù hợp</Text>
                        </View>
                    ) : (
                        <>
                            {anime.map((item, index) => (
                                <AnimeVideo
                                    key={index}
                                    isSearch={true}
                                    continueText="2023 | Anime"
                                    idAnime={item.id}
                                    navigation={navigation}
                                    quality={item.quality}
                                    image={{ uri: item.animeUrl }}
                                    name={item.nameAnime}
                                />
                            ))}

                            {result.map((item, index) => (
                                <AnimeMV
                                    key={index}
                                    navigation={navigation}
                                    dataAvatar={item.usderId}
                                    dataVideo={item.id}
                                    nameVideo={item.nameVideos}
                                    sourceAvartar={{ uri: item.avatarUserUrl }}
                                    userName={item.nameUser}
                                    sourceAnime={{ uri: item.avatarVideoUrl }}
                                    width={2.1}
                                    height={100}
                                    viewAvatar="1.M lượt xem"
                                    widthAvatar={20}
                                    isSearch={true}
                                    flexDirection="row"
                                    isHasICon={false}
                                />
                            ))}
                        </>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
