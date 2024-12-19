// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charArray = chars.split('');
const fontSize = 14;
const columns = width / fontSize;

const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Animate matrix effect
setInterval(drawMatrix, 33);

// Skill Progress Bars
const skillCards = document.querySelectorAll('.skill-progress');
skillCards.forEach(card => {
    const progress = card.getAttribute('data-progress');
    card.style.setProperty('--progress', `${progress}%`);
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AI Assistant Chat Widget
const aiToggle = document.querySelector('.ai-toggle');
const aiChat = document.querySelector('.ai-chat-container');
const closeChatBtn = document.querySelector('.close-chat');
const chatInput = document.querySelector('.ai-chat-input input');
const chatMessages = document.querySelector('.ai-chat-messages');
const sendButton = document.querySelector('.ai-chat-input button');

aiToggle.addEventListener('click', () => {
    aiChat.classList.add('active');
});

closeChatBtn.addEventListener('click', () => {
    aiChat.classList.remove('active');
});

// Simple AI Chat Function
function addMessage(message, isAi = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isAi ? 'ai' : 'user');
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message}
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle chat input
function handleChatInput() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message);
        chatInput.value = '';
        
        // Simulate AI response
        setTimeout(() => {
            addMessage("I'm an AI assistant. I can help you learn more about Shlok's work and experience.", true);
        }, 1000);
    }
}

sendButton.addEventListener('click', handleChatInput);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleChatInput();
    }
});

// Typing Animation for Headlines
function startTypingAnimation() {
    const text = "AI & Machine Learning Engineer";
    const typewriter = document.querySelector('.typewriter h2');
    typewriter.textContent = '';
    
    let charIndex = 0;
    function type() {
        if (charIndex < text.length) {
            typewriter.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
    }
    type();
}

// Start typing animation when page loads
document.addEventListener('DOMContentLoaded', startTypingAnimation);

// Parallax Effect for Profile Image
document.addEventListener('mousemove', (e) => {
    const profileContainer = document.querySelector('.profile-container');
    const { left, top, width, height } = profileContainer.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    profileContainer.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
    `;
});