import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../services/firebase'; // ✅ Use centralized instance

export default function WelcomeBackScreen({ navigation }) {
    const [firstName, setFirstName] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        const user = auth.currentUser;

        const loadUser = async () => {
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const name = data.name || user.email?.split('@')[0];
                        setFirstName(name);
                        setRole(data.role);

                        setTimeout(() => {
                            if (data.role === 'admin') {
                                navigation.replace('AdminDashboard');
                            } else {
                                navigation.replace('UserTabs');
                            }
                        }, 2000);
                    }
                } catch (err) {
                    console.error('Error fetching user info:', err);
                }
            }
        };

        loadUser();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome back, {firstName || '...'}</Text>
            {role ? <Text style={styles.subtitle}>Role: {role}</Text> : <ActivityIndicator size="small" />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
    subtitle: { fontSize: 18, color: '#666' },
});
