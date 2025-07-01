// signup.js

// ✅ Import Firebase modules from CDN (Only import once!)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAtZvwFh66M2s_RiPFNCgyqXXx5mYFgdM",
  authDomain: "loginpage-26ca2.firebaseapp.com",
  projectId: "loginpage-26ca2",
  storageBucket: "loginpage-26ca2.appspot.com",
  messagingSenderId: "187032456616",
  appId: "1:187032456616:web:aa0bc8661b4d925641a19d"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Wait until DOM is loaded
window.addEventListener("DOMContentLoaded", () => {
  const signupBtn = document.getElementById("signup-submit");

  if (!signupBtn) {
    console.error("Button with ID 'signup-submit' not found!");
    return;
  }

  signupBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const email = document.getElementById("signup-email")?.value;
    const password = document.getElementById("signup-password")?.value;
    const name = document.getElementById("signup-name")?.value;

    if (!email || !password || !name) {
      alert("Please enter full name, email, and password.");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // ✅ Update displayName with full name
        return updateProfile(user, {
          displayName: name
        }).then(() => {
          // ✅ Optionally store in localStorage
          localStorage.setItem("username", name);

          console.log("User signed up:", user.email);
          alert("Signup successful!");
          window.location.href = "grand.html"; // ✅ Redirect if needed
        });
      })
      .catch((error) => {
        console.error("Error:", error.code, error.message);
        alert("Signup failed: " + error.message);
      });
  });
});
