import React from 'react'
import { auth } from '../firebase/config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
}

export function logOut() {
    return signOut(auth);
}

export function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
}