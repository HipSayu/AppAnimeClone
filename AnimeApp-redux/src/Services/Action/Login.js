import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '../Api/AxiosCustom';
import axios from 'axios';

const LOGIN = process.env.EXPO_PUBLIC_API_URL_LOGIN;
const USER = process.env.EXPO_PUBLIC_API_URL_USER;
const HOST = process.env.EXPO_PUBLIC_API_URL_HOST;

const checkNumberPhone = (number) => {
    return instance.get(`/${LOGIN}/CheckSDT/${number}`);
};

const createUser = async (userName, password, SDT) => {
    return await axios.post(`http://localhost:5179/api/User/create`, {
        userName: userName,
        password: password,
        sđt: SDT,
        tieuSu: userName,
        avatarUrl: '',
        backgroundUrl: '',
    });
};

const loginUser = (SDT, userName, password) => {
    return instance.get(`/${LOGIN}/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`);
};

const updateUser = (id, tieuSu = '', avatarUrl = '', backgroundUrl = '') => {
    return instance.put(`/${USER}/update`, {
        userId: id,
        userName: '',
        password: '',
        sđt: '',
        tieuSu: tieuSu,
        avatarUrl: avatarUrl,
        backgroundUrl: backgroundUrl,
    });
};

const clearLogin = async () => {
    await AsyncStorage.removeItem('my_login');
    return true;
};
export { checkNumberPhone, createUser, loginUser, updateUser, clearLogin };
