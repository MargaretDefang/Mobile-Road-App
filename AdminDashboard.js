import { getAuth, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function AdminDashboard({ navigation }) {
    const [adminEmail, setAdminEmail] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setAdminEmail(user.email);
        }
    }, []);

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            navigation.replace('Auth');
        } catch (error) {
            console.error('Logout failed:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome Admin</Text>
            <Text style={styles.email}>Logged in as: {adminEmail}</Text>
            <Button title="Logout" onPress={handleLogout} color="#ff5c5c" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    email: { fontSize: 16, marginBottom: 30 },
});
