import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);

const transactionForm = document.getElementById("transactionFormBox");
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const db = getFirestore(app);
  const docRef = doc(db, "Transactions", user.email);
  const docSnap = await getDoc(docRef);
  transactionForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      transactionForm["beneficiaryAccount"].value == "" ||
      transactionForm["beneficiaryBank"].value == "" ||
      transactionForm["amount"].value == "" ||
      transactionForm["beneficiaryName"].value == "" ||
      transactionForm["recipientAddress"].value == "" ||
      transactionForm["bankAddress"].value == "" ||
      transactionForm["routingNumber"].value == "" ||
      transactionForm["swift"].value == "" ||
      transactionForm["currency"].value == "" ||
      transactionForm["transferPurpose"].value == ""
    ) {
      alert(`Empty Fields Not Allowed`);
    } else {
      var getDate = new Date();
      const account = transactionForm["beneficiaryAccount"].value;
      const name = transactionForm["beneficiaryName"].value;
      const bank = transactionForm["beneficiaryBank"].value;
      const amount = transactionForm["amount"].value;

      const recipientAddress = transactionForm["recipientAddress"].value;
      const bankAddress = transactionForm["bankAddress"].value;
      const routingNumber = transactionForm["routingNumber"].value;
      const swift = transactionForm["swift"].value;
      const currency = transactionForm["currency"].value;
      const transferPurpose = transactionForm["transferPurpose"].value;
      const recipientMessage = transactionForm["recipientMessage"].value;
      // if (docSnap.exists()) {
      updateDoc(docRef, {
        Transaction: arrayUnion({
          date: getDate.toLocaleString(),
          account: account,
          name: name,
          bank: bank,
          amount: amount,
          status: "Pending",
          recipientAddress: recipientAddress,
          bankAddress: bankAddress,
          routingNumber: routingNumber,
          swift: swift,
          currency: currency,
          transferPurpose: transferPurpose,
          recipientMessage: recipientMessage,
          transferType: "Wire Transfer",
          transferDirection: "To",
        }),
      });

      Swal.fire({
        title: "Pending",
        text: "Transaction Pending",
        icon: "warning",
      });
      transactionForm.reset();
    }
  });
});
