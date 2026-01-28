const socket = io("http://localhost:5001");

const loginDiv = document.getElementById("login");
const chatDiv = document.getElementById("chat");
const messagesDiv = document.getElementById("messages");
const userDisplay = document.getElementById("userDisplay");
const messageInput = document.getElementById("messageInput");

let currentUsername = "";

function joinChat() {
  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Please enter a username");
    return;
  }

  currentUsername = username;
  socket.emit("join", username);

  loginDiv.classList.add("hidden");
  chatDiv.classList.remove("hidden");
  userDisplay.textContent = `Logged in as ${username}`;
  messageInput.focus();
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  socket.emit("sendMessage", text);
  messageInput.value = "";
  messageInput.focus();
}

function handleKeyPress(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

// Display incoming messages
socket.on("message", (data) => {
  displayMessage(data.user, data.text, data.user === currentUsername);
  autoScroll();
});

// Display system messages
socket.on("userJoined", (username) => {
  displaySystemMessage(`${username} joined the chat`);
  autoScroll();
});

socket.on("userLeft", (username) => {
  displaySystemMessage(`${username} left the chat`);
  autoScroll();
});

function displayMessage(username, text, isSender) {
  const messageGroup = document.createElement("div");
  messageGroup.className = `message-group ${isSender ? "sender" : "receiver"}`;

  if (!isSender) {
    const senderName = document.createElement("div");
    senderName.className = "message-sender";
    senderName.textContent = username;
    messageGroup.appendChild(senderName);
  }

  const messageBubble = document.createElement("div");
  messageBubble.className = "message-bubble";
  messageBubble.textContent = text;
  
  messageGroup.appendChild(messageBubble);
  messagesDiv.appendChild(messageGroup);
}

function displaySystemMessage(text) {
  const messageGroup = document.createElement("div");
  messageGroup.className = "message-group system";

  const messageBubble = document.createElement("div");
  messageBubble.className = "message-bubble system";
  messageBubble.textContent = text;

  messageGroup.appendChild(messageBubble);
  messagesDiv.appendChild(messageGroup);
}

function autoScroll() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
