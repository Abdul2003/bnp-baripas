import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);
//User Signup
const signupForm = document.querySelector("#signupForm");
console.log(auth);
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  const confirmPassword = signupForm["confirmPassword"].value;
  const firstName = signupForm["first_name"].value;
  const lastName = signupForm["last_name"].value;
  const dob = signupForm["dob"].value;
  const iban = signupForm["iban"].value;
  const ssn = signupForm["ssn"].value;
  const maiden = signupForm["maiden"].value;
  const address = signupForm["address"].value;
  const country = signupForm["country"].value;
  const zip = signupForm["zip"].value;
  const city = signupForm["city"].value;
  const state = signupForm["state"].value;
  const phone = signupForm["phone"].value;
  const accountType = signupForm["accountType"].value;
  const accountNumber = signupForm["accountNumber"].value;
  const routingNumber = signupForm["routingNumber"].value;

  if (password.length < 6) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Password Should Be More Than 6 Characters",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (password != confirmPassword) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Password Doesnt Match",
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
        setDoc(doc(db, "Transactions", email), {});
        setDoc(doc(db, "Users", email), {
          firstName: firstName,
          lastName: lastName,
          dob: dob,
          iban: iban,
          ssn: ssn,
          maiden_name: maiden,
          address: address,
          country: country,
          city: city,
          state: state,
          zip: zip,
          phone: phone,
          accounType: accountType,
          accountNumber: accountNumber,
          routingNumber: routingNumber,
          checkingEnd: accountNumber.substr(accountNumber.length - 4),
          savingsEnd: "5678",
          creditcardEnd: "9012",
          accountStatus: "Pending",
          checkingBalance: "0",
          savingsBalance: "0",
          creditBalance: "0",
        }).then(function () {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function () {
            window.location = "../index.html";
          }, 1500);
          signupForm.reset();
        });
      })

      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  }
});
