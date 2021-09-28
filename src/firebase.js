import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCW5rN4jq23RziudvrMr_AgjoU6a5-H894",
  authDomain: "instagram-clone-b8567.firebaseapp.com",
  projectId: "instagram-clone-b8567",
  storageBucket: "instagram-clone-b8567.appspot.com",
  messagingSenderId: "993939926935",
  appId: "1:993939926935:web:9b06d5b422b63aac3a5ed2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth ,storage};