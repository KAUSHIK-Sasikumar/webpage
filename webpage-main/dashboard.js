// Import Firebase (for module-based or CDN use with <script> tags in HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

// Your Firebase config
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
const db = getFirestore(app);

// UI Element references
const openSidebar = document.getElementById("openSidebar");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.querySelector(".sidebar");
const orderModal = document.getElementById("addOrderModal");
const orderTableBody = document.getElementById("orderTableBody");

openSidebar?.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar?.addEventListener("click", () => sidebar.classList.remove("active"));

window.openOrderModal = () => {
  orderModal.classList.remove("hidden");
  orderModal.classList.add("flex");
};

window.closeOrderModal = () => {
  orderModal.classList.remove("flex");
  orderModal.classList.add("hidden");
};

window.saveOrder = async () => {
  const name = document.getElementById("customerName").value;
  const amount = document.getElementById("orderAmount").value;
  const status = document.getElementById("orderStatus").value;

  if (!name || !amount) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Save to Firestore
    const docRef = await addDoc(collection(db, "orders"), {
      customerName: name,
      amount: parseFloat(amount),
      status: status,
      createdAt: Timestamp.now()
    });

    // Show in table (temporarily)
    const row = document.createElement("tr");
    row.classList.add("border-t");
    row.innerHTML = `
      <td class="px-4 py-2">${docRef.id}</td>
      <td class="px-4 py-2">${name}</td>
      <td class="px-4 py-2">${new Date().toLocaleDateString()}</td>
      <td class="px-4 py-2">$${amount}</td>
      <td class="px-4 py-2">${status}</td>
      <td class="px-4 py-2">
        <button class="text-indigo-600 text-sm mr-2" onclick="alert('Viewing order for ${name}')">View</button>
        <button class="text-yellow-600 text-sm" onclick="alert('Editing order for ${name}')">Edit</button>
      </td>
    `;
    orderTableBody.appendChild(row);
    closeOrderModal();
  } catch (error) {
    console.error("Error adding order: ", error);
    alert("Failed to save order.");
  }
};
