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
    sourceAnime = require('~/Assets/AmvImage/AMV1.png'),
    sourceAvartar,
    UserName = 'Rikka',
    Time = '01:36',
    Viewer = '144M',
    inViewer = false,
    flexDirection = 'colum',
    NameVideo = 'Tưởng nhớ em "anh chỉ muốn níu giữ thời gian" ',
}) {
    return (
        <View style={{ alignItems: 'center', marginTop: 20, flexDirection: flexDirection }}>
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
                        marginBottom: 4,
                        flexDirection: 'row',
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

                    <Text style={[GlobalStyles.white, GlobalStyles.h4_Regular, { marginRight: 5 }]}>{Time}</Text>
                </View>
            </ImageBackground>
            {/* User */}
            <Avatar
                Avatar={sourceAvartar}
                IsHasIcon={true}
                Width={44}
                Height={44}
                UserName={UserName}
                TextHead={false}
                NameVideo={NameVideo}
            />
        </View>
    );
}

const styles = StyleSheet.create({});
