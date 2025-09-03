import apiInstance from "./apiService";

const getClinics = async (location) => {
    try {
        const response = await apiInstance.get(`/getClinics/${location}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching geolocation:', error);
    }
}

const locationServices = {
    getClinics,
}

export default locationServices;