import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AnimeVideo/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/Components/Adicator/Loading';

export default function AllResultPage({ data }) {
    const dispatch = useDispatch();
    const dataSearchAnime = useSelector((state) => state.getAnimeSearchReducer);
    let anime = dataSearchAnime.animes;
    let isLoadingAnime = dataSearchAnime.isLoading;

    const dataSearchVideo = useSelector((state) => state.getVideoSearchReducer);
    let video = dataSearchVideo.videoSearchs;
    let isLoadingVideo = dataSearchVideo.isLoading;

    const navigation = useNavigation();
    useEffect(() => {
        dispatch({
            type: 'GET_VIDEO_SEARCH_RESQUEST',
            payload: { pageSize: 10, pageIndex: 1, keyword: data },
        });
    }, [data]);

    useEffect(() => {
        dispatch({
            type: 'GET_ANIME_SEARCH_RESQUEST',
            payload: { pageSize: 2, pageIndex: 1, keyword: data },
        });
    }, [data]);
    console.log('video', video);

    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            <View style={{}}>
                {anime.length == 0 && video.length == 0 ? (
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
                    </>
                )}
                {isLoadingVideo ? (
                    <Loading />
                ) : (
                    video.map((item, index) => (
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
                    ))
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
