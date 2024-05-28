import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Avatar from '~/Components/AvatarUser/Avatar';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '~/Styles/GlobalStyles';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '~/Components/Adicator/Loading';

export default function UserResultPage({ data }) {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const dataSearchUser = useSelector((state) => state.getUserSearchReducer);
    let user = dataSearchUser.users;
    let isLoadingUser = dataSearchUser.isLoading;

    useEffect(() => {
        dispatch({
            type: 'GET_USER_SEARCH_RESQUEST',
            payload: { pageSize: 20, pageIndex: 1, keyword: data },
        });
    }, [data]);

    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            <View>
                {user.length == 0 ? (
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <ImageBackground
                            style={{ width: 150, height: 150 }}
                            source={require('~/Assets/NoSearch.png')}
                        ></ImageBackground>
                        <Text>Xin lỗi kết quả tìm kiếm không phù hợp</Text>
                    </View>
                ) : isLoadingUser ? (
                    <Loading />
                ) : (
                    <>
                        {user.map((item, index) => (
                            <View key={index} style={{ paddingHorizontal: 10 }}>
                                <Avatar
                                    data={item.id}
                                    navigation={navigation}
                                    avatar={{ uri: item.avatarUrl }}
                                    userName={item.tieuSu}
                                    isSearch={false}
                                    time={`${item.follower}  người theo dõi | ${item.videos} Videos`}
                                />
                            </View>
                        ))}
                    </>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
