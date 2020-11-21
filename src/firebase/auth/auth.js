import firebase from 'firebase/app';
import "firebase/auth";
import {locationType} from "../../utils/constatns";

export const signInWithGoogle = (callback) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then().catch();
    firebase.auth().getRedirectResult().then(() => {
        callback && callback();
    }).catch();
};

const signOut = (callback) => {
    firebase.auth().signOut()
        .then(() => {
            callback && callback();
        })
        .catch((error) => console.log(error));
}