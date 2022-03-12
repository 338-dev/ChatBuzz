import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBbHwkri5Dp3eSEk4o_yXuQxitDnezlc7c",
    authDomain: "slack-like-app-e6230.firebaseapp.com",
    projectId: "slack-like-app-e6230",
    storageBucket: "slack-like-app-e6230.appspot.com",
    messagingSenderId: "236736555192",
    appId: "1:236736555192:web:9d7e5a0fabe37f37faac4d",
    measurementId: "G-WQNDKRFSE7"
};
    
    firebase.initializeApp(firebaseConfig);
    
export default firebase; 