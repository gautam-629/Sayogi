import axios from 'axios';

export const makeActivateRequest = async (name, avatar, token) => {
  try {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000', // Replace with your API endpoint
      headers: {
        common: {
          'Authorization': `Bearer ${token}`, // Adding the token to the header
        },
      },
    });

    const requestData = {
      name: name,
      avatar: avatar,
    };

     return await axiosInstance.post('/api/activate', requestData);
  } catch (error) {
    // Handle the error
     return error;
  }
};
