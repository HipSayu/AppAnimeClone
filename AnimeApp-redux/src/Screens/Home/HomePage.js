import { useWindowDimensions } from 'react-native';
import { Dimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import React from 'react';
import RecommentHomePage from './Recomment/RecommentHomePage';
import AnimeHomePage from './Anime/AnimeHomePage';

import GlobalStyles from '~/Styles/GlobalStyles';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

const renderScene = SceneMap({
    first: RecommentHomePage,
    second: AnimeHomePage,
});

const renderTabBar = (props) => (
    <TabBar
        {...props}
        inactiveColor={GlobalStyles.gray.color}
        tabStyle={{ alignItems: 'center' }}
        labelStyle={[{ color: 'black' }, GlobalStyles.h4]}
        contentContainerStyle={{ marginTop: 20 }}
        indicatorStyle={{ backgroundColor: 'black', width: 100, marginLeft: windowWidth / 9, borderColor: '#fff' }}
        style={{ backgroundColor: 'white', borderColor: '#fff' }}
    />
);
export default function HomePage() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Đề xuất' },
        { key: 'second', title: 'Anime' },
    ]);
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
    );
}
