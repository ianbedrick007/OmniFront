// Chat V2 Logic
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const sendBtn = document.getElementById('send-btn');
const emptyState = document.getElementById('chat-empty-state');

export function appendMessage(text, sender) {
    if (emptyState) {
        emptyState.style.display = 'none';
    }

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-v2-msg ${sender}`;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
    <div class="chat-v2-bubble">
        ${text.replace(/\n/g, '<br>')}
    </div>
    <div class="chat-v2-meta">
        ${sender.toUpperCase()} | ${timestamp}
    </div>
`;

    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

if (chatForm) {
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user');
        userInput.value = '';

        sendBtn.disabled = true;

        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'chat-v2-msg bot';
        loadingDiv.id = 'loading-indicator';
        loadingDiv.innerHTML = '<div class="chat-v2-bubble opacity-50">Sychronizing neural networks...</div>';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            // Updated to reflect standard API endpoints
            const resp = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const indicator = document.getElementById('loading-indicator');
            if (indicator) indicator.remove();

            if (resp.ok) {
                const data = await resp.json();
                appendMessage(data.response, 'bot');
            } else {
                appendMessage("CRITICAL ERROR: FAILED TO COMMUNICATE WITH AI CORE.", 'bot');
            }
        } catch (err) {
            const indicator = document.getElementById('loading-indicator');
            if (indicator) indicator.remove();
            appendMessage("CONNECTION INTERRUPTED: CHECK NETWORK PROTOCOLS.", 'bot');
            console.error(err);
        } finally {
            sendBtn.disabled = false;
        }
    });
}

window.clearSession = async () => {
    if (!confirm('CONFIRM SESSION CLEARANCE? ALL CONSOLE HISTORY WILL BE PURGED.')) return;

    try {
        await fetch('/clear-session', { method: 'POST' });
        location.reload();
    } catch (err) {
        console.error('Purge failed:', err);
    }
}
