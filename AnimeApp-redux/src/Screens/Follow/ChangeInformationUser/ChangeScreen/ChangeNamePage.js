import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles from '~/Styles/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { updateUser } from '~/Services/Action/Login';
import Popup from '~/Common/Constanst';
import { useDispatch } from 'react-redux';

const windowWidth = Dimensions.get('window').width;

export default function ChangeNamePage({ route }) {
    const [name, setName] = useState('');
    const [isUserName, setIsUserName] = useState(true);

    const data = route.params;
    // console.log('change data', data);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleUserName = (text) => {
        if (!text.startsWith(' ')) {
            setName(text);
        }
        if (text.trim().length < 5) {
            setIsUserName(false);
        } else {
            setIsUserName(true);
        }
    };

    const handleChangeName = () => {
        updateUser(data.id, name)
            .then((res) => {
                dispatch({
                    type: 'CHANGE_NAME_RESQUEST',
                });
                Popup('Thay đổi tên thành công');
                navigation.navigate('UserHomePage');
                console.log(res);
            })
            .catch((error) => {
                console.log('error Change Name', error);
            });
    };

    return (
        <SafeAreaView style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ImageBackground
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                        source={require('~/Assets/Icon/IconReturn.png')}
                    />
                </TouchableOpacity>
                <Text style={GlobalStyles.h4_Medium}>Thay đổi tên</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            handleChangeName();
                        }}
                    >
                        <Text style={[{ color: GlobalStyles.blue.color, marginRight: 10 }, GlobalStyles.h4]}>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 20,
                        borderWidth: 1,
                        borderRadius: 10,
                        width: windowWidth / 1.1,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 10,
                    }}
                >
                    <TextInput
                        value={name}
                        numberOfLines={1}
                        style={{ width: windowWidth / 1.5 }}
                        onChangeText={handleUserName}
                        placeholder="Nhập tên muốn thay đổi"
                    ></TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            setName('');
                        }}
                    >
                        <ImageBackground
                            style={{ width: 20, height: 20, marginLeft: 10 }}
                            source={require('~/Assets/Icon/Close.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {!isUserName && (
                <Text style={[{ color: GlobalStyles.red.color, marginTop: 10, marginLeft: 21 }, GlobalStyles.h5]}>
                    UserName tối thiểu 5 ký tự
                </Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
