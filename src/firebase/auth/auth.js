import firebase from 'firebase/app';
import "firebase/auth";

export const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    return await firebase.auth().signInWithRedirect(provider)
};

export const signOut = async () => {
    return await firebase.auth().signOut()
}
