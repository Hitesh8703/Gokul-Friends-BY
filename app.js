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

let userXP = {};

function login() {
  const username = document.getElementById("username").value.trim();
  const passkey = document.getElementById("passkey").value.trim();

  if (validUsers[username] === passkey) {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("chat-section").style.display = "block";
    if (!userXP[username]) userXP[username] = 0;
    updateXP(username, 10);
  } else {
    alert("Invalid login ID or passkey.");
  }
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const message = input.value.trim();

  if (message) {
    const chatBox = document.getElementById("chat-box");
    const p = document.createElement("p");
    p.textContent = message;
    chatBox.appendChild(p);
    input.value = "";

    const username = document.getElementById("username").value.trim();
    updateXP(username, 5);
  }
}

function updateXP(user, points) {
  userXP[user] += points;
  document.getElementById("xp-display").textContent = "XP: " + userXP[user];
}
