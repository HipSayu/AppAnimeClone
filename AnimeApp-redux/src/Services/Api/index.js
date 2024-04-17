import axios from 'axios';

const host = 'http://localhost:5179/api/';
const Video = 'Video';
const Anime = 'Anime';
const Search = 'Search';
const User = 'User';
const LikeVideo = 'UserLikeVideo';
const Comment = 'Comments';
const UserFollow = 'UserFollow';
const Login = 'Login';
//HomePage
const getVideoHomePage = async (pageSize = 10, pageIndex = 1, keyword = 'a') => {
    try {
        const response = await axios.get(
            `${host}${Video}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const getAnimeHomePage = async (pageSize = 5, pageIndex = 1, keyword = 'a') => {
    try {
        const response = await axios.get(
            `${host}${Anime}/get?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

//Search
const getHistorySearchById = async (pageSize = 20, pageIndex = 1, userId = userId) => {
    try {
        const response = await axios.get(
            `${host}${Search}/get-all-page?pageSize=${pageSize}&pageIndex=${pageIndex}&UserId=${userId}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const createSearchHistiory = async (search = search, userId = userId) => {
    try {
        const response = await axios.post(`${host}${Search}/create`, {
            userId: userId,
            searchKeyWord: search,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteSearchHistiory = async (idSearch) => {
    try {
        const response = await axios.delete(`${host}${Search}/delete/${idSearch}`);
        return response;
    } catch (error) {
        throw error;
    }
};

//User

const getUserSearch = async (pageSize = 10, pageIndex = 1, data) => {
    try {
        const response = await axios.get(
            `${host}${User}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${data}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const getVideoById = async (IdVideo) => {
    try {
        const response = await axios.get(`${host}${Video}/get-video-by-id/${IdVideo}`);
        return response;
    } catch (error) {
        throw error;
    }
};

//Get Video De Xuat
const getVideoDeXuat = async (data, pageSize = 10, pageIndex = 1, keyword = 'a') => {
    try {
        const response = await axios.get(
            `${host}${Video}/get-all?IdVideo=${data.id}&pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};
//GetLikeinVideoByid
const getLikeVideoById = async (data) => {
    try {
        const response = await axios.get(`${host}${Video}/get-like-video-by-idVideo/${data.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

//CheckLike

const CheckIslike = async (userId, data) => {
    try {
        const response = await axios.get(`${host}${LikeVideo}/CheckLikes?UserId=${userId}&VideoId=${data.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const likeVideo = async (userId, idVideo) => {
    try {
        const response = await axios.post(`${host}${LikeVideo}/Create`, {
            userId: userId,
            videoId: idVideo,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const disLikeVideo = async (userId, idVideo) => {
    try {
        const response = await axios.delete(`${host}${LikeVideo}/deleteLike`, {
            data: {
                userId: userId,
                videoId: idVideo,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

// Get Comment
const Getcomment = async (data) => {
    try {
        const response = await axios.get(`${host}${Video}/get-video-with-comment/${data.id}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const CreateComment = async (comment, data, userId) => {
    try {
        const response = await axios.post(`${host}${Comment}/Create`, {
            text: comment,
            videoId: data.id,
            userId: userId,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const CreateCommentChild = async (comment, data, userId, idComment) => {
    try {
        const response = await axios.post(`${host}${Comment}/Create-comment-child`, {
            text: comment,
            videoId: data.id,
            userId: userId,
            parentCommentId: idComment,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const GetUserFollow = async (userId, pageSize, pageIndex, keyword) => {
    try {
        const response = await axios.get(
            `${host}${User}/get-all-user-follow?UserId=${userId}&pageSize=${pageSize}}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const GetUserNotFollow = async (userId, pageSize, pageIndex, keyword) => {
    try {
        const response = await axios.get(
            `${host}${User}/get-all-user-not-follow?UserId=${userId}&pageSize=${pageSize}}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

const CreateFollow = async (userIdLogin, userFollow) => {
    try {
        const response = await axios.post(`${host}${UserFollow}/Create`, {
            idFollower: userIdLogin,
            idFollowing: userFollow,
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const GetUserVideo = async (userFollowId) => {
    try {
        const response = await axios.get(`${host}${User}/get-user-with-Video-by-id/${userFollowId}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const UnFollow = async (userIdLogin, userFollow) => {
    try {
        const response = await axios.delete(`${host}${UserFollow}/Unfollow`, {
            data: {
                idFollower: userIdLogin,
                idFollowing: userFollow,
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const CheckSdt = async (number) => {
    try {
        const response = await axios.get(`${host}${Login}/CheckSDT/${number}`);
        return response;
    } catch (error) {
        throw error;
    }
};

const CreateUser = async (userName, password) => {
    try {
        const response = await axios.post(`${host}${User}/create`, {
            userName: userName,
            password: password,
            sđt: SDT,
            tieuSu: '',
            avatarUrl: '',
            backgroundUrl: '',
        });
        return response;
    } catch (error) {
        throw error;
    }
};

const LoginUser = async (SDT, userName, password) => {
    try {
        const response = await axios.get(
            `${host}${Login}/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// .get(
//     `http://localhost:5179/api/Login/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`,
// )

// .post(`http://localhost:5179/api/User/create`, {
//                                 userName: userName,
//                                 password: password,
//                                 sđt: SDT,
//                                 tieuSu: '',
//                                 avatarUrl: '',
//                                 backgroundUrl: '',
//                             })

// .get(`http://localhost:5179/api/Login/CheckSDT/${number}`)

// .delete(`http://localhost:5179/api/UserFollow/Unfollow`, {
//                     data: {
//                         idFollower: userIdLogin,
//                         idFollowing: userFollow,
//                     },
//                 })

// .get(`http://localhost:5179/api/User/get-user-with-Video-by-id/${userFollowId}`)

// .post(`http://localhost:5179/api/UserFollow/Create`, {
//                     idFollower: userIdLogin,
//                     idFollowing: userFollow,
//                 })

// .get(
//     `http://localhost:5179/api/User/get-all-user-not-follow?UserId=${userId}&pageSize=5&pageIndex=1&keyword=a`,
// )

// .get(`http://localhost:5179/api/User/get-all-user-follow?UserId=${userId}&pageSize=3&pageIndex=1&keyword=a`)

// .post(`http://localhost:5179/api/Comments/Create-comment-child`, {
//                     text: comment,
//                     videoId: data.id,
//                     userId: userId,
//                     parentCommentId: idComment,
//                 })

// .post(`http://localhost:5179/api/Comments/Create`, {
//     text: comment,
//     videoId: data.id,
//     userId: userId,
// })
// .get(`http://localhost:5179/api/Video/get-video-with-comment/${data.id}`)
// .get(`http://localhost:5179/api/UserLikeVideo/CheckLikes?UserId=${userId}&VideoId=${data.id}`)
// .post(`http://localhost:5179/api/UserLikeVideo/Create`, ),
// .delete(`http://localhost:5179/api/UserLikeVideo/deleteLike`,
export {
    getVideoHomePage,
    getAnimeHomePage,
    getHistorySearchById,
    createSearchHistiory,
    deleteSearchHistiory,
    getUserSearch,
    getVideoById,
    getVideoDeXuat,
    getLikeVideoById,
    CheckIslike,
    likeVideo,
    disLikeVideo,
    Getcomment,
    CreateComment,
    CreateCommentChild,
    GetUserFollow,
    GetUserNotFollow,
    CreateFollow,
    GetUserVideo,
    UnFollow,
    CheckSdt,
    CreateUser,
    LoginUser,
};
