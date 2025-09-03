import apiInstance from './apiService';

const getCategories = async() => {
    try{
        const response = await apiInstance.get('/categories');
        // console.log('Categories fetched:', response.data);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}

const getPosts = async(slug) => {
    try{
        const response = await apiInstance.get(`/posts/${slug}`);
        // console.log('Posts fetched:', response.data);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching posts:', error);
    }
}

const createPost = async(formData) => {
    try{
        console.log("Creating post with formData");
        const response = await apiInstance.post('/newpost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log("post created !!!");
        return response.data;
    }
    catch (error) {
        console.error("Error during post creation:", error.response?.data || error.message);
    }
}

const getUserPosts = async(userId) => {
    try {
        console.log('Fetching posts for user:', userId);
        const response = await apiInstance.get(`/userposts/${userId}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching user posts:', error);
    }
}

const services = {
    getCategories,
    getPosts,
    createPost,
    getUserPosts,
}

export default services;