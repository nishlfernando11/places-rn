const API_KEY = 'AIzaSyB275bIawoKYmqhyTUUIXyDql1yxszuXFE';

export const getMapPreview = (lat, lng) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${API_KEY}`
}

export const getAddress = async (lat, lng) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
    
    if (!response.ok) {
        throw new Error('Failed to fetch address.')
    }
    const data = await response.json();
    return data.results[0].formatted_address;
}
