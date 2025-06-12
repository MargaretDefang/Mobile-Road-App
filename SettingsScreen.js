// screens/User/SettingsScreen.js
import { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsScreen() {
    const [pushNotifications, setPushNotifications] = useState(true);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [roadAlertNotifications, setRoadAlertNotifications] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Notification Settings</Text>

            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Push Notifications</Text>
                <Switch
                    value={pushNotifications}
                    onValueChange={setPushNotifications}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Email Notifications</Text>
                <Switch
                    value={emailNotifications}
                    onValueChange={setEmailNotifications}
                />
            </View>

            <View style={styles.settingRow}>
                <Text style={styles.settingText}>Road Alert Notifications</Text>
                <Switch
                    value={roadAlertNotifications}
                    onValueChange={setRoadAlertNotifications}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    settingText: { fontSize: 18 },
});
