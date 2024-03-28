import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function HomeNav({ Header, style = {} }) {
    return (
        <View style={[styles.Nav, style]}>
            {Header.map((item, index) =>
                item.active ? (
                    <TouchableOpacity key={index}>
                        <Text style={[styles.NavText, GlobalStyles.h3]}>{item.name}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity key={index}>
                        <Text style={[styles.NavText, GlobalStyles.h4_Regular, { marginTop: 2 }]}>{item.name}</Text>
                    </TouchableOpacity>
                ),
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    Nav: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    NavText: {
        marginRight: 10,
    },
});
