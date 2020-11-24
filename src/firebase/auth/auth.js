import firebase from 'firebase/app';
import "firebase/auth";

export const signInWithGoogle = (callback) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then().catch();
    firebase.auth().getRedirectResult().then().catch(()=>{callback && callback();});
};

export const signOut = (callback) => {
    firebase.auth().signOut()
        .then(() => {
            callback && callback();
        })
        .catch((error) => console.log(error));
}