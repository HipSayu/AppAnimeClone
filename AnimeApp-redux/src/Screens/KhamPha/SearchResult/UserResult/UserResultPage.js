import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Avatar from '~/Components/AvatarUser/Avatar';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function UserResultPage() {
    return (
        <ScrollView style={{ backgroundColor: GlobalStyles.white.color }} contentContainerStyle={{}}>
            <View style={{ paddingHorizontal: 10 }}>
                <Avatar isSearch={true} Time="600 người theo dõi | 20 Videos" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
