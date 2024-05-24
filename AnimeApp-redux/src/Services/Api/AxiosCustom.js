import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HOST = process.env.EXPO_PUBLIC_API_URL_HOST;

let headers = {};
const instance = axios.create({
    baseURL: `${HOST}`,
    timeout: 300000,
    headers,
});

const getLocalRefreshToken = async () => {
    var my_login = await AsyncStorage.getItem('my_login');
    my_login = JSON.parse(my_login);
    return { accessToken: my_login.token.accessToken, refreshToken: my_login.token.refreshToken };
};
instance.setToken = async (accessToken, refreshToken) => {
    var my_login = await AsyncStorage.getItem('my_login');
    my_login = JSON.parse(my_login);

    my_login.token.accessToken = accessToken;
    my_login.token.refreshToken = refreshToken;
    AsyncStorage.setItem('my_login', JSON.stringify(my_login));
};

async function refreshToken() {
    return instance.post('/Login/refresh_token', await getLocalRefreshToken());
}

instance.interceptors.response.use(
    (response) => {
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
                    config.baseURL = `${HOST}`;
                    return instance(config);
                })
                .catch((error) => {
                    console.log('looix', error);
                });
        }
    },
);
export default instance;
