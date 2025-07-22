let token = null;

async function register() {
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPass').value;
  await fetch('http://localhost:3000/api/register', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  });
  alert('Registered! Now log in.');
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPass').value;
  const response = await fetch('http://localhost:3000/api/login', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  token = data.token;
  document.getElementById('auth').style.display = 'none';
  document.getElementById('capsule').style.display = 'block';
  loadMessages();
}

async function sendMessage() {
  const content = document.getElementById('message').value;
  const unlock_date = document.getElementById('unlockDate').value;
  await fetch('http://192.168.119.71:3000/api/message', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ content, unlock_date })
  });
  alert('Message saved!');
  loadMessages();
}

async function loadMessages() {
  const list = document.getElementById('messagesList');
  list.innerHTML = '';
  const res = await fetch('http://localhost:3000/api/messages', {
    headers: { 'Authorization': 'Bearer ' + token }
  });
  const messages = await res.json();
  messages.forEach(msg => {
    const li = document.createElement('li');
    li.textContent = `${msg.content} (Unlocked at: ${new Date(msg.unlock_date).toLocaleString()})`;
    list.appendChild(li);

    if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('✅ Service Worker registered');
    }).catch((error) => {
      console.error('❌ Service Worker registration failed:', error);
    });
  });
}

  });
}
