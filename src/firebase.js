import { initializeApp,getApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
apiKey: process.env.APIKEY,
authDomain: process.env.AUTHDOMAIN,
projectId: process.env.PROJECTID,
storageBucket: process.env.STORAGEBUCKET,
databaseURL: process.env.DATABASEURL,
messagingSenderId: process.env.MESSAGINGSENDERID,
appId: process.env.APPID,
measurementId: process.env.MEASUREMENTID
};

// Initialize Firebase
export const app = getApps().length>0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const database = getDatabase(app);
