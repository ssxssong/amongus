import firebase from 'firebase/app';
import "firebase/auth";
import { auth } from '../firebaseInit';

export const signInWithGoogle = (callback_go) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then((user)=>{
        // Get the user's ID token as it is needed to exchange for a session cookie.
        //   return user.getIdToken().then(idToken => {
        //     // Session login endpoint is queried and the session cookie is set.
        //     // CSRF protection should be taken into account.
        //     // ...
        //     const csrfToken = getCookie('csrfToken')
        //     return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
        // //   });
        // user.user.getIdToken().then(iDToken => {
        //     // const csrfToken = getCookie('csrfToken')
        //     console.log(iDToken)
        // })
        // console.log('inside signin func', user.user)
    }).catch();
    auth.getRedirectResult().then(()=>{
        callback_go();
    }).catch();
};