import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { PacmanIndicator } from 'react-native-indicators';
import GlobalStyles from '~/Styles/GlobalStyles';
import AnimeMV from '~/Components/AMV/AnimeMV';
import axios from 'axios';

export default function IntroduceVideoPage({ data }) {
    const [video, setVideo] = useState([]);
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;

    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        axios
            .get(`http://localhost:5179/api/Video/get-all?pageSize=10&pageIndex=1&keyword=v`)
            .then((res) => {
                setVideo(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Axios', err);
            });
    }, [data]);
    console.log('video Introduce', video);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: GlobalStyles.white.color,
                height: windowHeight / 1,
                paddingBottom: 20,
                zIndex: 2,
            }}
        >
            <View style={{ marginLeft: 20 }}>
                {/* NameVideo */}
                <Text
                    style={[GlobalStyles.h3_Medium, { width: windowWidth / 1.2, marginTop: 10 }]}
                    ellipsizeMode="clip"
                >
                    {data.nameVideos}
                </Text>
                {/* Active  */}
                <View
                    style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingRight: 20,
                        marginTop: 10,
                    }}
                >
                    <View style={{ alignItems: 'center', marginLeft: 5 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Like.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>99.K</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Bookmark.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>Yêu thích</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Download.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>Tải xuống</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginHorizontal: 10 }}>
                        <ImageBackground
                            source={require('~/Assets/Icon/IconActive/Share.png')}
                            style={{ width: 30, height: 30 }}
                        />
                        <Text style={GlobalStyles.h5_Medium}>Share</Text>
                    </View>
                </View>
                <View>
                    <Text style={[GlobalStyles.h3_Medium, { marginTop: 10 }]}>Đề xuất cho bạn</Text>
                </View>
                {video.lenght == 0 ? (
                    <PacmanIndicator size={100} color="black" />
                ) : (
                    <View>
                        {video.map((item, index) => (
                            <AnimeMV
                                key={index}
                                navigation={navigation}
                                dataAvatar={item.usderId}
                                dataVideo={item.id}
                                NameVideo={item.nameVideos}
                                sourceAvartar={{ uri: item.avatarUserUrl }}
                                UserName={item.nameUser}
                                sourceAnime={{ uri: item.avatarVideoUrl }}
                                Width={2.1}
                                Height={100}
                                ViewAvatar="1.M lượt xem"
                                widthAvatar={20}
                                IsSearch={true}
                                flexDirection="row"
                                IsHasICon={false}
                            />
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
