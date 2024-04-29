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

const getVideoHomePage = async (pageSize = 10, pageIndex = 1, keyword = 'a') => {
    try {
        return await axios.get(
            `${host}${Video}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
    } catch (error) {
        throw error;
    }
};

const getAnimeHomePage = async (pageSize = 10, pageIndex = 1, keyword = 'c') => {
    try {
        return await axios.get(`${host}${Anime}/get?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`);
    } catch (error) {
        throw error;
    }
};

//User

const getUserSearch = async (pageSize = 10, pageIndex = 1, data) => {
    try {
        return await axios.get(`${host}${User}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${data}`);
    } catch (error) {
        throw error;
    }
};

const getVideoById = async (IdVideo) => {
    try {
        return await axios.get(`${host}${Video}/get-video-by-id/${IdVideo}`);
    } catch (error) {
        throw error;
    }
};

//Get Video De Xuat
const getVideoDeXuat = async (data, pageSize = 10, pageIndex = 1, keyword = 'a') => {
    try {
        return await axios.get(
            `${host}${Video}/get-all?IdVideo=${data.id}&pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
    } catch (error) {
        throw error;
    }
};

//GetLikeinVideoByid
const getLikeVideoById = async (data) => {
    try {
        return await axios.get(`${host}${Video}/get-like-video-by-idVideo/${data.id}`);
    } catch (error) {
        throw error;
    }
};

// Get Comment
const Getcomment = async (data) => {
    try {
        return await axios.get(`${host}${Video}/get-video-with-comment/${data.id}`);
    } catch (error) {
        throw error;
    }
};

const GetUserVideo = async (userFollowId) => {
    try {
        return await axios.get(`${host}${User}/get-user-with-Video-by-id/${userFollowId}`);
    } catch (error) {
        throw error;
    }
};

const CheckSdt = async (number) => {
    try {
        return await axios.get(`${host}${Login}/CheckSDT/${number}`);
    } catch (error) {
        throw error;
    }
};

const CreateUser = async (userName, password) => {
    try {
        return await axios.post(`${host}${User}/create`, {
            userName: userName,
            password: password,
            sđt: SDT,
            tieuSu: '',
            avatarUrl: '',
            backgroundUrl: '',
        });
    } catch (error) {
        throw error;
    }
};
const LoginUser = async (SDT, userName, password) => {
    try {
        return await axios.get(`${host}${Login}/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`);
    } catch (error) {
        throw error;
    }
};
export {
    getVideoHomePage,
    getAnimeHomePage,
    getUserSearch,
    getVideoById,
    getVideoDeXuat,
    getLikeVideoById,
    Getcomment,
    GetUserVideo,
    CheckSdt,
    CreateUser,
    LoginUser,
};
