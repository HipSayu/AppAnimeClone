import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React from 'react';
import Avatar from '~/Components/AvatarUser/Avatar';
import AnimeMV from '~/Components/AMV/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function FollowPage() {
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: 25, backgroundColor: GlobalStyles.white.color }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 15 }} horizontal={true}>
                <Avatar navigation={navigation} styleCustom={{ marginHorizontal: 10 }} UserName="Rikka" />
                <Avatar
                    styleCustom={{ marginHorizontal: 10 }}
                    Avatar={require('~/Assets/Avatar/MaiSan.png')}
                    UserName="Mai-san"
                />
                <Avatar
                    styleCustom={{ marginHorizontal: 10 }}
                    Avatar={require('~/Assets/Avatar/AiHoshino.png')}
                    UserName="Ai Hoshino"
                />
            </ScrollView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <AnimeMV
                    sourceAnime={require('~/Assets/Image/Chisato.png')}
                    UserName="Rikka"
                    NameVideo="Lycoris Recoil-Chisato"
                    IsHasICon={false}
                    flexDirection="column-reverse"
                    ViewAvatar="3 ngày trước"
                    IsUser={true}
                />
                <AnimeMV
                    sourceAnime={require('~/Assets/Image/Kurumi.png')}
                    UserName="Rikka"
                    NameVideo="Kurumi"
                    IsHasICon={false}
                    flexDirection="column-reverse"
                    ViewAvatar="3 ngày trước"
                    IsUser={true}
                />

                <Text style={[{ marginLeft: 10, marginTop: 10 }, GlobalStyles.h4]}>Khám phá nhà sáng tạo khác</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <Avatar isSearch={true} Time="600 người theo dõi | 20 Videos" />
                </View>
                {/* Footer */}
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});
