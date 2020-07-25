import firebase from "firebase";

var firebaseConfig = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: process.env.REACT_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
});

const auth = firebase.auth();
export {auth };
