import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Dimensions } from 'react-native';

import React from 'react';

import GlobalStyles from '~/Styles/GlobalStyles';

export default function InputCustom({ Name = 'SDT', placeholder = 'Nhập số điện thoại', Ispassword = false }) {
    const windowWidth = Dimensions.get('window').width;

    const windowHeight = Dimensions.get('window').height;

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'space-between',
                paddingHorizontal: 15,
            }}
        >
            <Text style={GlobalStyles.h4}>{Name}</Text>
            <View>
                <TextInput
                    keyboardType={'numeric'}
                    autoFocus={true}
                    numeric
                    secureTextEntry={Ispassword}
                    placeholder={placeholder}
                    style={{ borderBottomWidth: 1, width: windowWidth / 1.5, marginLeft: 10, paddingLeft: 10 }}
                ></TextInput>
                <Text style={[{ marginLeft: 15, color: GlobalStyles.red.color }, GlobalStyles.h5]}>Validate</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
