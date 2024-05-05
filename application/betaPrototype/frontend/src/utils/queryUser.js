// import { getCurrentUserId } from "./decodeData";


// export const getCurrMajorAndYear = async () => {
//     const user_id = getCurrentUserId();
//     // console.log("calling getCurrMajorAndYear!");
//     const response = await fetch(`/api/user/${user_id}`);
//     if (!response) {
//         console.error('Failed to fetch user ID');
//         return;
//     }
//     // console.log(response);
//     try {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const student = await response.json();
//         // console.log(student);
//         return student;
//     } catch (error) {
//         console.error('Failed to fetch student:', error);
//     }
// }

export const queryData = async (userId) => {
    const response = await fetch(`/api/user/${userId}`);
    if (!response) {
        console.error('Failed to fetch user info!');
        return;
    }

    try {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const profileData = await response.json();
        // console.log("Fetched user data:", profileData);  // Log the full profile data including the role
        return profileData;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
    }
}