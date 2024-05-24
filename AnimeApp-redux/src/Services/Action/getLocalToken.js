import AsyncStorage from '@react-native-async-storage/async-storage';

const getLocalToken = async () => {
    var my_login = await AsyncStorage.getItem('my_login');
    my_login = JSON.parse(my_login);
    return my_login.token.accessToken;
};
export default getLocalToken;
