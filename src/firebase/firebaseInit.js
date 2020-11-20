import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import {firebaseConfig} from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(firebaseConfig);

// session
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then()
  .catch();

export const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const rdb = firebase.database();
