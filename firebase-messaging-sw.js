import { getMessaging, getToken } from "firebase/messaging";

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.


function requestPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        const messaging = getMessaging();
        getToken(messaging, { vapidKey: "BFIhfUfsjU1owmb9hTyxr37pMPef2OxAdjElWEOkWa70qVhS8_TiVO5n-ruPM1yPLCAMKeM5s6A2KWvAjCnDWUg" }).then((currentToken) => {
        if (currentToken) {
            console.log(currentToken)
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
        }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
        });
    }else{
        console.log('do not have permission')
    }})
}