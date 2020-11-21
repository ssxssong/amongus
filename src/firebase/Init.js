import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/functions";
import {config} from "./config";

const firebaseApp = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebaseApp.firestore();
export const rdb = firebase.database();
export const functions = firebase.functions();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;