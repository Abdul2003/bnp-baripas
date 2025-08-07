import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
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

const cardNumber = document.querySelector("#number");
const cvv = document.querySelector("#cvv");
const expiryDate = document.querySelector("#expiry");
const checkingBalance = document.querySelector("#checking-balance");
const savingsBalance = document.querySelector("#savings-balance");
const creditBalance = document.querySelector("#credit-balance");
const subBalance = document.querySelector("#sub-balance");
const checkingEnd = document.querySelector("#checkingEnd");
const savingsEnd = document.querySelector("#savingsEnd");
const creditEnd = document.querySelector("#creditEnd");
const username = document.querySelector("#user-name");
const fullName = document.querySelector("#full-name");
const cardBtn = document.querySelector("#flipCardBtn");
const cardBtn2 = document.querySelector("#flipCardBtn2");
const card = document.querySelector(".flip-card-inner");
const cardType = document.querySelector("#cardType");
const accNumber = document.querySelector("#accNumber");
const accountStatus = document.querySelector("#accountStatus");
const routingNumber = document.querySelector("#routingNumber");

//flip card

//GET USER INFO

onAuthStateChanged(auth, async (user) => {
  const userDocRef = doc(db, "Users", user.email);
  const userDocSnap = await getDoc(userDocRef);
  const transactionDocRef = doc(db, "Transactions", user.email);
  const transactionDocSnap = await getDoc(transactionDocRef);

  console.log(user.email);

  if (userDocSnap.exists()) {
    console.log("Document data:", userDocSnap.data());
    checkingBalance.innerHTML = userDocSnap.data().checkingBalance;
    savingsBalance.innerHTML = userDocSnap.data().savingsBalance;
    creditBalance.innerHTML = userDocSnap.data().creditBalance;
    checkingEnd.innerHTML = userDocSnap.data().checkingEnd;
    savingsEnd.innerHTML = userDocSnap.data().savingsEnd;
    creditEnd.innerHTML = userDocSnap.data().creditcardEnd;
    username.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;

    console.log(userDocSnap.data().number);

    if (userDocSnap.data().number == undefined) {
      cardBtn.id = "atmBtn";
      cardBtn.innerHTML = "REQUEST ATM";
      console.log("should add id");
    }

    if (userDocSnap.data().accountStatus == "ON HOLD") {
      accountStatus.style.color = "rgb(230, 230, 16)";
    } else if (userDocSnap.data().accountStatus == "ACTIVE") {
      accountStatus.style.color = "rgb(17, 217, 37)";
    }
    if (userDocSnap.data().number != undefined) {
      cardBtn.id = "flipCardBtn";
      cardBtn.innerHTML = "SHOW ATM";
      var bool = false;
      cardBtn.addEventListener("click", (e) => {
        e.preventDefault();

        console.log(bool);

        if (bool == true) {
          cardNumber.innerHTML = "****************";
          cvv.innerHTML = "****";
          expiryDate.innerHTML = "****";
          fullName.innerHTML = "****";
          cardBtn.innerHTML = "SHOW ATM";
          bool = false;
        } else {
          cardNumber.innerHTML = userDocSnap.data().number;
          cvv.innerHTML = userDocSnap.data().cvv;
          cardType.innerHTML = userDocSnap.data().cardType;
          expiryDate.innerHTML = `${userDocSnap.data().expiryMonth}/${
            userDocSnap.data().expiryYear
          }`;
          fullName.innerHTML =
            userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
          cardBtn.innerHTML = "HIDE ATM";
          bool = true;
        }
      });
    } else {
    }
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  if (transactionDocSnap.exists()) {
    if (transactionDocSnap.data().Transaction != undefined) {
      transactionDocSnap
        .data()
        .Transaction.reverse()
        .map((item) => {
          console.log(transactionDocSnap.data().Transaction);

          const parentDiv = document.querySelector(".last-transactions");
          const transactionItem = document.createElement("div");
          transactionItem.classList.add("transaction-item");
          const amount = document.createElement("span");
          amount.innerHTML = "$" + item.amount;
          const beneficiary = document.createElement("span");
          beneficiary.classList.add("text-muted");
          beneficiary.innerHTML = item.transferDirection + " " + item.name;
          const date = document.createElement("span");
          date.classList.add("text-muted");
          date.innerHTML = item.date;
          const status = document.createElement("span");
          status.innerHTML = item.status;

          if (item.status == "Pending") {
            status.style.color = "rgb(230, 230, 16)";
          } else if (item.status == "Failed") {
            status.style.color = "rgb(217, 34, 17)";
          } else if (item.status == "Successful") {
            status.style.color = "rgb(17, 217, 37)";
          }
          transactionItem.appendChild(amount);
          transactionItem.appendChild(beneficiary);
          transactionItem.appendChild(date);
          transactionItem.appendChild(status);
          parentDiv.appendChild(transactionItem);
        });
    } else {
      console.log("transaction document data doesnt exist");
    }
  }
  const atmBtn = document.querySelector("#atmBtn");
  atmBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const db = getFirestore(app);
    const docRef = doc(db, "Users", user.email);
    const docSnap = await getDoc(docRef);

    const number = Math.floor(
      1000000000000000 + Math.random() * 9000000000000000
    );
    const cvv = Math.floor(100 + Math.random() * 900);
    var expMonth = Math.floor(Math.random() * (13 - 1) + 1);
    const expYear = Math.floor(Math.random() * (2030 - 2025) + 2025);

    const numberString = number.toString();
    const cvvString = cvv.toString();
    var expMonthString = expMonth.toString();
    const expYearString = expYear.toString();

    expMonth < 10 ? (expMonthString = `0${expMonth}`) : (expMonth = expMonth);
    if (docSnap.exists()) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "ATM Requested Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      updateDoc(docRef, {
        number: numberString,
        cvv: cvvString,
        expiryMonth: expMonthString,
        expiryYear: expYearString,
        cardType: "Mastercard",
      });
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "User Not Found",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });
});

//Logout
const logOut = document.querySelector("#logout");
logOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.href = "../index.html";
});
