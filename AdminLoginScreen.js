import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { auth, db } from '../../services/firebase';

export default function AdminLoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAdminLogin = async () => {
        if (!email || !password) {
            Alert.alert('Missing Fields', 'Please enter both email and password.');
            return;
        }

        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Check admin role
            const adminDoc = await getDoc(doc(db, 'admins', uid));
            if (adminDoc.exists()) {
                navigation.replace('AdminDashboard'); // navigate to admin dashboard
            } else {
                Alert.alert('Access Denied', 'You are not authorized as an admin.');
                await auth.signOut();
            }
        } catch (error) {
            Alert.alert('Login Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Admin Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Admin Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#007bff" />
            ) : (
                <Button title="Login as Admin" onPress={handleAdminLogin} />
            )}

            <TouchableOpacity onPress={() => navigation.navigate('UserLogin')}>
                <Text style={styles.link}>Login as User</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    link: { marginTop: 15, color: '#007bff', textAlign: 'center' },
});
