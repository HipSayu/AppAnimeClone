import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;
const Anime = [
    { Name: 'Shikimori không chỉ dễ thương thôi đâu', Image: require('~/Assets/Image/Shikimori.png'), Quality: '4K' },
    { Name: 'Rồng hầu gái nhà kobayashi', Image: require('~/Assets/Image/Torhu.jpg'), Quality: '4K' },
    { Name: 'Lycoris Recoil', Image: require('~/Assets/Image/LycorisRecoil.png'), Quality: '2K' },
    { Name: 'Nhà có 5 tô bún', Image: require('~/Assets/Image/NhaCoNamNangDau.jpg'), Quality: '2K' },
];
export default function SearchHomePage() {
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
                    {Anime.map((anime, index) => (
                        <AnimeVideo
                            key={index}
                            marginRight={20}
                            Quality={anime.Quality}
                            Image={anime.Image}
                            Name={anime.Name}
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
