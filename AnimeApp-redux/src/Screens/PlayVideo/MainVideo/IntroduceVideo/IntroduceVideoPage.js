import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function IntroduceVideoPage() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1, paddingBottom: 20, marginLeft: 20 }}>
            <Text style={[GlobalStyles.h3_Medium, { width: windowWidth / 1.2, marginTop: 10 }]} ellipsizeMode="clip">
                Thiên thượng thiên hạ Hịp mãi đẹp trai
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({});
