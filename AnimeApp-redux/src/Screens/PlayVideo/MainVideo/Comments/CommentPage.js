import {
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GlobalStyles from '~/Styles/GlobalStyles';

import { CreateComment, CreateCommentChild } from '~/Services/Api/instanceAxios';
import { getDataStorage } from '~/Common/getDataStorage';
import Popup from '~/Common/Constanst';
import Loading from '~/Components/Adicator/Loading';

export default function CommentPage({ data }) {
    const [idComment, setidComment] = useState(0);
    const [comment, setComment] = useState('');
    const [userInfor, setUserInfor] = useState({ token: { accessToken: '' } });

    const inputRef = useRef(null);

    const windowWidth = Dimensions.get('window').width;

    const windowHeight = Dimensions.get('window').height;

    const dispatch = useDispatch();
    const idVideo = data.id;

    const commentData = useSelector((state) => state.getCommentReducder);
    let commentVideos = commentData.comments;
    let isLoadingVideo = commentData.isLoading;

    const login = useSelector((state) => state.loginReducer);

    if (userInfor != undefined) {
        var userId = userInfor.id;
    }

    useEffect(() => {
        dispatch({
            type: 'GET_COMMENT_RESQUEST',
            payload: { idVideo: idVideo },
        });
        getDataStorage('my_login')
            .then((data) => {
                setUserInfor(data);
            })
            .catch((error) => {
                Popup('Error Read Login', error.message);
            });
    }, [login]);
    const handleComment = () => {
        if (userId > 0) {
            console.log('check data', {
                text: comment,
                videoId: data.id,
                userId: userId,
            });
            CreateComment(comment, data, userId)
                .then((res) => {
                    dispatch({
                        type: 'GET_COMMENT_RESQUEST',
                        payload: { idVideo: idVideo },
                    });
                    setComment('');
                })
                .catch((err) => {
                    Popup('Lỗi comments');
                });
        } else {
            Popup('Chưa đăng nhập');
        }
    };
    const handleCommentChild = () => {
        if (userId > 0) {
            console.log('check data Childs', {
                text: comment,
                videoId: data.id,
                userId: userId,
                parentCommentId: idComment,
            });
            CreateCommentChild(comment, data, userId, idComment)
                .then((res) => {
                    dispatch({
                        type: 'GET_COMMENT_RESQUEST',
                        payload: { idVideo: idVideo },
                    });
                    setComment('');
                })
                .catch((err) => {
                    Popup('Lỗi comments');
                });
        } else {
            Popup('Chưa đăng nhập');
        }
    };

    return (
        <View style={{ backgroundColor: GlobalStyles.white.color, flex: 1, justifyContent: 'space-between' }}>
            {commentVideos.length == 0 ? (
                <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                    <Text>Hãy là người đầu tiên comment Video này</Text>
                </View>
            ) : (
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
                    {isLoadingVideo ? (
                        <Loading />
                    ) : (
                        commentVideos.map((comment, index) => (
                            <View key={index} style={{ marginLeft: 10, marginTop: 20, flexDirection: 'row' }}>
                                {/* Comment Parents */}
                                <View>
                                    {/* Avatar */}
                                    <ImageBackground
                                        borderRadius={30}
                                        style={{ width: 50, height: 50 }}
                                        source={{ uri: comment.avatarUrl }}
                                    />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                    {/* Name Date */}
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[GlobalStyles.h5a, {}]}>{comment.userName}</Text>
                                        <ImageBackground
                                            style={{ width: 15, height: 15, marginLeft: 2 }}
                                            source={require('~/Assets/Icon/InstagramCheckMark.png')}
                                        />
                                        <Text style={[GlobalStyles.h5a, GlobalStyles.gray, { marginLeft: 10 }]}>
                                            {` ${new Date(comment.date).getDate()}/${
                                                new Date(comment.date).getMonth() + 1
                                            }/${new Date(comment.date).getFullYear()}`}
                                        </Text>
                                    </View>
                                    <View style={{ width: windowWidth / 1.29 }}>
                                        <Text numberOfLines={4} ellipsizeMode="clip">
                                            {comment.text}
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
                                            <View
                                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}
                                            >
                                                <ImageBackground
                                                    style={{ width: 20, height: 20 }}
                                                    source={require('~/Assets/Icon/IconVideo/Like.png')}
                                                />
                                                <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>
                                                    {/* 1036 */}
                                                </Text>
                                            </View>
                                            <View
                                                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}
                                            >
                                                <ImageBackground
                                                    style={{ width: 20, height: 20, marginTop: 5 }}
                                                    source={require('~/Assets/Icon/IconVideo/Dislike.png')}
                                                />
                                                <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>
                                                    {/* 1036 */}
                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setidComment(comment.commentId);
                                                    inputRef.current.focus();
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <ImageBackground
                                                        style={{ width: 20, height: 20, marginTop: 5 }}
                                                        source={require('~/Assets/Icon/IconVideo/comments.png')}
                                                    />
                                                    {/* <Text style={[GlobalStyles.h5a, { marginLeft: 5, marginTop: 5 }]}>1036</Text> */}
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        {/* Comment child */}
                                        {comment.commentChilds.map((cc, index) => (
                                            <View
                                                key={index}
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
                                                            source={{ uri: cc.avatarUrl }}
                                                        />
                                                    </View>
                                                    {/* Name Date */}
                                                    <View style={{ marginLeft: 10 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={[GlobalStyles.h5a, {}]}>{cc.userName}</Text>
                                                        </View>
                                                        {/* Comments */}
                                                        <View style={{ width: windowWidth / 1.8 }}>
                                                            <Text numberOfLines={2} ellipsizeMode="clip">
                                                                {cc.text}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                {/* <View style={{ marginLeft: 50, marginTop: 10 }}>
                                                <Text style={[GlobalStyles.gray, GlobalStyles.h5a, {}]}>
                                                    Xem tất cả 99 câu trả lời
                                                </Text>
                                            </View> */}
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        ))
                    )}

                    {/* Comment */}
                </ScrollView>
            )}

            {/* CommentsAdd */}
            <View style={{ alignItems: 'center', backgroundColor: '#00000000' }}>
                <View
                    style={{
                        width: windowWidth / 1.1,
                        backgroundColor: '#8181813d',
                        padding: 10,
                        borderRadius: 10,
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        ref={inputRef}
                        onBlur={() => {
                            setidComment(0);
                        }}
                        placeholder="Để lại bình luận thân thiện"
                        value={comment}
                        onChangeText={setComment}
                        onSubmitEditing={() => {
                            if (idComment == 0) {
                                handleComment();
                            } else {
                                handleCommentChild();
                            }
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
