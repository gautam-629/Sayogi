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


export const makeLogout = async (accessToken,refreshToken) => {
  try {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000', // Replace with your API endpoint
      headers: {
        common: {
          'Authorization': `Bearer ${accessToken}`, // Adding the token to the header
        },
      },
    });

    const requestData = {
      refreshToken:refreshToken
    };

     return await axiosInstance.post('/api/logout', requestData);
  } catch (error) {
    // Handle the error
     return error;
  }
};

export const makeRefreshRequest = async (refreshToken) => {
  try {
    const axiosInstance = axios.create({
      baseURL:"http://localhost:5000",
      headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
      },
  });

    const requestData = {
      refreshTokenFrombody:refreshToken
    };

     return await axiosInstance.post('/api/refresh', requestData);
  } catch (error) {
    // Handle the error
     return error;
  }
};


export async function createComments(content,serviceID,accessToken){
  try {
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:5000', // Replace with your API endpoint
      headers: {
        common: {
          'Authorization': `Bearer ${accessToken}`, // Adding the token to the header
        },
      },
    });
    const requestData = {
      content:content,
      id:serviceID
    };
    return await axiosInstance.post('/api/comments/create', requestData);
  } catch (error) {
    console.log(error);
  }
  
}