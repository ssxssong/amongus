import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";
import {firebaseConfig} from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

// session
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then()
  .catch();

export const functions = firebase.functions();

// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
//   // Send token to your backend via HTTPS
//   // ...
// }).catch(function(error) {
//   // Handle error
// });



export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const rdb = firebase.database();
