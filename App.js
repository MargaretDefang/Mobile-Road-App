import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { auth, db } from './services/firebase';

import SplashScreen from './screens/SplashScreen';
import WelcomeBackScreen from './screens/WelcomeBackScreen';

import AdminLoginScreen from './screens/Auth/AdminLoginScreen';
import RegisterScreen from './screens/Auth/RegisterScreen';
import UserLoginScreen from './screens/Auth/UserLoginScreen';

import HomeScreen from './screens/User/HomeScreen';
import MapScreen from './screens/User/MapScreen';
import ProfileScreen from './screens/User/ProfileScreen';
import ReportScreen from './screens/User/ReportScreen';
import SettingsScreen from './screens/User/SettingsScreen';

import AdminDashboard from './screens/Admin/AdminDashboard';
import AdminProfileScreen from './screens/Admin/AdminProfileScreen';
import AdminReportScreen from './screens/Admin/AdminReportScreen';
import ManageUsersScreen from './screens/Admin/ManageUsersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
                name="Welcome"
                component={WelcomeBackScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UserLogin"
                component={UserLoginScreen}
                options={{ title: 'User Login' }}
            />
            <Stack.Screen
                name="AdminLogin"
                component={AdminLoginScreen}
                options={{ title: 'Admin Login' }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Register' }}
            />
        </Stack.Navigator>
    );
}

function UserTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Report" component={ReportScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

function AdminStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen
                name="AdminDashboard"
                component={AdminDashboard}
                options={{ title: 'Dashboard' }}
            />
            <Stack.Screen
                name="AdminReport"
                component={AdminReportScreen}
                options={{ title: 'Road Reports' }}
            />
            <Stack.Screen
                name="ManageUsers"
                component={ManageUsersScreen}
                options={{ title: 'Manage Users' }}
            />
            <Stack.Screen
                name="AdminProfile"
                component={AdminProfileScreen}
                options={{ title: 'Admin Profile' }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setIsAuthenticated(true);

                try {
                    const userRef = doc(db, 'users', user.uid);
                    const adminRef = doc(db, 'admins', user.uid);

                    const [userSnap, adminSnap] = await Promise.all([
                        getDoc(userRef),
                        getDoc(adminRef),
                    ]);

                    if (adminSnap.exists()) {
                        setUserRole('admin');
                    } else if (userSnap.exists()) {
                        setUserRole(userSnap.data().role || 'user');
                    } else {
                        setUserRole(null);
                    }
                } catch (e) {
                    console.error('Failed to determine user role:', e);
                    setUserRole(null);
                }
            } else {
                setIsAuthenticated(false);
                setUserRole(null);
            }

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) : !isAuthenticated ? (
                        <Stack.Screen name="Authentication" component={AuthStack} />
                    ) : userRole === 'admin' ? (
                        <Stack.Screen name="Admin" component={AdminStack} />
                    ) : (
                        <Stack.Screen name="UserTabs" component={UserTabs} />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
