import { Text, useWindowDimensions } from 'react-native';
import { Dimensions } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import React, { useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

import IntroduceVideoPage from './IntroduceVideo/IntroduceVideoPage';
import CommentPage from './Comments/CommentPage';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;

const renderTabBar = (props) => (
    <TabBar
        {...props}
        inactiveColor={GlobalStyles.gray.color}
        labelStyle={[{ color: 'black' }, GlobalStyles.h4]}
        contentContainerStyle={{ height: 40 }}
        indicatorStyle={{ backgroundColor: 'black', width: 60, marginLeft: windowWidth / 5.9, borderColor: '#fff' }}
        indicatorContainerStyle={{ shadowOpacity: 1 }}
        style={{ backgroundColor: 'white', borderColor: '#fff', height: 40, borderWidth: 0 }}
    />
);
export default function MainVideoHomePage({ data, animeVideo, likes }) {
    const renderScene = SceneMap({
        first: () => <IntroduceVideoPage data={data} animeVideo={animeVideo} likes={likes} />,
        second: () => <CommentPage data={data} />,
    });
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Giới thiệu' },
        { key: 'second', title: 'Bình luận' },
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
