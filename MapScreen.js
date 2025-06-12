import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                Alert.alert('Permission Denied', 'Location permission is required to show your position on the map.');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);

            Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 10,
                },
                (locUpdate) => {
                    setLocation(locUpdate.coords);
                }
            );
        })();
    }, []);

    if (!location) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Loading your location...</Text>
            </View>
        );
    }

    return (
        <MapView
            style={styles.map}
            showsUserLocation={true}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Marker
                coordinate={{ latitude: location.latitude + 0.001, longitude: location.longitude + 0.001 }}
                title="Nearby Road Sign"
                description="This is a sample road sign location"
            />

        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
