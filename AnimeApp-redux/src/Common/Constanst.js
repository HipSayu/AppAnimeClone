import { Alert } from 'react-native';

export default function Popup(Error) {
    Alert.alert('Thông báo', `${Error}`, [
        {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
        },
    ]);
}
