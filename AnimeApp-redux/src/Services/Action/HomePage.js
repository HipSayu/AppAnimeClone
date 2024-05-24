import instance from '../Api/AxiosCustom';

const VIDEO = process.env.EXPO_PUBLIC_API_URL_VIDEO;
const ANIME = process.env.EXPO_PUBLIC_API_URL_ANIME;

const getVideoHomePage = async () => {
    return instance.get(`/${VIDEO}/get-all-home?pageSize=20&pageIndex=1`);
};

const getVideoHomePageNotLogin = async (pageSize = 10, pageIndex = 1, keyword = 'a') => {
    return instance.get(`/${VIDEO}/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`);
};

const getAnimeHomePage = async () => {
    return instance.get(`/${ANIME}/get-Home-Page?pageSize=5&pageIndex=1`);
};

const getAnimeContinucePage = async () => {
    return instance.get(`/${ANIME}/get?pageSize=10&pageIndex=1&keyword=c`);
};

export { getVideoHomePage, getAnimeHomePage, getAnimeContinucePage, getVideoHomePageNotLogin };
