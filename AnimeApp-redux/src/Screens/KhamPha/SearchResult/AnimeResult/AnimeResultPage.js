import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function AnimeResultPage() {
    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {/* Anime */}
            <AnimeVideo IsSearch={true} Name="Shikimori không chỉ dễ thương thôi đâu" ContinueText="2023 | Anime" />
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
