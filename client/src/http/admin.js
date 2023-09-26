import axios from 'axios';
export function getHiredList(accessToken){
    try {
        const axiosInstance= axios.create({
          baseURL:'http://localhost:5000',
          headers:{
            common:{
              'Authorization':`Bearer ${accessToken}`
            }
          }
        })
        return axiosInstance.get('/api/admin/gethireduser')
    } catch (error) {
        console.log(error)
    }
  }



  export async function EditUser(accessToken,data,userId){
    try {
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000', // Replace with your API endpoint
        headers: {
          common: {
            'Authorization': `Bearer ${accessToken}`, // Adding the token to the header
          },
        },
      });

      const requestData={
        data:data,
        userId:userId
      }
      
      return await axiosInstance.patch('/api/admin/updateuser', requestData);
    } catch (error) {
      console.log(error);
    }
    
  }