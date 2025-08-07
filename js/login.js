import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBF8ZzvxHc04fhiXIJo7IPo9GhfQ_GdKaU",
  authDomain: "bnp-paribas-4788a.firebaseapp.com",
  projectId: "bnp-paribas-4788a",
  storageBucket: "bnp-paribas-4788a.firebasestorage.app",
  messagingSenderId: "94200813028",
  appId: "1:94200813028:web:ad5f9fb97fbb625fde23f1",
  measurementId: "G-7R5LVHLTE5",
};

//send mail

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

//user login
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["username"].value;
  const password = loginForm["password"].value;
  const loginCode = Math.floor(1000 + Math.random() * 9000);
  const loginCodeString = loginCode.toString();
  function sendMail() {
    let params = {
      message: "Your Login Code Is " + loginCodeString,
      email: email,
    };
    emailjs
      .send("service_yh5kngj", "template_u18ot1b", params)
      .then(console.log("successful"))
      .catch((error) => console.log(error));
    console.log("email function ran");
  }
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // await sendMail();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        window.location = "../dashboard.html";
      }, 1500);
      loginForm.reset();
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
});
