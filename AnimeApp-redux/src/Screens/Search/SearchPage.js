import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { useState } from 'react';
import React from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';
import SearchHomePage from './SearchHome/SearchHomePage';
import { SafeAreaView } from 'react-native-safe-area-context';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

export default function SearchPage() {
    const [search, setSearch] = useState('');

    const navigation = useNavigation();

    let widthSearch = 1.2;

    if (search == '') {
        widthSearch = 1.2;
    } else {
        widthSearch = 1.4;
    }
    const HandleDeleteSearch = () => {
        setSearch('');
    };

    return (
        <SafeAreaView style={styles.Page}>
            <View style={styles.Page}>
                {/* Search */}
                <View style={styles.Search}>
                    {search !== '' ? (
                        <TouchableOpacity onPress={() => HandleDeleteSearch()}>
                            <ImageBackground
                                style={{ width: 20, height: 20, marginRight: 5, marginTop: 10 }}
                                source={require('~/Assets/Icon/IconReturn.png')}
                            />
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                    <TouchableOpacity>
                        <View style={[styles.WrapperInput, { width: windowWidth / widthSearch }]}>
                            <ImageBackground style={styles.Icon} source={require('~/Assets/Icon/search.png')} />

                            <TouchableOpacity
                                value={search}
                                onPress={() => navigation.navigate('SearchingPage')}
                                onChangeText={(searchInput) => setSearch(searchInput)}
                                style={[styles.input, { width: windowWidth / widthSearch / 1.25, padding: 10 }]}
                            >
                                <Text>Tìm Anime | Video | Nhà sáng tạo</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>

                <SearchHomePage />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Page: {
        flex: 1,
        backgroundColor: GlobalStyles.white.color,
        // marginTop: 30,
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
