import instance from '../Api/AxiosCustom';

const LOGIN = process.env.EXPO_PUBLIC_API_URL_LOGIN;
const USER = process.env.EXPO_PUBLIC_API_URL_USER;

const CheckNumberPhone = (number) => {
    return instance.get(`/${LOGIN}/CheckSDT/${number}`);
};

const CreateUser = (userName, password, SDT) => {
    return instance.post(`/${USER}/create`, {
        userName: userName,
        password: password,
        sđt: SDT,
        tieuSu: '',
        avatarUrl: '',
        backgroundUrl: '',
    });
};

const LoginUser = (SDT, userName, password) => {
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
export { CheckNumberPhone, CreateUser, LoginUser, updateUser };
