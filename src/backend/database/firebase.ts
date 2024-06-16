import { initializeApp } from 'firebase/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBTK5g7lPv3yy02J6WEC98i4KR3jePfSHo',
  authDomain: 'farmfare-3780b.firebaseapp.com',
  projectId: 'farmfare-3780b',
  storageBucket: 'farmfare-3780b.appspot.com',
  messagingSenderId: '524672762743',
  appId: '1:524672762743:web:c52fc8dda8d1aa9e5f5772',
  measurementId: 'G-54NPSTMZQF',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const firestore = getFirestore(app);

export {app, auth, db, firebase, firestore};