import React, { useState, useCallback, useRef } from 'react';
import { Button, View, Alert, TouchableOpacity } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function ResgisterSDTPage() {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === 'ended') {
            setPlaying(false);
            Alert.alert('video has finished playing!');
        }
    }, []);

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    return (
        <View>
            <YoutubePlayer
                initialPlayerParams={{ playerLang: 'Hipdz', showClosedCaptions: true }}
                height={300}
                play={playing}
                videoId={'9WWap1_I3mA'}
                onChangeState={onStateChange}
            />
            <TouchableOpacity
                // TouchableOpacity to "steal" taps
                // absolutely positioned to the top
                // height must be adjusted to
                // just cover the top 3 dots
                style={{
                    top: 0,
                    height: 50,
                    width: '100%',
                    position: 'absolute',
                }}
            />
        </View>
    );
}
