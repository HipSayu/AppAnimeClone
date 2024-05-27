import { Dimensions, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '~/Styles/GlobalStyles';

const windowWidth = Dimensions.get('window').width;

export default function ChangeTitlePage() {
    const [story, setStory] = useState('');

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ backgroundColor: GlobalStyles.white.color, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <ImageBackground
                        style={{ width: 20, height: 20, marginLeft: 10 }}
                        source={require('~/Assets/Icon/IconReturn.png')}
                    />
                </TouchableOpacity>
                <Text style={GlobalStyles.h4_Medium}>Thay Tiểu Sử</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Call Api');
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
                        value={story}
                        numberOfLines={1}
                        style={{ width: windowWidth / 1.5 }}
                        onChangeText={setStory}
                        placeholder="Nhập Tiểu sử"
                    ></TextInput>
                    <TouchableOpacity
                        onPress={() => {
                            setStory('');
                        }}
                    >
                        <ImageBackground
                            style={{ width: 20, height: 20, marginLeft: 10 }}
                            source={require('~/Assets/Icon/Close.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
