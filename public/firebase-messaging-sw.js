importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyASbuxln7HczuZWP-1cYYFbDKwMeXAnu4I",
    authDomain: "myblog-6b5c9.firebaseapp.com",
    databaseURL: "https://DATABASE_NAME.firebaseio.com",
    projectId: "myblog-6b5c9",
    storageBucket: "myblog-6b5c9.appspot.com",
    messagingSenderId: "296525802844",
    appId: "1:296525802844:web:be27b3704d5f9f8d4ca599",
    measurementId: "G-LKP5ZMEX95",
});

const messaging = firebase.messaging();