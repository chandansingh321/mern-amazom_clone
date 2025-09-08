
export const getUserData = () => {
    try {
      // 1. Get the user data from localStorage
      const user = localStorage.getItem("user");
      
      // 2. Check if data exists
      if (!user) {
        console.warn("No user data found in localStorage");
        return null;
      }
      
      // 3. Parse the JSON data
      const parsedUser = JSON.parse(user);
      
      // 4. Check if userData exists in the parsed object
      if (!parsedUser || !parsedUser.userData) {
        console.warn("User data is malformed in localStorage");
        return null;
      }
      
      // 5. Return the userData
      return parsedUser.userData;
      
    } catch (error) {
      console.error("Error retrieving user data from localStorage:", error);
      return null;
    }
  };