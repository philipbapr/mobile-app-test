import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAeNZlRyyyUnChDyvVgzGb4KPIz52FjBCI",
    authDomain: "chat-bapr.firebaseapp.com",
    databaseURL: "https://chat-bapr.firebaseio.com",
    projectId: "chat-bapr",
    storageBucket: "chat-bapr.appspot.com",
    messagingSenderId: "606255625465",
    appId: "1:606255625465:web:0d4f2e0b234f428442de28",
    measurementId: "G-CNFKNH6B84"
  };
  
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore()

export default db