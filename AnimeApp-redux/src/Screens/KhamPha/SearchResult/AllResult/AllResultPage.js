import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AnimeVideo from '~/Components/AnimeItems/AnimeVideo';
import AnimeMV from '~/Components/AMV/AnimeMV';
import GlobalStyles from '~/Styles/GlobalStyles';
import axios from 'axios';
import { PacmanIndicator } from 'react-native-indicators';

export default function AllResultPage({ data }) {
    const [result, setResult] = useState([]);
    const navigation = useNavigation();
    useEffect(() => {
        axios
            .get(`http://localhost:5179/api/Video/get-all?pageSize=10&pageIndex=1&keyword=${data}`)
            .then((res) => {
                setResult(res.data.items);
            })
            .catch((err) => {
                console.log('Lỗi Seacrh', err);
            });
    }, [data]);

    console.log('resultSearch', result);
    return (
        <ScrollView style={{ flex: 1, paddingLeft: 10, backgroundColor: GlobalStyles.white.color }}>
            {!Array.isArray(result) ? (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <PacmanIndicator size={100} />
                </View>
            ) : (
                <View>
                    {result.length == 0 ? (
                        <View style={{ alignItems: 'center' }}>
                            <ImageBackground
                                style={{ width: 150, height: 150 }}
                                source={require('~/Assets/NoSearch.png')}
                            ></ImageBackground>
                            <Text>Xin lỗi kết quả tìm kiếm không phù hợp</Text>
                        </View>
                    ) : (
                        <>
                            <AnimeVideo
                                IsSearch={true}
                                Name="Shikimori không chỉ dễ thương thôi đâu"
                                ContinueText="2023 | Anime"
                            />
                            {result.map((item, index) => (
                                <AnimeMV
                                    key={index}
                                    navigation={navigation}
                                    dataAvatar={item.usderId}
                                    dataVideo={item.id}
                                    NameVideo={item.nameVideos}
                                    sourceAvartar={{ uri: item.avatarUserUrl }}
                                    UserName={item.nameUser}
                                    sourceAnime={{ uri: item.avatarVideoUrl }}
                                    Width={2.1}
                                    Height={100}
                                    ViewAvatar="1.M lượt xem"
                                    widthAvatar={20}
                                    IsSearch={true}
                                    flexDirection="row"
                                    IsHasICon={false}
                                />
                            ))}
                        </>
                    )}
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({});
