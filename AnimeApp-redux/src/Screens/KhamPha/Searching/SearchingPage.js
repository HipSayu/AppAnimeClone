import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';
import SearchHistory from '../HistorySearch/SearchHistory';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function SearchingPage() {
    const [search, setSearch] = useState('');

    const navigation = useNavigation();

    let widthSearch = 1.4;

    const HandleDeleteSearch = () => {
        navigation.goBack();
        setSearch('');
    };
    return (
        <View style={styles.Page}>
            {/* Search */}
            <View style={styles.Search}>
                <TouchableOpacity onPress={() => HandleDeleteSearch()}>
                    <ImageBackground
                        style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                        source={require('~/Assets/Icon/IconReturn.png')}
                    />
                </TouchableOpacity>

                <View style={[styles.WrapperInput, { width: windowWidth / widthSearch }]}>
                    <ImageBackground style={styles.Icon} source={require('~/Assets/Icon/search.png')} />
                    <TextInput
                        autoFocus={true}
                        value={search}
                        onChangeText={(searchInput) => setSearch(searchInput)}
                        style={[styles.input, { width: windowWidth / widthSearch / 1.25 }]}
                        placeholder="Tìm Anime | Video | Nhà sáng tạo"
                    ></TextInput>

                    <TouchableOpacity onPress={() => HandleDeleteSearch()}>
                        <ImageBackground
                            style={{ width: 20, height: 20 }}
                            source={require('~/Assets/Icon/Close.png')}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SearchResultPage', { data: search })}
                    style={{ marginTop: 10 }}
                >
                    <Text style={[GlobalStyles.gray, { marginLeft: 10 }]}>Tìm kiếm</Text>
                </TouchableOpacity>
            </View>
            <View>
                {/* Check to align */}
                <View style={{ alignItems: 'center' }}>
                    <ImageBackground
                        borderRadius={10}
                        style={{ width: windowWidth / 1.05, height: 0 }}
                        source={require('~/Assets/Image/AnimeBackground.png')}
                    />
                </View>
                {/* Lich Su Tim Kiem */}
                <View style={{ marginTop: 10, marginLeft: 10, justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={GlobalStyles.h4}>Lịch sử tìm kiếm</Text>
                    <ImageBackground style={{ width: 20, height: 20 }} source={require('~/Assets/Icon/trash.png')} />
                </View>
                {/* List */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <SearchHistory />
                    <SearchHistory />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: GlobalStyles.white.color,
        marginTop: 30,
        alignItems: 'center',
    },
    Search: {
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
