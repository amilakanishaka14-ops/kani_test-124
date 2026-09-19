// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your web app's Firebase configuration (Replace with actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "pentube-os.firebaseapp.com",
  projectId: "pentube-os",
  storageBucket: "pentube-os.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// Listen for Auth State
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    console.log("Logged in:", user.email);
    // Role Check for Admin Panel
    if(user.displayName === "Amila Kanishka" && window.location.pathname.includes('admin.html')) {
        document.getElementById('adminPanel').classList.remove('hidden');
    }
  } else {
    currentUser = null;
    if(window.location.pathname.includes('dashboard.html') || window.location.pathname.includes('admin.html')) {
        window.location.href = 'auth.html';
    }
  }
});

// Global Function to save to Creator Vault
window.saveToVault = async (data) => {
    if (!currentUser) return console.log("User not logged in. Result not saved to vault.");
    try {
        await addDoc(collection(db, "creator_vault", currentUser.uid, "history"), data);
        console.log("Saved to Vault securely.");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};