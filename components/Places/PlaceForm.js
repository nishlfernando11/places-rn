import { useCallback, useState } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput } from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/place";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

const PlaceForm = ({onCreatePlace}) => {
    const [title, setTitle] = useState('');
    const [selectedImg, setSelectedImg] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    const changeTitleHandler = (text) => {
        setTitle(text);
    }
    const savePlaceHandler = () => {
        const placeData = new Place(title, selectedImg, pickedLocation);
        onCreatePlace(placeData)
    }
    const takeImageHandler = (imgUrl) => {
        setSelectedImg(imgUrl)
    }
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location)
    }, [])


    return <ScrollView style={styles.form}>
        <View>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.input} onChangeText={changeTitleHandler} />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>

}

export default PlaceForm;

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
});