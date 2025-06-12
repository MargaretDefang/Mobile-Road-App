// screens/User/ProfileScreen.js
import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
    const [name, setName] = useState('John Doe');
    const [email, setEmail] = useState('john@example.com');

    const handleSave = () => {
        if (!name.trim() || !email.trim()) {
            Alert.alert('Validation Error', 'Name and email cannot be empty');
            return;
        }

        Alert.alert('Profile Updated', 'Your profile information has been saved.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Profile</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[styles.input, { backgroundColor: '#eee' }]}
                value={email}
                editable={false}
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.settingsButton}
                onPress={() => navigation.navigate('Settings')}
            >
                <Text style={styles.settingsButtonText}>Go to Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
    label: { fontWeight: '600', marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 6,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    settingsButton: {
        marginTop: 20,
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
        borderColor: '#007bff',
        borderWidth: 1,
    },
    settingsButtonText: {
        color: '#007bff',
        fontWeight: '600',
        fontSize: 16,
    },
});
