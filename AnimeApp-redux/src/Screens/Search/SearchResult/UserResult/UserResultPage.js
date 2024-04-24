import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Avatar from '~/Components/AvatarUser/Avatar';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import { PacmanIndicator } from 'react-native-indicators';
import { getUserSearch } from '~/Services/Api';

export default function UserResultPage({ data }) {
    const [result, setResult] = useState();
    const navigation = useNavigation();

    useEffect(() => {
        getUserSearch(10, 1, data)
            .then((res) => {
                setResult(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh User', err);
            });
    }, [data]);

    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {!Array.isArray(result) ? (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <PacmanIndicator size={100} />
                </View>
            ) : (
                <View>
                    {result.length == 0 ? (
                        <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                            <ImageBackground
                                style={{ width: 150, height: 150 }}
                                source={require('~/Assets/NoSearch.png')}
                            ></ImageBackground>
                            <Text>Xin lỗi kết quả tìm kiếm không phù hợp</Text>
                        </View>
                    ) : (
                        <>
                            {result.map((item, index) => (
                                <View key={index} style={{ paddingHorizontal: 10 }}>
                                    <Avatar
                                        data={item.id}
                                        navigation={navigation}
                                        avatar={{ uri: item.avatarUrl }}
                                        userName={item.userName}
                                        isSearch={true}
                                        time={`${item.follower}  người theo dõi | ${item.videos} Videos`}
                                    />
                                </View>
                            ))}
                        </>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
