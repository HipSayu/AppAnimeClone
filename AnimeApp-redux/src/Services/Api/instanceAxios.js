import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const host = process.env.EXPO_PUBLIC_API_URL_HOST;
const Video = process.env.EXPO_PUBLIC_API_URL_VIDEO;
const Anime = process.env.EXPO_PUBLIC_API_URL_ANIME;
const Search = process.env.EXPO_PUBLIC_API_URL_SEARCH;
const User = process.env.EXPO_PUBLIC_API_URL_USER;
const LikeVideo = process.env.EXPO_PUBLIC_API_URL_USERLIKEVIDEO;
const Comment = process.env.EXPO_PUBLIC_API_URL_COMMENT;
const UserFollow = process.env.EXPO_PUBLIC_API_URL_USERFOLLOW;
const Login = process.env.EXPO_PUBLIC_API_URL_LOGIN;

let headers = {};
const instance = axios.create({
    baseURL: `${host}`,
    timeout: 300000,
    headers,
});

const getLocalToken = async () => {
    var my_login = await AsyncStorage.getItem('my_login');
    my_login = JSON.parse(my_login);
    // console.log('accessToken 1', my_login.token.accessToken);
    return my_login.token.accessToken;
};

const getLocalRefreshToken = async () => {
    var my_login = await AsyncStorage.getItem('my_login');
    my_login = JSON.parse(my_login);
    // console.log('accessToken 2', my_login.token.accessToken);
    return { accessToken: my_login.token.accessToken, refreshToken: my_login.token.refreshToken };
};
instance.setToken = async (accessToken, refreshToken) => {
    // instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    var my_login = await AsyncStorage.getItem('my_login');
    my_login = JSON.parse(my_login);
    // console.log('accessToken 3', my_login.token.accessToken);
    // console.log('new accessToken', accessToken);
    my_login.token.accessToken = accessToken;
    my_login.token.refreshToken = refreshToken;
    AsyncStorage.setItem('my_login', JSON.stringify(my_login));
};

async function refreshToken() {
    return instance.post('/Login/refresh_token', await getLocalRefreshToken());
}

instance.interceptors.response.use(
    (response) => {
        // console.log('test intercepter', response.data);

        return response;
    },
    async (error) => {
        console.log('Error status', error.response.status);
        if (error.response.status === 401) {
            console.log('get new token using refresh token', await getLocalRefreshToken());
            await refreshToken()
                .then(async (rs) => {
                    console.log('get token refreshToken', rs.data.data);
                    await instance.setToken(rs.data.data.accessToken, rs.data.data.refreshToken);
                    const config = rs.config;
                    config.headers.Authorization = `Bearer ${rs.data.data.accessToken}`;
                    config.baseURL = `${host}`;
                    return instance(config);
                })
                .catch((error) => {
                    console.log('looix', error);
                });
        }
    },
);

//Call Api

//Search

async function getHistorySearchByIdToken(userId) {
    return instance.get(`/${Search}/get-all-page?pageSize=10&pageIndex=1&UserId=${userId}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`, // headers token
        },
    });
}

const createSearchHistiory = async (search = search, userId = userId, token) => {
    return instance.post(
        `/${Search}/create`,
        { userId: userId, searchKeyWord: search },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`, // headers token
            },
        },
    );
};

const deleteSearchHistiory = async (idSearch) => {
    return instance.delete(`/${Search}/delete/${idSearch}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

//Comment
const CreateComment = async (comment, data, userId) => {
    return instance.post(
        `/${Comment}/Create`,
        {
            text: comment,
            videoId: data.id,
            userId: userId,
        },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`,
            },
        },
    );
};

const CreateCommentChild = async (comment, data, userId, idComment) => {
    return instance.post(
        `/${Comment}/Create-comment-child`,
        {
            text: comment,
            videoId: data.id,
            userId: userId,
            parentCommentId: idComment,
        },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`,
            },
        },
    );
};

// UserFollow

