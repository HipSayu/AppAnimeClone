import AsyncStorage from '@react-native-async-storage/async-storage';

const getDataStorage = async (NameStorage) => {
    try {
        var data = await AsyncStorage.getItem(`${NameStorage}`);
        data = JSON.parse(data);
        // console.log('data', data);
        return data;
    } catch (error) {
        return error;
    }
};
export { getDataStorage };
