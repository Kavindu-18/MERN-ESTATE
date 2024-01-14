
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZDAmiQIC4XKDpExOFsygFb9TDOikRdxw",
  authDomain: "mern-estate-cfa1a.firebaseapp.com",
  projectId: "mern-estate-cfa1a",
  storageBucket: "mern-estate-cfa1a.appspot.com",
  messagingSenderId: "1019793439089",
  appId: "1:1019793439089:web:842212feb497709d765ed0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);