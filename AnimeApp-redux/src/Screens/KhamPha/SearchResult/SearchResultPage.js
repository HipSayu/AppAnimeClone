import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import React from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

import SeacrResultHomePage from './SearchResultHomePage/SeacrResultHomePage';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function SearchResultPage({ route }) {
    const searchValue = route.params.data;
    const [search, setSearch] = useState(searchValue);
    const navigation = useNavigation();
    let widthSearch = 1.4;

    return (
        <>
            <View style={[styles.Search]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ImageBackground
                        style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                        source={require('~/Assets/Icon/IconReturn.png')}
                    />
                </TouchableOpacity>

                <View style={[styles.WrapperInput, { width: windowWidth / widthSearch }]}>
                    <ImageBackground style={styles.Icon} source={require('~/Assets/Icon/search.png')} />

                    <TextInput
                        value={search}
                        onFocus={() => navigation.goBack()}
                        onChangeText={(searchInput) => setSearch(searchInput)}
                        style={[styles.input, { width: windowWidth / widthSearch / 1.25 }]}
                        placeholder="Tìm Anime | Video | Nhà sáng tạo"
                    ></TextInput>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SearchResultPage', { data: search })}
                    style={{ marginTop: 10 }}
                >
                    <Text style={[GlobalStyles.gray, { marginLeft: 10 }]}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>

            <SeacrResultHomePage data={searchValue} />
        </>
    );
}

const styles = StyleSheet.create({
    Page: {},
    Search: {
        backgroundColor: GlobalStyles.white.color,
        paddingTop: 25,

        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    WrapperInput: {
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#E8E8E8',
        flexDirection: 'row',
        alignItems: 'center',
    },
    Icon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    input: {
        padding: 5,
    },
});
