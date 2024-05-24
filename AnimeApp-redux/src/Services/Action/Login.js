import instance from '../Api/AxiosCustom';

const LOGIN = process.env.EXPO_PUBLIC_API_URL_LOGIN;
const USER = process.env.EXPO_PUBLIC_API_URL_USER;

const CheckNumberPhone = (number) => {
    return instance.get(`/${LOGIN}/CheckSDT/${number}`);
};

const CreateUser = async (userName, password, SDT) => {
    return instance.post(`/${USER}/create`, {
        userName: userName,
        password: password,
        sđt: SDT,
        tieuSu: '',
        avatarUrl: '',
        backgroundUrl: '',
    });
};

const LoginUser = async (SDT, userName, password) => {
    return instance.get(`/${LOGIN}/Login?NumberPhone=${SDT}&UserName=${userName}&Password=${password}`);
};

export { CheckNumberPhone, CreateUser, LoginUser };
