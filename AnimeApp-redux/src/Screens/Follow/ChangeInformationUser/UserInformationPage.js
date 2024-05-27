import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { updateUser } from '~/Services/Action/Login';
import { useDispatch } from 'react-redux';

import GlobalStyles from '~/Styles/GlobalStyles';
import Information from '~/Components/InformationUser/Information';
import Popup from '~/Common/Constanst';

const HOST = process.env.EXPO_PUBLIC_API_URL_HOST;
const FILE = process.env.EXPO_PUBLIC_API_URL_FILE;

export default function UserInformationPage({ route }) {
    const data = route.params;
    const [image, setImage] = useState(data.avatarUrl);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    console.log('data', data);

    const handleImagePickerPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        console.log('check Image Upload', result.assets[0]);
    };

    const handleUpload = async (uriImage) => {
        //Image

        var fileName = uriImage.substring(uriImage.lastIndexOf('/') + 1);
        console.log(fileName);
        let formDataImage = new FormData();
        formDataImage.append('file', {
            uri: uriImage,
            type: 'image/jpeg',
            name: `${fileName}.jpg`,
        });

        let configImage = {
            method: 'POST',
            maxBodyLength: Infinity,
            url: `${HOST}${FILE}/upload_test`,
            headers: { 'Content-Type': 'multipart/form-data' },
            data: formDataImage,
        };

        axios
            .request(configImage)
            .then((res) => {
                var urlAvatar = res.data;
                console.log('res2', res.data);

                updateUser(data.id, (tieuSu = ''), (avatarUrl = urlAvatar), (backgroundUrl = ''))
                    .then((res) => {
                        dispatch({
                            type: 'CHANGE_NAME_RESQUEST',
                        });
                        Popup('Thay đổi Avatar thành công');
                        navigation.navigate('UserHomePage');
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log('error Change Name', error);
                    });
            })
            .catch((err) => console.log(err));
    };

    return (
        <SafeAreaView style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ImageBackground
                        style={{ width: 20, height: 20, marginRight: 5, marginLeft: 10 }}
                        source={require('~/Assets/Icon/IconReturn.png')}
                    />
                </TouchableOpacity>
                <Text style={GlobalStyles.h4_Medium}>Thông tin tài khoản</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ImageBackground
                            style={{ width: 20, height: 20, marginRight: 5 }}
                            source={require('~/Assets/Icon/List.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                <ImageBackground
                    borderRadius={45}
                    style={{ width: 90, height: 90, marginRight: 5, marginTop: 10 }}
                    source={{ uri: image }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            handleImagePickerPress();
                        }}
                        style={{
                            top: 50,
                            left: 50,
                            alignItems: 'center',
                            width: 40,
                            height: 40,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={{ marginTop: 20 }}>
                {/* Ten */}
                <Information name={'UserName'} data={data.userName} />
                {/* Tiểu sử */}
                <Information name={'Tên'} data={data.tieuSu} page={'ChangeNamePage'} route={data} />
                {/* Số Điện Thoại */}
                <Information name={'Số điện thoại'} data={data.sđt} />
            </View>
            {image != data.avatarUrl && (
                <View style={{ alignItems: 'center', marginTop: 50 }}>
                    <TouchableOpacity
                        onPress={() => handleUpload(image)}
                        style={{
                            borderRadius: 10,
                            width: 200,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 10,
                            backgroundColor: GlobalStyles.blue.color,
                        }}
                    >
                        <Text style={[GlobalStyles.h4, GlobalStyles.white]}>Thay đổi Avatar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
