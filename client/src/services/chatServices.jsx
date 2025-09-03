import apiInstance from "./apiService";

const getAIResponse = async (prompt) => {
    try {
        const response = await apiInstance.post('/getAIResponse', { prompt });
        return response.data;
    } catch (error) {
        console.error("Error fetching AI response:", error.response?.data || error.message);
    }
}

const chatServices = {
    getAIResponse,
}

export default chatServices;