import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyACtzkNvOnX7y2TwNeVQAJBUms4k0O-FFI",
authDomain: "timelytrigger.firebaseapp.com",
projectId: "timelytrigger",
storageBucket: "timelytrigger.appspot.com",
messagingSenderId: "443791129391",
appId: "1:443791129391:web:f5be25a3a33bc4ea7a3fda",
measurementId: "G-SJ1TRZ1WWB"
};

// Initialize Firebase
export const app = getApps().length>0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);