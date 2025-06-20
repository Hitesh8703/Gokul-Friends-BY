// STEP 1: Paste your Firebase config here 👇👇
const firebaseConfig = {
  apiKey: "AIzaSyAiDAaFTY9h6HaT2Mi0xH89_qgLj-OS4_I",
  authDomain: "gokul-friends.firebaseapp.com",
  databaseURL: "https://gokul-friends.firebaseapp.com",
  projectId: "gokul-friends",
  storageBucket: "gokul-friends.firebasestorage.app",
  messagingSenderId: "1028435383508",
  appId: "1:1028435383508:web:ca5821d1470c38c29b5741"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const validUsers = {
  "Hitesh": "12345",
  "Samarth": "23791",
  "Abhiraj": "43527",
  "Abhiram": "91820",
  "Abhay": "67213",
  "Chirag": "80291",
  "Sathwik": "14239",
  "Ayush": "56478"
};

let currentUser = "";
let userXP = {};

function login() {
  const username = document.getElementById("username").value.trim();
  const passkey = document.getElementById("passkey").value.trim();

  if (validUsers[username] === passkey) {
    currentUser = username;
    document.getElementById("login-section").style.display = "none";
    document.getElementById("chat-section").style.display = "block";
    if (!userXP[username]) userXP[username] = 0;
    updateXP(username, 10);
    listenForMessages();
  } else {
    alert("Invalid login ID or passkey.");
  }
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();
  if (message) {
    db.ref("groupChat").push({
      user: currentUser,
      message: message,
      timestamp: Date.now()
    });
    input.value = "";
    updateXP(currentUser, 5);
  }
}

function listenForMessages() {
  const chatBox = document.getElementById("chat-box");
  db.ref("groupChat").on("child_added", function(snapshot) {
    const data = snapshot.val();
    const p = document.createElement("p");
    p.innerHTML = `<strong>${data.user}:</strong> ${data.message}`;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

function updateXP(user, points) {
  userXP[user] += points;
  document.getElementById("xp-display").textContent = "XP: " + userXP[user];
}
