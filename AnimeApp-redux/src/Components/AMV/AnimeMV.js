import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Avatar from '../AvatarUser/Avatar';
import GlobalStyles from '~/Styles/GlobalStyles';
import { Dimensions } from 'react-native';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

export default function AnimeMV({
    Width = 1.05,
    Height = 172,
    widthAvatar = 44,
    sourceAnime = require('~/Assets/AmvImage/AMV1.png'),
    sourceAvartar,
    UserName = 'Rikka',
    Time = '01:36',
    Viewer = '144M',
    ViewAvatar = '',
    inViewer = false,
    IsSearch = false,
    flexDirection = 'colum',
    NameVideo = 'Tưởng nhớ em "anh chỉ muốn níu giữ thời gian" ',
    IsHasICon = true,
    IsUser = false,
    IsHasAvatar = true,
}) {
    return (
        <View style={{ flexDirection: flexDirection, marginTop: IsUser ? 10 : 0 }}>
            <View style={{ alignItems: 'center', marginTop: IsUser ? 10 : 20 }}>
                <ImageBackground
                    borderRadius={10}
                    resizeMode="cover"
                    style={{
                        width: windowWidth / Width,
                        height: Height,
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
                                    {Viewer}
                                </Text>
                            </View>
                        ) : (
                            <View></View>
                        )}

                        <Text style={[GlobalStyles.white, GlobalStyles.h5_Regular, { marginRight: 5 }]}>{Time}</Text>
                    </View>
                </ImageBackground>
                {/* User */}
            </View>
            <View style={{ alignItems: 'flex-start' }}>
                <Avatar
                    Avatar={sourceAvartar}
                    IsHasIcon={IsHasICon}
                    Width={widthAvatar}
                    Height={widthAvatar}
                    UserName={UserName}
                    TextHead={IsSearch}
                    NameVideo={NameVideo}
                    Time={ViewAvatar}
                    isUser={IsUser}
                    isAvatar={IsHasAvatar}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
