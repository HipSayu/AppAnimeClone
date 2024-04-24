import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Avatar from '../AvatarUser/Avatar';
import GlobalStyles from '~/Styles/GlobalStyles';
import { Dimensions } from 'react-native';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

export default function AnimeMV({
    width = 1.05,
    height = 172,
    widthAvatar = 44,
    sourceAnime = require('~/Assets/AmvImage/AMV1.png'),
    sourceAvartar,
    userName = 'Rikka',
    time = '01:36',
    viewer = '144M',
    viewAvatar = '',
    inViewer = false,
    isSearch = false,
    flexDirection = 'colum',
    nameVideo = 'Tưởng nhớ em "anh chỉ muốn níu giữ thời gian" ',
    isHasICon = true,
    isUser = false,
    isHasAvatar = true,
    dataVideo,
    dataAvatar,
    navigation = function () {},
    userIsFollow = false,
}) {
    return (
        <View style={{ flexDirection: flexDirection, marginTop: isUser ? 10 : 0 }}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('PlayVideoPage', { data: dataVideo });
                }}
                style={{ alignItems: 'center', marginTop: isUser ? 10 : 20 }}
            >
                <ImageBackground
                    borderRadius={10}
                    resizeMode="cover"
                    style={{
                        width: windowWidth / width,
                        height: height,
                        justifyContent: 'flex-end',
                        flexDirection: 'column',
                    }}
                    source={sourceAnime}
                >
                    <View
                        style={{
                            marginBottom: 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        {inViewer ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ImageBackground
                                    style={{ width: 21, height: 14, marginLeft: 5 }}
                                    source={require('~/Assets/Icon/View.png')}
                                ></ImageBackground>
                                <Text style={[GlobalStyles.h4_Regular, GlobalStyles.white, { marginLeft: 10 }]}>
                                    {viewer}
                                </Text>
                            </View>
                        ) : (
                            <View></View>
                        )}

                        <Text style={[GlobalStyles.white, GlobalStyles.h5_Regular, { marginRight: 5 }]}>{time}</Text>
                    </View>
                </ImageBackground>
                {/* User */}
            </TouchableOpacity>
            <View style={{ alignItems: 'flex-start' }}>
                <Avatar
                    isFollow={userIsFollow}
                    navigation={navigation}
                    data={dataAvatar}
                    avatar={sourceAvartar}
                    isHasIcon={isHasICon}
                    width={widthAvatar}
                    height={widthAvatar}
                    userName={userName}
                    textHead={isSearch}
                    nameVideo={nameVideo}
                    time={viewAvatar}
                    isUser={isUser}
                    isAvatar={isHasAvatar}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
