import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getStorage, ref } from "firebase/storage";
import localforage from "localforage";

const firebaseConfig = {
    apiKey: "AIzaSyASbuxln7HczuZWP-1cYYFbDKwMeXAnu4I",
    authDomain: "myblog-6b5c9.firebaseapp.com",
    databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "myblog-6b5c9",
    storageBucket: "myblog-6b5c9.appspot.com",
    messagingSenderId: "296525802844",
    appId: "1:296525802844:web:be27b3704d5f9f8d4ca599",
    measurementId: "G-LKP5ZMEX95",
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storageRef = (fileName: string) => ref(getStorage(app), 'my-blog/' + fileName);

function requestPermission() {
    return Notification.requestPermission().then(async (permission) => {
        if (permission === 'granted') {
            const messaging = getMessaging(app);
            const tokenInLocalForage = await localforage.getItem("fcm_token");
            if (tokenInLocalForage !== null) {
                console.log(tokenInLocalForage)
                return tokenInLocalForage;
            }
            getToken(messaging, { vapidKey: "BFIhfUfsjU1owmb9hTyxr37pMPef2OxAdjElWEOkWa70qVhS8_TiVO5n-ruPM1yPLCAMKeM5s6A2KWvAjCnDWUg" })
                .then((currentToken) => {
                    if (currentToken) {
                        localforage.setItem("fcm_token", currentToken);
                        console.log(currentToken)
                        return currentToken
                    } else {
                        console.log('No registration token available. Request permission to generate one.');
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        } else {
            console.log('do not have permission')
        }
    })
}
function receiveMessage() {
    const messaging = getMessaging()
    onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
    });
}

export { app, db, storageRef, requestPermission, receiveMessage };

