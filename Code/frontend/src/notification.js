import axios from "axios";

export const addNotification = async (data) => {
  console.log(data);
  if (data) {
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/CreateUserNotification`,data);
    
        console.log(response); // Handle the response data here
      } catch (error) {
        console.error(error); // Handle error here
      }
    }
    };

    export const addNotificationVendors = async (data) => {
      console.log(data);
      if (data) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/NotifyVendor`,data);
        
            console.log(response); // Handle the response data here
          } catch (error) {
            console.error(error); // Handle error here
          }
        }
        };

    export const addNotificationCommittee = async (data) => {
      console.log(data);
      if (data) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/CreateCommitteeNotification`,data);
        
            console.log(response); // Handle the response data here
          } catch (error) {
            console.error(error); // Handle error here
          }
        }
        };

        export const addNotificationEmpId = async (data) => {
          console.log(data);
          if (data) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/EmployeeeNotificationById`,data);
            
                console.log(response); // Handle the response data here
              } catch (error) {
                console.error(error); // Handle error here
              }
            }
            };

            export const addNotificationVendorByID = async (data) => {
              console.log(data);
              if (data) {
                try {
                    const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/NotifyVendornById`,data);
                
                    console.log(response); // Handle the response data here
                  } catch (error) {
                    console.error(error); // Handle error here
                  }
                }
                };
    
export const getNotification = async (empId) => {
  try {
      const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/GetUserNotifications/${empId}`);
  
      console.log(response); // Handle the response data here
      return response.data;
    } catch (error) {
      console.error(error); // Handle error here
    }
  };


  export const updateNotification = async (id) => {
    console.log(id);
    try {
        const response = await axios.put(`${process.env.REACT_APP_API_HOST}/api/UserNotifications/UpdateUserNotification/${id}`);
    
        console.log(response); // Handle the response data here
      } catch (error) {
        console.error(error); // Handle error here
      }
    };






