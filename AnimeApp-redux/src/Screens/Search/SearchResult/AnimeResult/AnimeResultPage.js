import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import GlobalStyles from '~/Styles/GlobalStyles';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/Components/Adicator/Loading';

export default function AnimeResultPage({ data }) {
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const dataSearchAnime = useSelector((state) => state.getAnimeSearchReducer);
    let anime = dataSearchAnime.animes;
    let isLoadingAnime = dataSearchAnime.isLoading;

    useEffect(() => {
        dispatch({
            type: 'GET_ANIME_SEARCH_RESQUEST',
            payload: { pageSize: 2, pageIndex: 1, keyword: data },
        });
    }, [data]);

    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {anime.length == 0 ? (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <ImageBackground
                        style={{ width: 150, height: 150 }}
                        source={require('~/Assets/NoSearch.png')}
                    ></ImageBackground>
                    <Text>Xin lỗi kết quả tìm kiếm không phù hợp</Text>
                </View>
            ) : isLoadingAnime ? (
                <Loading />
            ) : (
                anime.map((item, index) => (
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
                ))
            )}

            {/* Anime */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
