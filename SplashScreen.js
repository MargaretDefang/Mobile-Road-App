import { useCallback, useEffect, useRef } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';

export default function SplashScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const navigateToAuth = useCallback(() => {
        navigation.replace('Auth');
    }, [navigation]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1200,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            navigateToAuth();
        }, 2200);

        return () => clearTimeout(timer);
    }, [fadeAnim, navigateToAuth]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <Animated.Image
                source={require('../assets/images/splash_icon.png')}
                style={[styles.logo, { opacity: fadeAnim }]}
            />
            <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
                Your Companion While Moving
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 180,
        height: 180,
        resizeMode: 'contain',
    },
    tagline: {
        marginTop: 40,
        fontSize: 18,
        fontStyle: 'italic',
        color: '#555',
        textAlign: 'center',
        fontWeight: '500',
    },
});