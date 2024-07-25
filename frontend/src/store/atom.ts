// import axios from "axios";
// import { atomFamily, selectorFamily } from "recoil";

import { atom } from "recoil";

// // Selector family for fetching profile data
// export const profileSelectorFamily = selectorFamily({
//   key: "profileSelectorFamily",
//   get: () => async () => {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/me`, {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token")
//         }
//       });
//       return response.data; // Assuming the response data contains the user profile information
//     } catch (error) {
//       console.error("Error fetching user profile:", error);
//       return null; // Return a default value or error indicator
//     }
//   },
// });

// // Atom family for storing user profile data
// export const profileAtomFamily = atomFamily({
//   key: "ProfileAtomFamily",
//   default: profileSelectorFamily // Using the selector family as a default for fetching data
// });


export const ProfileAtom = atom({
    key: "ProfileAtom",
    default: {
        username: "",
        fullname: "",
        email: "",
        id: ""
    }
});

export const isAuthenticatedState = atom({
  key: 'isAuthenticatedState',
  default: false, // Default state when the user is not authenticated
});


// export const BlogAtomFamily = atomFamily({
//     key: "BlogAtomFamily",
//     default: {
//         title: "",
//         content: "",
//         author: {
//             name: ""
//         },
//         createdAt: ""
//     }
// });


