import { getCurrentUserId } from "./decodeData";

export const getCurrMajorAndYear = async () => {
    const user_id = getCurrentUserId();
    // console.log("calling getCurrMajorAndYear!");
    const response = await fetch(`/api/user/${user_id}`);
    if (!response) {
        console.error('Failed to fetch user ID');
        return;
    }
    // console.log(response);
    try {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const student = await response.json();
        // console.log(student);
        return student;
    } catch (error) {
        console.error('Failed to fetch student:', error);
    }
}

// async function getStudentMajorAndYear(user_id) {
//     try {
//         const response = await fetch(`/api/user/${user_id}`);

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const student = await response.json();

//         return student;
//     } catch (error) {
//         console.error('Failed to fetch student:', error);
//     }
// }