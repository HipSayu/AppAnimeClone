import Navigation from '~/Routes';

import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Redux from '~/Services/Redux/Store';
import React from 'react';

export default function AppNav() {
    return (
        <Provider store={Redux.store}>
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </Provider>
    );
}
