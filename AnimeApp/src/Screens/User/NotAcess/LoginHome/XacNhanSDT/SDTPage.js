import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
export default function SDTPage() {
    const navigation = useNavigation();
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('LoginHomePage');
                }}
                style={{ marginTop: 30 }}
            >
                <Text>Trở lại</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {/* Viết Code ở đây */}
                <View>
                    <Text>SDTPage</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('LoginSDTPage');
                    }}
                    style={{ marginTop: 30 }}
                >
                    <Text>Đăng Nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('ResgisterSDTPage');
                    }}
                    style={{ marginTop: 30 }}
                >
                    <Text>Đăng Ký</Text>
                </TouchableOpacity>
                {/* Button đăng ký */}
            </View>
        </>
    );
    {
        /* Check điện thoại nếu tồn tại chuyển đến trang đăng nhập Không tồn tại đến trang đăng ký */
    }
}

const styles = StyleSheet.create({});
