import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import { getAnimeHomePage } from '~/Services/Api';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function SearchHomePage() {
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
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingLeft: 10 }}>
                    {anime.map((item, index) => (
                        <AnimeVideo
                            key={index}
                            Quality={item.quality}
                            Image={{ uri: item.animeUrl }}
                            Name={item.nameAnime}
                            marginRight={20}
                            width={windowWidth / 2.6}
                            height={182}
                        />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
