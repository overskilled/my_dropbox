import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBbgOjaA4KX3u73qO0Cs744eISn0TBwjHQ",
    authDomain: "dropbox-be88d.firebaseapp.com",
    projectId: "dropbox-be88d",
    storageBucket: "dropbox-be88d.appspot.com",
    messagingSenderId: "693479690890",
    appId: "1:693479690890:web:88a4dbc366514ef6101373",
    measurementId: "G-W4PSLRFRMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);