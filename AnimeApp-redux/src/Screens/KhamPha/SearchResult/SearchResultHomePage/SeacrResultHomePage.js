import { Text, useWindowDimensions } from 'react-native';
import { Dimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import React, { useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

import AllResultPage from '../AllResult/AllResultPage';
import UserResultPage from '../UserResult/UserResultPage';
import AnimeResultPage from '../AnimeResult/AnimeResultPage';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

const renderScene = SceneMap({
    first: AllResultPage,
    second: AnimeResultPage,
    third: UserResultPage,
});

const renderTabBar = (props) => (
    <TabBar
        {...props}
        labelStyle={[{ color: 'black' }, GlobalStyles.h5]}
        contentContainerStyle={{ height: 40 }}
        indicatorStyle={{ backgroundColor: 'black', width: 50, marginLeft: windowWidth / 11, borderColor: '#fff' }}
        style={{ backgroundColor: 'white', borderColor: '#fff' }}
    />
);
export default function SeacrResultHomePage() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Tất cả' },
        { key: 'second', title: 'Anime' },
        { key: 'third', title: 'Nhà phát triển' },
    ]);
    return (
        <>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={renderTabBar}
            />
        </>
    );
}
