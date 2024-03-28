import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

// Chiều rộng điện thoại
const windowWidth = Dimensions.get('window').width;
// Chiều dài điện thoại
const windowHeight = Dimensions.get('window').height;

//User
//1.witdh : 44 height 44: Tên cạch text cạch có icon
//2.width : 20 hegiht 20 : tến cạnh text trên view dưới
// 3. width :50 height 59 : tên dưới
//4 . width : 40 height : 40 tên cạnh có time tên dưới

export default function Avatar({
    TextHead = false,
    IsHasIcon = false,
    Avatar = require('~/Assets/Avatar/Rika.png'),
    NameVideo = '',
    UserName = 'YuriShenhe',
    Width = 50,
    Height = 50,
    Time = '',
    NameVideoUser = '',
    Following = '',
    Follower = '',
    Likes = '',
}) {
    let avatarName;
    let alignItemsAvatar = 'center';
    let marginName;
    let marginLeftText = 0;
    let marginAvatar = 0;
    let setWidthText = 1.4;
    let marginTopAvatar = 0;

    if (NameVideo != '') {
        (avatarName = 'row'), (marginName = 15);
        marginAvatar = 10;
    } else {
        (avatarName = 'column'), (marginName = 0);
    }
    if (Time != '') {
        avatarName = 'row';
        marginLeftText = 10;
    }

    if (TextHead) {
        avatarName = 'column-reverse';
        alignItemsAvatar = '';
        setWidthText = 2;
        marginTopAvatar = 5;
    }

    return (
        <TouchableOpacity>
            <View
                style={{
                    flexDirection: avatarName,
                    marginTop: 10,
                    alignItems: alignItemsAvatar,
                }}
            >
                {TextHead ? (
                    <Text style={[GlobalStyles.h5_Regular, GlobalStyles.gray, { marginLeft: marginLeftText }]}>
                        {Time}
                    </Text>
                ) : (
                    <></>
                )}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ImageBackground
                        borderRadius={Width / 2}
                        style={{
                            width: Width,
                            height: Height,
                            marginLeft: marginAvatar,
                            marginTop: marginTopAvatar,
                            marginBottom: marginAvatar,
                        }}
                        source={Avatar}
                    />
                    {TextHead ? (
                        <Text style={[GlobalStyles.h5_Medium, GlobalStyles.gray, { marginLeft: 10 }]}>{UserName}</Text>
                    ) : (
                        <></>
                    )}
                </View>

                <View style={{ marginLeft: marginName }}>
                    {NameVideo != '' ? (
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={[
                                    {
                                        width: windowWidth / setWidthText,
                                    },
                                    GlobalStyles.h4_Regular,
                                ]}
                            >
                                {NameVideo}
                            </Text>
                            {IsHasIcon ? (
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
                    {NameVideo != '' ? (
                        <>
                            {!TextHead ? (
                                <Text style={[GlobalStyles.h5_Medium, GlobalStyles.gray, { marginTop: 0 }]}>
                                    {UserName}
                                </Text>
                            ) : (
                                <></>
                            )}

                            {Time != '' && !TextHead ? (
                                <Text
                                    style={[
                                        GlobalStyles.h4_Regular,
                                        GlobalStyles.gray,
                                        { marginTop: 5, marginLeft: marginLeftText },
                                    ]}
                                >
                                    {Time}
                                </Text>
                            ) : (
                                <></>
                            )}
                        </>
                    ) : (
                        <>
                            <Text style={[GlobalStyles.h4, , { marginTop: 5, marginLeft: marginLeftText }]}>
                                {UserName}
                            </Text>
                            {Time != '' ? (
                                <Text
                                    style={[
                                        GlobalStyles.h4_Regular,
                                        GlobalStyles.gray,
                                        { marginTop: 5, marginLeft: marginLeftText },
                                    ]}
                                >
                                    {Time}
                                </Text>
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                </View>
            </View>

            {NameVideoUser != '' ? (
                <Text style={[GlobalStyles.h4_Medium, { marginTop: 10 }]}>{NameVideoUser}</Text>
            ) : (
                <></>
            )}
            <View style={{ flexDirection: 'row' }}>
                {Following != '' ? (
                    <Text style={[GlobalStyles.h5_Medium, styles.Text_User]}>{Following} Đang theo dõi</Text>
                ) : (
                    <></>
                )}
                {Follower != '' ? (
                    <Text style={[GlobalStyles.h5_Medium, styles.Text_User]}>{Follower} Người theo dõi</Text>
                ) : (
                    <></>
                )}
                {Likes != '' ? (
                    <Text style={[GlobalStyles.h5_Medium, styles.Text_User]}>{Likes} Lượt thích</Text>
                ) : (
                    <></>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    Text_User: {
        marginTop: 10,
        marginRight: 10,
        color: GlobalStyles.gray.color,
    },
});
