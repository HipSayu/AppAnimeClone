import instance from '../Api/AxiosCustom';
import getLocalToken from './getLocalToken';

const LIKEVIDEO = process.env.EXPO_PUBLIC_API_URL_USERLIKEVIDEO;
const COMMENT = process.env.EXPO_PUBLIC_API_URL_COMMENT;
const VIDEO = process.env.EXPO_PUBLIC_API_URL_VIDEO;

const checkIslike = async (userId, idVideo) => {
    return instance.get(`/${LIKEVIDEO}/CheckLikes?UserId=${userId}&VideoId=${idVideo}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const likeVideo = async (userId, idVideo) => {
    return instance.post(
        `/${LIKEVIDEO}/Create`,
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
        `/${LIKEVIDEO}/deleteLike`,
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

const createComment = async (comment, data, userId) => {
    return instance.post(
        `/${COMMENT}/Create`,
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

const createCommentChild = async (comment, data, userId, idComment) => {
    return instance.post(
        `/${COMMENT}/Create-comment-child`,
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

const getVideoById = async (IdVideo) => {
    return instance.get(`/${VIDEO}/get-video-by-id/${IdVideo}`);
};

const getVideoPlayVideoPage = async (idVideo, pageSize = 10, pageIndex = 1) => {
    return instance.get(
        `/${VIDEO}/get-Video-play-video?IdVideo=${idVideo}&pageSize=${pageSize}&pageIndex=${pageIndex}`,
    );
};

const getLikeVideoById = async (idVideo) => {
    return instance.get(`/${VIDEO}/get-like-video-by-idVideo/${idVideo}`);
};

const getcommentVideoPage = async (idVideo) => {
    return instance.get(`/${VIDEO}/get-video-with-comment/${idVideo}`);
};

export {
    checkIslike,
    likeVideo,
    disLikeVideo,
    createComment,
    createCommentChild,
    getVideoById,
    getVideoPlayVideoPage,
    getLikeVideoById,
    getcommentVideoPage,
};
