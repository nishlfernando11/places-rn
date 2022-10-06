import { StyleSheet, View, Alert, Text, Image } from "react-native";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from 'expo-location';
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from '../../util/location';

const LocationPicker = ({ onPickLocation }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    const [pickedLocation, setPickedLocation] = useState();
    const [locationPermissionInfo, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        if (isFocused && route.params) {
            const mapPickedLocation = {
                lat: route.params.pickedLat,
                lng: route.params.pickedLng
            };
            setPickedLocation(mapPickedLocation);
        }

    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
                onPickLocation({...pickedLocation, address})
            }

        }
        handleLocation();
    }, [pickedLocation, onPickLocation])

    const verifyPermissions = async () => {
        if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
            const permissionResp = await requestPermission();
            return permissionResp.granted;
        }
        if (locationPermissionInfo.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant location permissions to use this app.');
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }
        const location = await getCurrentPositionAsync();
    }

    const pickOnMapHandler = () => {
        navigation.navigate('Map');
    }

    let locationPreview = <Text>No location picked yet.</Text>

    if (pickedLocation) {
        locationPreview = <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {locationPreview}
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="location" onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon="map" onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 180,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})