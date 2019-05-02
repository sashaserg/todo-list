import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDx-gXgPbF0QVLjWpMYvh80TcF8NSznMyI",
    authDomain: "beorganized-3d893.firebaseapp.com",
    databaseURL: "https://beorganized-3d893.firebaseio.com",
    projectId: "beorganized-3d893",
    storageBucket: "beorganized-3d893.appspot.com",
    messagingSenderId: "345945600457"
    };
    
firebase.initializeApp(config);

export default firebase;
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();