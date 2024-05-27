import getLocalToken from './getLocalToken';
import instance from '../Api/AxiosCustom';

const USER = process.env.EXPO_PUBLIC_API_URL_USER;
const USERFOLLOW = process.env.EXPO_PUBLIC_API_URL_USERFOLLOW;

const getUserFollow = async (userId) => {
    return instance.get(`/${USER}/get-all-user-follow?UserId=${userId}&pageSize=3&pageIndex=1&keyword=a`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};
const getUserNotFollow = async (userId) => {
    return instance.get(`/${USER}/get-all-user-not-follow?UserId=${userId}&pageSize=5&pageIndex=1&keyword=a`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const followUser = async (userIdLogin, userFollow) => {
    return instance.post(
        `/${USERFOLLOW}/Create`,
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
    return instance.delete(`/${USERFOLLOW}/Unfollow?IdFollower=${userIdLogin}&IdFollowing=${userFollow}`, {
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

const getUserFollowWithVideo = async (pageSize, pageIndex, userId) => {
    return instance.get(`/${USER}/get-all-user-follow?pageSize=${pageSize}&pageIndex=${pageIndex}&UserId=${userId}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const GetUserVideo = async (userFollowId) => {
    return instance.get(`/${USER}/get-user-with-Video-by-id/${userFollowId}`);
};

const GetUserById = async (id) => {
    return instance.get(`/${USER}/get-by-id/${id}`);
};

const ChangeNameUser = async (name, userId) => {
    return instance.put(`/${USER}/update`, {
        tieuSu: name,
        userId: userId,
    });
};

export {
    getUserFollow,
    getUserNotFollow,
    followUser,
    unFollowUser,
    CheckIsFollow,
    getUserFollowWithVideo,
    GetUserVideo,
    GetUserById,
    ChangeNameUser,
};
