import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GlobalStyles from '~/Styles/GlobalStyles';

export default function CommentPage() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            {/* Comments */}
            <ScrollView>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                    <TouchableOpacity>
                        <Text style={[GlobalStyles.h4, { marginRight: 10 }]}>Nổi bật nhất</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={[GlobalStyles.h4, GlobalStyles.gray, {}]}>Gần đây</Text>
                    </TouchableOpacity>
                </View>
                {/* Comment */}
                <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row' }}>
                    {/* Comment Parents */}
                    <View>
                        {/* Avatar */}
                        <ImageBackground
                            borderRadius={30}
                            style={{ width: 50, height: 50 }}
                            source={require('~/Assets/Avatar/AiHoshino.png')}
                        />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        {/* Name Date */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[GlobalStyles.h5a, {}]}>ShikimoriCute</Text>
                            <ImageBackground
                                style={{ width: 15, height: 15, marginLeft: 2 }}
                                source={require('~/Assets/Icon/InstagramCheckMark.png')}
                            />
                            <Text style={[GlobalStyles.h5a, GlobalStyles.gray, { marginLeft: 10 }]}>19/04/2024</Text>
                        </View>
                        <View style={{ width: windowWidth / 1.29 }}>
                            <Text numberOfLines={4} ellipsizeMode="clip">
                                Một nữ sinh trung học, bạn gái của Izumi. Bình thường cô ấy thường rất dễ thương và dịu
                                dàng, nhưng khi Izumi gặp vấn đề gì đó hoặc những gì liên quan đến Izumi, tính cách của
                                cô thay đổi thành một trái tim lạnh lùng với đôi mắt long lanh sắc bén khiến mọi người
                                xung quanh bị doạ hết hồn.
                            </Text>
                            {/* Like,dislike, comments */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    justifyContent: 'space-between',
                                    width: windowWidth / 3,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20 }}
                                        source={require('~/Assets/Icon/IconVideo/Like.png')}
                                    />
                                    <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                        source={require('~/Assets/Icon/IconVideo/Dislike.png')}
                                    />
                                    <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                        source={require('~/Assets/Icon/IconVideo/comments.png')}
                                    />
                                    {/* <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text> */}
                                </View>
                            </View>
                            {/* Comment child */}
                            <View
                                style={{
                                    flexDirection: 'column',
                                    marginTop: 10,
                                    backgroundColor: '#d9d9d973',
                                    padding: 10,
                                }}
                            >
                                <View style={{ flexDirection: 'row' }}>
                                    {/* Avatar */}
                                    <View>
                                        <ImageBackground
                                            borderRadius={30}
                                            style={{ width: 40, height: 40 }}
                                            source={require('~/Assets/Avatar/MaiSan.png')}
                                        />
                                    </View>
                                    {/* Name Date */}
                                    <View style={{ marginLeft: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[GlobalStyles.h5a, {}]}>ShikimoriCute</Text>
                                        </View>
                                        {/* Comments */}
                                        <View style={{ width: windowWidth / 1.8 }}>
                                            <Text numberOfLines={1} ellipsizeMode="clip">
                                                Một nữ sinh trung học, bạn gái của Izumi. Bình thường cô ấy thường rất
                                                dễ thương
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginLeft: 50, marginTop: 10 }}>
                                    <Text style={[GlobalStyles.gray, GlobalStyles.h5a, {}]}>
                                        Xem tất cả 99 câu trả lời
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                {/* Comment */}
                <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row' }}>
                    {/* Comment Parents */}
                    <View>
                        {/* Avatar */}
                        <ImageBackground
                            borderRadius={30}
                            style={{ width: 50, height: 50 }}
                            source={require('~/Assets/Avatar/AiHoshino.png')}
                        />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        {/* Name Date */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[GlobalStyles.h5a, {}]}>ShikimoriCute</Text>
                            <ImageBackground
                                style={{ width: 15, height: 15, marginLeft: 2 }}
                                source={require('~/Assets/Icon/InstagramCheckMark.png')}
                            />
                            <Text style={[GlobalStyles.h5a, GlobalStyles.gray, { marginLeft: 10 }]}>19/04/2024</Text>
                        </View>
                        <View style={{ width: windowWidth / 1.29 }}>
                            <Text numberOfLines={4} ellipsizeMode="clip">
                                Một nữ sinh trung học, bạn gái của Izumi. Bình thường cô ấy thường rất dễ thương và dịu
                                dàng, nhưng khi Izumi gặp vấn đề gì đó hoặc những gì liên quan đến Izumi, tính cách của
                                cô thay đổi thành một trái tim lạnh lùng với đôi mắt long lanh sắc bén khiến mọi người
                                xung quanh bị doạ hết hồn.
                            </Text>
                            {/* Like,dislike, comments */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    justifyContent: 'space-between',
                                    width: windowWidth / 3,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20 }}
                                        source={require('~/Assets/Icon/IconVideo/Like.png')}
                                    />
                                    <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                        source={require('~/Assets/Icon/IconVideo/Dislike.png')}
                                    />
                                    <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                        source={require('~/Assets/Icon/IconVideo/comments.png')}
                                    />
                                    {/* <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text> */}
                                </View>
                            </View>
                            {/* Comment child */}
                        </View>
                    </View>
                </View>
                {/* Comment */}
                <View style={{ marginLeft: 10, marginTop: 10, flexDirection: 'row' }}>
                    {/* Comment Parents */}
                    <View>
                        {/* Avatar */}
                        <ImageBackground
                            borderRadius={30}
                            style={{ width: 50, height: 50 }}
                            source={require('~/Assets/Avatar/AiHoshino.png')}
                        />
                    </View>
                    <View style={{ marginLeft: 10 }}>
                        {/* Name Date */}
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[GlobalStyles.h5a, {}]}>ShikimoriCute</Text>
                            <ImageBackground
                                style={{ width: 15, height: 15, marginLeft: 2 }}
                                source={require('~/Assets/Icon/InstagramCheckMark.png')}
                            />
                            <Text style={[GlobalStyles.h5a, GlobalStyles.gray, { marginLeft: 10 }]}>19/04/2024</Text>
                        </View>
                        <View style={{ width: windowWidth / 1.29 }}>
                            <Text numberOfLines={4} ellipsizeMode="clip">
                                Một nữ sinh trung học, bạn gái của Izumi. Bình thường cô ấy thường rất dễ thương và dịu
                                dàng, nhưng khi Izumi gặp vấn đề gì đó hoặc những gì liên quan đến Izumi, tính cách của
                                cô thay đổi thành một trái tim lạnh lùng với đôi mắt long lanh sắc bén khiến mọi người
                                xung quanh bị doạ hết hồn.
                            </Text>
                            {/* Like,dislike, comments */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                    justifyContent: 'space-between',
                                    width: windowWidth / 3,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20 }}
                                        source={require('~/Assets/Icon/IconVideo/Like.png')}
                                    />
                                    <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                        source={require('~/Assets/Icon/IconVideo/Dislike.png')}
                                    />
                                    <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <ImageBackground
                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                        source={require('~/Assets/Icon/IconVideo/comments.png')}
                                    />
                                    {/* <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text> */}
                                </View>
                            </View>
                            {/* Comment child */}
                        </View>
                    </View>
                </View>
            </ScrollView>
            {/* CommentsAdd */}
            <View style={{ alignItems: 'center', marginTop: 10 }}>
                <View
                    style={{
                        width: windowWidth / 1.1,
                        backgroundColor: '#8181813d',
                        padding: 10,
                        justifyContent: 'center',
                    }}
                >
                    <Text style={[GlobalStyles.h4_Regular]}>Để lại bình luận thân thiện </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
