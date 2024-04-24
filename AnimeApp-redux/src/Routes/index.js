import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IconCustom from '~/Components/Icon/IconCustom';
import CreateAnime from '~/Screens/AddVideo/CreateAnime';

import HomePage from '~/Screens/Home/HomePage';
import PlayVideoPage from '~/Screens/PlayVideo/PlayVideoPage';

import SearchResultPage from '~/Screens/Search/SearchResult/SearchResultPage';
import SearchPage from '~/Screens/Search/SearchPage';
import SearchingPage from '~/Screens/Search/Searching/SearchingPage';

import FollowPage from '~/Screens/Follow/FollowHome/FollowPage';
import User from '~/Screens/Follow/UserDetail/User';

import UserHomePage from '~/Screens/User/NotAcess/UserHomePage';
import LoginHomePage from '~/Screens/User/NotAcess/LoginHome/LoginHomePage';
import NumberPhonePage from '~/Screens/User/NotAcess/LoginHome/NumberPhoneAcess/NumberPhonePage';
import LoginNumberPhonePage from '~/Screens/User/NotAcess/LoginHome/Login/LoginNumberPhone/LoginNumberPhonePage';
import ResgisterNumberPhonePage from '~/Screens/User/NotAcess/LoginHome/Resgister/ResgisterNumberPhone/ResgisterNumberPhonePage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeScreenPage() {
    return (
        <Stack.Navigator options={{ headerShown: false }}>
            <Stack.Screen name="HomePage" options={{ headerShown: false }} component={HomePage} />
            <Stack.Screen name="PlayVideoPage" options={{ headerShown: false }} component={PlayVideoPage} />
            <Stack.Screen name="User" options={{ headerShown: false }} component={User} />
        </Stack.Navigator>
    );
}

function SearchHomePage() {
    return (
        <Stack.Navigator options={{ headerShown: false }}>
            <Stack.Screen name="SearchPage" options={{ headerShown: false }} component={SearchPage} />
            <Stack.Screen name="SearchResultPage" options={{ headerShown: false }} component={SearchResultPage} />
            <Stack.Screen name="SearchingPage" options={{ headerShown: false }} component={SearchingPage} />
            <Stack.Screen name="PlayVideoPage" options={{ headerShown: false }} component={PlayVideoPage} />
            <Stack.Screen name="User" options={{ headerShown: false }} component={User} />
        </Stack.Navigator>
    );
}

function UserPage() {
    return (
        <Stack.Navigator options={{ headerShown: false }}>
            {/* <Stack.Screen name="UserHomeAccesPage" options={{ headerShown: false }} component={UserHomeAccesPage} /> */}
            <Stack.Screen name="UserHomePage" options={{ headerShown: false }} component={UserHomePage} />
            <Stack.Screen name="LoginHome" options={{ headerShown: false }} component={LoginHome} />
            <Stack.Screen name="PlayVideoPage" options={{ headerShown: false }} component={PlayVideoPage} />
            <Stack.Screen name="User" options={{ headerShown: false }} component={User} />
        </Stack.Navigator>
    );
}

function LoginHome() {
    return (
        <Stack.Navigator options={{ headerShown: false }}>
            <Stack.Screen name="LoginHomePage" options={{ headerShown: false }} component={LoginHomePage} />
            <Stack.Screen name="NumberPhonePage" options={{ headerShown: false }} component={NumberPhonePage} />
            <Stack.Screen
                name="LoginNumberPhonePage"
                options={{ headerShown: false }}
                component={LoginNumberPhonePage}
            />
            <Stack.Screen
                name="ResgisterNumberPhonePage"
                options={{ headerShown: false }}
                component={ResgisterNumberPhonePage}
            />
        </Stack.Navigator>
    );
}

function FollowPageHome() {
    return (
        <Stack.Navigator options={{ headerShown: false }}>
            <Stack.Screen name="FollowPage" options={{ headerShown: false }} component={FollowPage} />
            <Stack.Screen name="User" options={{ headerShown: false }} component={User} />
            <Stack.Screen name="PlayVideoPage" options={{ headerShown: false }} component={PlayVideoPage} />
        </Stack.Navigator>
    );
}

function Navigation() {
    return (
        <Tab.Navigator
            initialRouteName="HomeScreenPage"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let sourceIcon;
                    let namePage;
                    if (route.name === 'HomeScreenPage') {
                        sourceIcon = focused ? 'HomeActive' : 'Home';
                        namePage = 'Trang chủ';
                    }
                    if (route.name === 'SearchHomePage') {
                        sourceIcon = focused ? 'SearchActive' : 'Search';
                        namePage = 'Khám phá';
                    }
                    if (route.name === 'CreateAnime') {
                        sourceIcon = focused ? 'AddCreate' : 'AddCreate';
                        namePage = '';
                    }
                    if (route.name === 'FollowPageHome') {
                        sourceIcon = focused ? 'HeartActive' : 'Heart';
                        namePage = 'Theo dõi';
                    }
                    if (route.name === 'UserPage') {
                        sourceIcon = focused ? 'UserActive' : 'User';
                        namePage = 'Tôi';
                    }

                    return <IconCustom text={namePage} sourceIcon={sourceIcon} />;
                },
                tabBarStyle: {
                    borderTopWidth: 0,
                    borderColor: '#ffff',
                    height: 50,
                    alignItems: 'center',
                    paddingTop: 15,
                    justifyContent: 'center',
                    backgroundColor: '#ffff',
                },
            })}
            tabBarActiveTintColor={true}
        >
            <Tab.Screen
                name="HomeScreenPage"
                component={HomeScreenPage}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="SearchHomePage"
                component={SearchHomePage}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="CreateAnime"
                component={CreateAnime}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="FollowPageHome"
                component={FollowPageHome}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                }}
            />
            <Tab.Screen
                name="UserPage"
                component={UserPage}
                options={{
                    tabBarLabel: '',
                    headerShown: false,
                    tabBarActiveTintColor: '#fff',
                }}
            />
        </Tab.Navigator>
    );
}
export default Navigation;
