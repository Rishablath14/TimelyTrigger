import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
apiKey: process.env.APIKEY,
authDomain: process.env.AUTHDOMAIN,
databaseURL: "https://timelytrigger-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "timelytrigger",
storageBucket: process.env.STORAGEBUCKET,
messagingSenderId: process.env.MESSAGINGSENDERID,
appId: process.env.APPID,
measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
export const app = getApps().length>0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);
