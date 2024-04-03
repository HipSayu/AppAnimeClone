import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';
import AnimeMV from '~/Components/AMV/AnimeMV';

export default function IntroduceVideoPage() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const getVideo = useSelector((state) => state.GetVideoReducer);

    console.log('getVideo', getVideo);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: GlobalStyles.white.color, height: windowHeight / 1, paddingBottom: 20 }}
        >
            <View style={{ marginLeft: 20 }}>
                {/* NameVideo */}
                <Text
                    style={[GlobalStyles.h3_Medium, { width: windowWidth / 1.2, marginTop: 10 }]}
                    ellipsizeMode="clip"
                >
                    {getVideo.Videos.nameVideos}
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
                <View>
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem"
                        widthAvatar={20}
                        IsSearch={true}
                        flexDirection="row"
                        IsHasICon={false}
                    />
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem"
                        widthAvatar={20}
                        IsSearch={true}
                        flexDirection="row"
                        IsHasICon={false}
                    />
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem"
                        widthAvatar={20}
                        IsSearch={true}
                        flexDirection="row"
                        IsHasICon={false}
                    />
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem"
                        widthAvatar={20}
                        IsSearch={true}
                        flexDirection="row"
                        IsHasICon={false}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
