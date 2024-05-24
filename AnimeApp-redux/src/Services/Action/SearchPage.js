import instance from '../Api/AxiosCustom';
import getLocalToken from './getLocalToken';

const VIDEO = process.env.EXPO_PUBLIC_API_URL_VIDEO;
const ANIME = process.env.EXPO_PUBLIC_API_URL_ANIME;
const SEARCH = process.env.EXPO_PUBLIC_API_URL_SEARCH;
const USER = process.env.EXPO_PUBLIC_API_URL_USER;

async function getHistorySearchByIdToken(userId) {
    return instance.get(`/${SEARCH}/get-all-page?pageSize=10&pageIndex=1&UserId=${userId}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`, // headers token
        },
    });
}

const createSearchHistiory = async (search = search, userId = userId, token) => {
    return instance.post(
        `/${SEARCH}/create`,
        { userId: userId, searchKeyWord: search },
        {
            headers: {
                Authorization: `Bearer ${await getLocalToken()}`, // headers token
            },
        },
    );
};

const deleteSearchHistiory = async (idSearch) => {
    return instance.delete(`/${SEARCH}/delete/${idSearch}`, {
        headers: {
            Authorization: `Bearer ${await getLocalToken()}`,
        },
    });
};

const getVideoSearch = async (pageSize, pageIndex, keyword) => {
    return instance.get(`/${VIDEO}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`);
};

const getAnimeSearch = async (pageSize, pageIndex, keyword) => {
    return instance.get(`/${ANIME}/get?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`);
};

const getUserSearch = async (pageSize, pageIndex, data) => {
    return instance.get(`/${USER}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${data}`);
};
export {
    getVideoSearch,
    getUserSearch,
    getAnimeSearch,
    deleteSearchHistiory,
    createSearchHistiory,
    getHistorySearchByIdToken,
};
