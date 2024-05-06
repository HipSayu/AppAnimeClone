import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';

import React, { useState } from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

import { followUser, unFollowUser } from '~/Services/Api/instanceAxios';
import { useDispatch } from 'react-redux';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

export default function Avatar({
    numberphoneUserLogin,
    userIdLogin,
    data,
    isFollow = false,
    styleCustom = {},
    navigation = function () {},
    isSearch = false,
    textHead = false,
    isHasIcon = false,
    avatar = require('~/Assets/Avatar/Rika.png'),
    nameVideo = '',
    userName = 'YuriShenhe',
    width = 50,
    height = 50,
    time = '',
    nameVideoUser = '',
    following = '',
    follower = '',
    likes = '',
    isUser = false,
    isAvatar = true,
}) {
    const dispatch = useDispatch();
    let avatarName;
    let alignItemsAvatar = 'center';
    let marginName;
    let marginLeftText = 0;
    let marginAvatar = 0;
    let setWidthText = 1.4;
    let marginTopAvatar = 0;

    if (nameVideo != '') {
        (avatarName = 'row'), (marginName = 15);
        marginAvatar = 10;
    } else {
        (avatarName = 'column'), (marginName = 0);
    }
    if (time != '') {
        avatarName = 'row';
        marginLeftText = 10;
    }

    if (textHead) {
        avatarName = 'column-reverse';
        alignItemsAvatar = '';
        setWidthText = 2;
        marginTopAvatar = 5;
    }

    const [isfollows, setIfollows] = useState(isFollow);

    const handleTheoDoi = (userIdLogin, userFollow) => {
        if (!isfollows) {
            followUser(userIdLogin, userFollow)
                .then((res) => {
                    dispatch({
                        type: 'GET_USERFOLLOW_HOME_RESQUEST',
                        payload: { pageSize: 10, pageIndex: 1, userId: userIdLogin },
                    });
                    dispatch({
                        type: 'GET_USER_NOT_FOLLOW_RESQUEST',
                        payload: { userId: userIdLogin },
                    });
                    setIfollows(!isfollows);
                })
                .catch((err) => {
                    Popup(`Chưa đăng nhập`);
                });
        } else {
            unFollowUser(userIdLogin, userFollow)
                .then((res) => {
                    dispatch({
                        type: 'GET_USERFOLLOW_HOME_RESQUEST',
                        payload: { pageSize: 10, pageIndex: 1, userId: userIdLogin },
                    });
                    dispatch({
                        type: 'GET_USER_NOT_FOLLOW_RESQUEST',
                        payload: { userId: userIdLogin },
                    });
                    setIfollows(!isfollows);
                })
                .catch((err) => {
                    Popup(`Chưa đăng nhập `);
                });
        }
    };

    return (
        <>
            {!isUser ? (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('User', {
                                data: data,
                                isFollow: isfollows,
                                numberphoneUser: numberphoneUserLogin,
                            });
                        }}
                        style={[
                            { flexDirection: nameVideoUser == '' ? 'column' : 'row', alignItems: 'center' },
                            styleCustom,
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: avatarName,
                                marginTop: 10,
                                alignItems: alignItemsAvatar,
                            }}
                        >
                            {textHead ? (
                                <>
                                    <Text
                                        style={[
                                            GlobalStyles.h5_Regular,
                                            GlobalStyles.gray,
                                            { marginLeft: isAvatar ? marginLeftText : 15 },
                                        ]}
                                    >
                                        {time}
                                    </Text>
                                </>
                            ) : (
                                <></>
                            )}
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {isAvatar ? (
                                    <ImageBackground
                                        borderRadius={width / 2}
                                        style={{
                                            width: width,
                                            height: height,
                                            marginLeft: nameVideoUser != '' ? 0 : marginAvatar,
                                            marginTop: nameVideoUser != '' ? 0 : marginTopAvatar,
                                            marginBottom: nameVideoUser != '' ? 0 : marginAvatar,
                                        }}
                                        source={avatar}
                                    />
                                ) : (
                                    <></>
                                )}

                                {textHead ? (
                                    <Text style={[GlobalStyles.h5_Medium, GlobalStyles.gray, { marginLeft: 10 }]}>
                                        {userName}
                                    </Text>
                                ) : (
                                    <></>
                                )}
                            </View>

                            <View style={{ marginLeft: marginName, marginTop: isAvatar ? 5 : 10 }}>
                                {nameVideo != '' ? (
                                    <View
                                        style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Text
                                            style={[
                                                {
                                                    width: windowWidth / setWidthText,
                                                },
                                                GlobalStyles.h4_Regular,
                                            ]}
                                        >
                                            {nameVideo}
                                        </Text>
                                        {isHasIcon ? (
                                            <ImageBackground
                                                style={{ width: 30, height: 30 }}
                                                source={require('~/Assets/Icon/List.png')}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                ) : (
                                    <></>
                                )}
                                {nameVideo != '' ? (
                                    <>
                                        {!textHead ? (
                                            <Text style={[GlobalStyles.h5_Medium, GlobalStyles.gray, { marginTop: 0 }]}>
                                                {userName}
                                            </Text>
                                        ) : (
                                            <></>
                                        )}

                                        {time != '' && !textHead ? (
                                            <Text
                                                style={[
                                                    GlobalStyles.h4_Regular,
                                                    GlobalStyles.gray,
                                                    { marginTop: 5, marginLeft: marginLeftText },
                                                ]}
                                            >
                                                {time}
                                            </Text>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <Text style={[GlobalStyles.h5, , { marginTop: 5, marginLeft: marginLeftText }]}>
                                            {userName}
                                        </Text>
                                        {time != '' ? (
                                            <Text
                                                style={[
                                                    GlobalStyles.h5_Regular,
                                                    GlobalStyles.gray,
                                                    { marginTop: 5, marginLeft: marginLeftText },
                                                ]}
                                            >
                                                {time}
                                            </Text>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                )}
                            </View>
                        </View>

                        {nameVideoUser != '' ? <Text style={[GlobalStyles.h4_Medium]}>{nameVideoUser}</Text> : <></>}
                        {/* Follow, Following, Likes */}
                        <View style={{ flexDirection: 'row' }}>
                            {following != '' ? (
                                <Text style={[GlobalStyles.h5_Medium, styles.Text_User]}>
                                    {following} Đang theo dõi
                                </Text>
                            ) : (
                                <></>
                            )}
                            {follower != '' ? (
                                <Text style={[GlobalStyles.h5_Medium, styles.Text_User]}>
                                    {follower} Người theo dõi
                                </Text>
                            ) : (
                                <></>
                            )}
                            {likes != '' ? (
                                <Text style={[GlobalStyles.h5_Medium, styles.Text_User]}>{likes} Lượt thích</Text>
                            ) : (
                                <></>
                            )}
                        </View>
                    </TouchableOpacity>
                    {isSearch ? (
                        <TouchableOpacity
                            onPress={() => {
                                handleTheoDoi(userIdLogin, data);
                            }}
                            style={{
                                backgroundColor: GlobalStyles.blue.color,
                                paddingHorizontal: 9,
                                borderRadius: 5,
                                marginTop: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text style={[GlobalStyles.white, GlobalStyles.h5]}>
                                {isfollows ? 'Đã theo dõi' : 'Theo dõi'}
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            ) : (
                <TouchableOpacity style={[{ flexDirection: 'column' }, styleCustom]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ImageBackground
                            borderRadius={width / 2}
                            style={{
                                width: width,
                                height: height,
                                marginLeft: marginAvatar,
                                marginTop: marginTopAvatar,
                                marginBottom: marginAvatar,
                            }}
                            source={avatar}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={GlobalStyles.h4}>{userName}</Text>
                            <Text style={[GlobalStyles.h5_Regular, GlobalStyles.gray]}>{time}</Text>
                        </View>
                    </View>
                    <Text style={[{ marginLeft: 25 }, GlobalStyles.h4_Medium]}>{nameVideo}</Text>
                </TouchableOpacity>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    Text_User: {
        marginTop: 10,
        marginRight: 10,
        color: GlobalStyles.gray.color,
    },
});
