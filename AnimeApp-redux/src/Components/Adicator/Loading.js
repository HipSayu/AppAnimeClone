import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

export default function Loading() {
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

const styles = StyleSheet.create({});
