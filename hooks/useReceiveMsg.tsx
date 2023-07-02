import { receiveMessage, requestPermission } from 'config/firebase.config';
import React, { useEffect } from 'react'

export default function useReceiveMsg() {
  useEffect(() => {
    setToken();

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    // Calls the getMessage() function if the token is there
    async function setToken() {
      try {
        const token = await requestPermission();
        if (token) {
          receiveMessage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
}