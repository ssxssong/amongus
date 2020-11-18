import firebase from 'firebase/app';
import "firebase/auth";
import { auth } from '../firebaseInit';

export const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then().catch();
    auth.getRedirectResult().then().catch();
};