const getUserFollow = async (userId) => {
    return instance.get(`/${User}/get-all-user-follow?UserId=${userId}&pageSize=3&pageIndex=1&keyword=a`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};
const getUserNotFollow = async (userId) => {
    return instance.get(`/${User}/get-all-user-not-follow?UserId=${userId}&pageSize=5&pageIndex=1&keyword=a`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const followUser = async (userIdLogin, userFollow) => {
    return instance.post(
        `/${UserFollow}/Create`,
        {
            idFollower: userIdLogin,
            idFollowing: userFollow,
        },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`,
            },
        },
    );
};
const unFollowUser = async (userIdLogin, userFollow) => {
    return instance.delete(`/${UserFollow}/Unfollow?IdFollower=${userIdLogin}&IdFollowing=${userFollow}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const CheckIsFollow = async (userId, userFollowId) => {
    return instance.get(
        `http://localhost:5179/api/UserFollow/CheckIsFollow?IdFollower=${userId}&IdFollowing=${userFollowId}`,
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`,
            },
        },
    );
};

// LikeVideo

const CheckIslike = async (userId, idVideo) => {
    return instance.get(`/${LikeVideo}/CheckLikes?UserId=${userId}&VideoId=${idVideo}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const likeVideo = async (userId, idVideo) => {
    return instance.post(
        `/${LikeVideo}/Create`,
        {
            userId: userId,
            videoId: idVideo,
        },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`,
            },
        },
    );
};

const disLikeVideo = async (userId, idVideo) => {
    return instance.delete(
        `/${LikeVideo}/deleteLike`,
        {
            data: {
                userId: userId,
                videoId: idVideo,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`,
            },
        },
    );
};

//Action
const Login_Save_Token = async (SDT, userName, password) => {
    return instance.post(`/${Login}/Login_Save_Token`, {
        numberPhone: SDT,
        userName: userName,
        password: password,
    });
};

const getVideoHomePage = async () => {
    return instance.get(`/${Video}/get-all-home?pageSize=20&pageIndex=1`);
};
// Anime Dang Do
const getAnimeHomePage = async () => {
    return instance.get(`/${Anime}/get-Home-Page?pageSize=5&pageIndex=1`);
};

const getAnimeContinucePage = async () => {
    return instance.get(`/${Anime}/get?pageSize=10&pageIndex=1&keyword=c`);
};

const getUserFollowHomePage = async (numberPhone) => {
    return instance.get(`/${User}/get-all-user-follow-home-page?NumberPhone=${numberPhone}&pageSize=10&pageIndex=1`);
};

const getVideoSearch = async (pageSize, pageIndex, keyword) => {
    return instance.get(`/${Video}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`);
};

const getAnimeSearch = async (pageSize, pageIndex, keyword) => {
    return instance.get(`/${Anime}/get?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`);
};

const getUserSearch = async (pageSize, pageIndex, data) => {
    return instance.get(`/${User}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${data}`);
};

const getUserFollowWithVideo = async (pageSize, pageIndex, userId) => {
    return instance.get(`/${User}/get-all-user-follow?pageSize=${pageSize}&pageIndex=${pageIndex}&UserId=${userId}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const GetUserVideo = async (userFollowId) => {
    return instance.get(`/${User}/get-user-with-Video-by-id/${userFollowId}`);
};

const getVideoById = async (IdVideo) => {
    return instance.get(`/${Video}/get-video-by-id/${IdVideo}`);
};

const getVideoPlayVideoPage = async (idVideo, pageSize = 10, pageIndex = 1) => {
    return instance.get(
        `/${Video}/get-Video-play-video?IdVideo=${idVideo}&pageSize=${pageSize}&pageIndex=${pageIndex}`,
    );
};

const getLikeVideoById = async (idVideo) => {
    return instance.get(`/${Video}/get-like-video-by-idVideo/${idVideo}`);
};

const GetcommentVideoPage = async (idVideo) => {
    return instance.get(`/${Video}/get-video-with-comment/${idVideo}`);
};

export {
    getHistorySearchByIdToken,
    createSearchHistiory,
    deleteSearchHistiory,
    CreateComment,
    CreateCommentChild,
    getUserFollow,
    getUserNotFollow,
    followUser,
    unFollowUser,
    CheckIslike,
    disLikeVideo,
    likeVideo,
    CheckIsFollow,
    Login_Save_Token,
    getVideoHomePage,
    getAnimeHomePage,
    getUserFollowHomePage,
    getAnimeContinucePage,
    getAnimeSearch,
    getVideoSearch,
    getUserSearch,
    getUserFollowWithVideo,
    GetUserVideo,
    getVideoById,
    getVideoPlayVideoPage,
    getLikeVideoById,
    GetcommentVideoPage,
};
