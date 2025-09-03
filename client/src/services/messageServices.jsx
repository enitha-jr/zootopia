import apiInstance from "./apiService";

const getMessageHistory = async (receiverId) => {
    try {
        const response = await apiInstance.get(`/message/${receiverId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching message history:", error);
    }
}

const getInboxUsers = async () => {
    try {
        const response = await apiInstance.get('/message/inbox');
        return response.data;
    } catch (error) {
        console.error("Error fetching inbox users:", error);
    }
}

const messageServices = {
    getMessageHistory,
    getInboxUsers,
}

export default messageServices;