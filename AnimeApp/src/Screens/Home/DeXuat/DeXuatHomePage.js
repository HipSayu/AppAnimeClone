import { ImageBackground, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Dimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';

import AnimeMV from '~/Components/AMV/AnimeMV';

/*Data fake*/

//Anime
const Anime = [
    { Name: 'Shikimori không chỉ dễ thương thôi đâu', Image: require('~/Assets/Image/Shikimori.png'), Quality: '4K' },
    { Name: 'Rồng hầu gái nhà kobayashi', Image: require('~/Assets/Image/Torhu.jpg'), Quality: '4K' },
    { Name: 'Lycoris Recoil', Image: require('~/Assets/Image/LycorisRecoil.png'), Quality: '2K' },
    { Name: 'Nhà có 5 tô bún', Image: require('~/Assets/Image/NhaCoNamNangDau.jpg'), Quality: '2K' },
];

const AnimeMVs = [
    {
        NameVideo: 'Tưởng nhớ em anh chỉ muốn níu giữ thời gian',
        Image: require('~/Assets/AmvImage/Chisato.jpg'),
        AvatarImage: require('~/Assets/Avatar/HatsuneMiku.jpg'),
        UserName: 'Hatsune Miku',
        Time: '01:36',
        Viewer: '100M',
    },
    {
        NameVideo: 'Bị người bỏ tôi trở thành thầy cúng',
        Image: require('~/Assets/AmvImage/Gojo.jpg'),
        AvatarImage: require('~/Assets/Avatar/Gojo.png'),
        UserName: 'Gojo Satoru',
        Time: '01:36',
        Viewer: '900M',
    },
    {
        NameVideo: 'Lycoris ',
        Image: require('~/Assets/AmvImage/AMV1.png'),
        AvatarImage: require('~/Assets/Avatar/MaoMao.jpg'),
        UserName: 'Gojo Satoru',
        Time: '01:36',
        Viewer: '900M',
    },
];

// 1. witdh : 138 height :182 text dưới
// 2. witdh : 358 height :172
// 3. witdh : 146 height :96
// 4. witdh : 173 height :96 /2.2

//User
//1.witdh : 44 height 44: Tên cạch text cạch có icon
//2.width : 20 hegiht 20 : tến cạnh text trên view dưới
// 3. width :50 height 59 : tên dưới
//4 . width : 40 height : 40 tên cạnh có time tên dưới

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

export default function DeXuatHomePage() {
    return (
        <View style={styles.Page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.HeaderWrapper}>
                    <Text style={[GlobalStyles.h4_Regular]}>Anime</Text>
                    <ImageBackground
                        style={{ width: 20, height: 20 }}
                        source={require('~/Assets/Icon/ArrowIcon.png')}
                    />
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

                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    {/* ImageVideo */}
                    {AnimeMVs.map((amv, index) => (
                        <AnimeMV
                            key={index}
                            sourceAnime={amv.Image}
                            sourceAvartar={amv.AvatarImage}
                            NameVideo={amv.NameVideo}
                            Time={amv.Time}
                            UserName={amv.UserName}
                            Viewer={amv.Viewer}
                            inViewer={true}
                        />
                    ))}
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
    },
    HeaderWrapper: {
        paddingLeft: 10,
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    Nav: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    NavText: {
        marginRight: 10,
    },
});
