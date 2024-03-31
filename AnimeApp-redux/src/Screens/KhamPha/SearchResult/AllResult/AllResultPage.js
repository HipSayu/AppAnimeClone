import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AMV/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function AllResultPage() {
    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {/* Anime */}
            <AnimeVideo IsSearch={true} Name="Shikimori không chỉ dễ thương thôi đâu" ContinueText="2023 | Anime" />
            {/* AMV */}
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
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
