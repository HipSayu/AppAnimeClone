import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

import { useSelector } from 'react-redux';
import { createSearchHistiory, deleteSearchHistiory, getHistorySearchById } from '~/Services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const windowHeight = Dimensions.get('window').height;

export default function SearchingPage() {
    const [search, setSearch] = useState('');
    const [isCreate, setIsCreate] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const navigation = useNavigation();

    const login = useSelector((state) => state.loginReducer);

    // let userId = login.userInfo.id;

    // let token = login.userInfo.tokenResponse.data.result.accessToken;

    let widthSearch = 1.4;

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    const getData = async () => {
        try {
            var jsonValue = await AsyncStorage.getItem('my_login');
            jsonValue = JSON.parse(jsonValue);
            setUserInfor(jsonValue);
        } catch (e) {
            console.log('get AsyncStogare', e);
        }
    };
    useEffect(() => {
        getData();
    }, []);

    console.log('userInfor Search', userInfor);

    if (userInfor != undefined) {
        var token = userInfor.token.accessToken;
    }

    useEffect(() => {
        getHistorySearchById((pageSize = 20), (pageIndex = 1), (userId = userId), token)
            .then((res) => {
                setSearchHistory(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Get Search', err);
            });
    }, [isCreate, token]);

    const HandleDeleteSearch = () => {
        setSearch('');
    };
    const handleOnpress = (searchKey) => {
        navigation.navigate('SearchResultPage', { data: searchKey });
    };

    const handleSearch = () => {
        createSearchHistiory(search, userId, token)
            .then((res) => {
                navigation.navigate('SearchResultPage', { data: search });
                setIsCreate(!isCreate);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    };

    const handleDeleteSearch = (idSearch) => {
        deleteSearchHistiory(idSearch, token)
            .then((res) => {
                setIsCreate(!isCreate);
            })
            .catch((err) => {
                console.log('Lỗi Xóa Search', err);
            });
    };

    return (
        <View style={styles.Page}>
            {/* Search */}
            <View style={styles.Search}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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
                    onPress={() => {
                        if (userId == undefined) {
                            search !== '' ? handleOnpress(search) : null;
                        } else {
                            search !== '' ? handleSearch() : null;
                        }
                    }}
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
                {userId != undefined ? (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {searchHistory.map((item, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 20,
                                    paddingLeft: 10,
                                }}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginRight: 10, marginTop: 5 }}
                                        source={require('~/Assets/Icon/Clock.png')}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleOnpress(item.searchKeyWord);
                                        }}
                                        style={{ padding: 5 }}
                                    >
                                        <Text>{item.searchKeyWord}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        handleDeleteSearch(item.id);
                                    }}
                                    style={{ padding: 5 }}
                                >
                                    <ImageBackground
                                        style={{ width: 20, height: 20 }}
                                        source={require('~/Assets/Icon/Close.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
                )}
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
