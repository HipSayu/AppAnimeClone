import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AMV/AnimeMV';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function User() {
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: 25 }}>
            <ImageBackground
                style={{ width: windowWidth, height: windowHeight / 4, justifyContent: 'space-between' }}
                source={require('~/Assets/BackGround/AvatarBackground.jpg')}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ImageBackground
                            style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                            source={require('~/Assets/Icon/IconReturn.png')}
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ImageBackground
                                style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                                source={require('~/Assets/Icon/Share.png')}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <ImageBackground
                                style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                                source={require('~/Assets/Icon/List.png')}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <View
                        style={{
                            borderWidth: 1,
                            paddingVertical: 5,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            marginBottom: 10,
                            marginRight: 10,
                            borderColor: GlobalStyles.blue.color,
                        }}
                    >
                        <Text style={[GlobalStyles.h5, GlobalStyles.blue]}>Đang theo dõi</Text>
                    </View>
                </View>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center' }}>
                    <Avatar UserName="Rikka Takanashi" Following="0 " Follower="9.1K" Likes="9M" />
                </View>
                <Text style={[GlobalStyles.h4_Medium, { marginLeft: 10, marginTop: 10 }]}>Video</Text>
                <View style={{ marginLeft: 10 }}>
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem 1 ngày trước"
                        IsSearch={true}
                        NameVideo="Hana ni natte "
                        UserName=""
                        sourceAnime={require('~/Assets/AmvImage/MaoMao.jpg')}
                        flexDirection="row"
                        IsHasAvatar={false}
                    />
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem 1 ngày trước"
                        IsSearch={true}
                        NameVideo="Bị người yêu bỏ tôi trở thành thầy cúng"
                        UserName=""
                        sourceAnime={require('~/Assets/AmvImage/Gojo.jpg')}
                        flexDirection="row"
                        IsHasAvatar={false}
                    />
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem 1 ngày trước"
                        IsSearch={true}
                        NameVideo="Bị người yêu bỏ tôi trở thành thầy cúng"
                        UserName=""
                        sourceAnime={require('~/Assets/AmvImage/Gojo.jpg')}
                        flexDirection="row"
                        IsHasAvatar={false}
                    />
                    <AnimeMV
                        Width={2.1}
                        Height={100}
                        ViewAvatar="1.M lượt xem 1 ngày trước"
                        IsSearch={true}
                        NameVideo="Bị người yêu bỏ tôi trở thành thầy cúng"
                        UserName=""
                        sourceAnime={require('~/Assets/AmvImage/Gojo.jpg')}
                        flexDirection="row"
                        IsHasAvatar={false}
                    />
                </View>
                {/* Footer */}
                <View style={{ height: windowHeight / 3.9 }}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});
