import { useState } from 'react';
import {
    Alert,
    Picker,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const reportTypes = [
    'Pothole',
    'Traffic Jam',
    'Accident',
    'Road Block',
    'Flood',
    'Other',
];

export default function ReportScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState(reportTypes[0]);

    const handleSubmit = () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }
        Alert.alert(
            'Report Submitted',
            `Type: ${type}\nTitle: ${title}\nDescription: ${description}`
        );

        setTitle('');
        setDescription('');
        setType(reportTypes[0]);

    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Submit Road Condition Report</Text>

            <Text style={styles.label}>Report Type</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={(itemValue) => setType(itemValue)}
                    style={styles.picker}
                >
                    {reportTypes.map((item) => (
                        <Picker.Item key={item} label={item} value={item} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Short title of the issue"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Detailed description"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Report</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
    },
    label: {
        marginBottom: 8,
        fontWeight: '600',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
