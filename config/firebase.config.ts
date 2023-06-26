import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyASbuxln7HczuZWP-1cYYFbDKwMeXAnu4I",
    authDomain: "myblog-6b5c9.firebaseapp.com",
    databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "myblog-6b5c9",
    storageBucket: "myblog-6b5c9.appspot.com",
    messagingSenderId: "296525802844",
    appId: "1:296525802844:web:be27b3704d5f9f8d4ca599",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    measurementId: "G-LKP5ZMEX95",
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storageRef = (fileName: string) => ref(getStorage(app), 'my-blog/' + fileName);






export { db, storageRef };

