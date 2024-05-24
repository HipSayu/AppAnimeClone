import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/Components/Adicator/Loading';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function SearchHomePage() {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.GetAnimeHomeReducer);
    let anime = data.Animes;
    let isLoading = data.isLoading;
    let error = data.error;

    const login = useSelector((state) => state.loginReducer);

    useEffect(() => {
        dispatch({
            type: 'GET_ANIME_HOME_RESQUEST',
        });
    }, [login]);

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: Error Network</Text>
            </View>
        );
    }

    return (
        <View>
            <View style={{ alignItems: 'center' }}>
                <ImageBackground
                    borderRadius={10}
                    style={{ width: windowWidth / 1.05, height: 103, marginTop: 20 }}
                    source={require('~/Assets/Image/AnimeBackground.png')}
                />
            </View>
            <View style={{ marginTop: 20, marginLeft: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                <Text>Anime Thịnh hành</Text>
                <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/ArrowIcon.png')} />
            </View>
            <View>
                {isLoading ? (
                    <Loading />
                ) : (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 10 }}>
                        {anime.map((item, index) => (
                            <AnimeVideo
                                key={index}
                                quality={item.quality}
                                image={{ uri: item.animeUrl }}
                                name={item.nameAnime}
                                marginRight={20}
                                width={windowWidth / 2.6}
                                height={182}
                            />
                        ))}
                    </ScrollView>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
