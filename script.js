const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatBody = document.querySelector('.chat-body');
const modal = document.getElementById('auth-modal');
const authTitle = document.getElementById('auth-title');
const registerForm = document.getElementById('register-form');
const closeModalButton = document.querySelector('.modal-close');
const authSwitch = document.querySelector('.auth-switch a');
const modalTriggers = document.querySelectorAll('[data-open-auth]');
const toggleAuthLink = document.querySelector('[data-toggle-auth]');

const replies = [
  'Your welcome package is ready to unlock after verification.',
  'Our VIP team can help you set up a safer, faster deposit plan.',
  'The 150% match bonus is valid for your first deposit on selected games.',
  'Live dealers are available now for blackjack, roulette, and baccarat.',
  'We recommend starting with high-RTP slots before moving to tables.'
];

function addMessage(text, sender = 'agent') {
  const message = document.createElement('div');
  message.className = `chat-message chat-${sender}`;

  const bubble = document.createElement('span');
  bubble.textContent = text;
  message.appendChild(bubble);
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const input = chatInput.value.trim();
  if (!input) return;

  addMessage(input, 'user');
  chatInput.value = '';

  const reply = replies[Math.floor(Math.random() * replies.length)];
  window.setTimeout(() => addMessage(reply, 'agent'), 500);
});

function openAuth(mode = 'register') {
  const isRegister = mode === 'register';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  authTitle.textContent = isRegister ? 'Create account' : 'Welcome back';

  const form = document.getElementById('register-form');
  form.querySelector('button[type="submit"]').textContent = isRegister ? 'Sign up' : 'Log in';

  if (!isRegister) {
    const fullNameField = document.getElementById('fullName');
    const termsField = document.getElementById('terms');
    fullNameField.closest('.field-row').style.display = 'none';
    termsField.closest('.field-row').style.display = 'none';
  } else {
    document.getElementById('fullName').closest('.field-row').style.display = 'block';
    document.getElementById('terms').closest('.field-row').style.display = 'block';
  }
}

function closeAuth() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

modalTriggers.forEach((button) => {
  button.addEventListener('click', () => openAuth(button.dataset.openAuth));
});

closeModalButton.addEventListener('click', closeAuth);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeAuth();
});

authSwitch.addEventListener('click', (event) => {
  event.preventDefault();
  openAuth('login');
});

registerForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password || (!name && authTitle.textContent === 'Create account')) return;

  const userData = {
    name: name || 'VIP Member',
    email,
    password,
    createdAt: new Date().toISOString()
  };

  const existingUsers = JSON.parse(localStorage.getItem('luckyjack-users') || '[]');
  existingUsers.push(userData);
  localStorage.setItem('luckyjack-users', JSON.stringify(existingUsers));

  const welcomeMessage = `Welcome ${userData.name}! Your account is now active and your 150% bonus is ready.`;
  addMessage(welcomeMessage, 'agent');
  closeAuth();
  registerForm.reset();
});

const chatMinimize = document.querySelector('.chat-minimize');
chatMinimize.addEventListener('click', () => {
  const widget = document.querySelector('.chat-widget');
  widget.classList.toggle('collapsed');
  const body = document.querySelector('.chat-body');
  const form = document.querySelector('.chat-form');
  body.style.display = body.style.display === 'none' ? 'flex' : 'none';
  form.style.display = form.style.display === 'none' ? 'flex' : 'none';
});

// start with a welcome agent message
addMessage('Welcome to LuckyJack! Ready to unlock your first bonus?', 'agent');













































































