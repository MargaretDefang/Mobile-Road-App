import { getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';

const AdminProfileScreen = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const docRef = doc(db, 'admins', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setAdminData(docSnap.data());
                    } else {
                        console.warn('No admin document found!');
                    }
                }
            } catch (error) {
                console.error('Error fetching admin data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" style={styles.loader} />;
    }

    if (!adminData) {
        return <Text style={styles.error}>Failed to load admin profile.</Text>;
    }

    const avatarUrl =
        adminData.photoURL ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(adminData.name || 'Admin')}&background=random`;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: avatarUrl }}
                style={styles.avatar}
            />
            <Text style={styles.name}>{adminData.name || 'Admin Name'}</Text>
            <Text style={styles.info}>Email: {auth.currentUser.email}</Text>
            <Text style={styles.info}>Role: Admin</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'red',
        fontSize: 16,
        marginTop: 50,
        textAlign: 'center',
    },
});

export default AdminProfileScreen;
