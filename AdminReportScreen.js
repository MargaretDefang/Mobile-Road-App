import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const AdminReportScreen = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsRef = collection(db, 'road_reports');
                const snapshot = await getDocs(reportsRef);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setReports(data);
            } catch (error) {
                console.error('Error fetching reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>Type: {item.type}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Submitted by: {item.userEmail || 'Anonymous'}</Text>
            <Text>Date: {item.date || 'N/A'}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>All Road Condition Reports</Text>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default AdminReportScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    card: {
        padding: 14,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
    },
});
