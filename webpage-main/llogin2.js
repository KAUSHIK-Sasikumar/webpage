// login.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAtZvwFh66M2s_RiPFNCgyqXXx5mYFgdM",
  authDomain: "loginpage-26ca2.firebaseapp.com",
  projectId: "loginpage-26ca2",
  storageBucket: "loginpage-26ca2.appspot.com",
  messagingSenderId: "187032456616",
  appId: "1:187032456616:web:aa0bc8661b4d925641a19d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// When DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("login-submit");

  if (!loginBtn) {
    console.error("Login button not found!");
    return;
  }

  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email")?.value;
    const password = document.getElementById("login-password")?.value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in as:", user.email);

        
        localStorage.setItem("username", user.displayName || user.email.split("@")[0]);

        alert("Login successful!");
        window.location.href = "grand.html";
      })
      .catch((error) => {
        console.error("Login failed:", error.message);
        alert("Login failed: " + error.message);
      });
  });
});
