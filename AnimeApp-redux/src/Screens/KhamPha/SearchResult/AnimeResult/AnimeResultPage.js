import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import { getAnimeHomePage } from '~/Services/Api';

export default function AnimeResultPage({ data }) {
    const [anime, setAnime] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getAnimeHomePage(5, 1, data)
            .then((res) => {
                setAnime(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, [data]);

    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {/* Anime */}
            {anime.map((item, index) => (
                <AnimeVideo
                    key={index}
                    IsSearch={true}
                    ContinueText="2023 | Anime"
                    idAnime={item.id}
                    navigation={navigation}
                    Quality={item.quality}
                    Image={{ uri: item.animeUrl }}
                    Name={item.nameAnime}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
