import { setToken } from './auth.js';
import { API_BASE_URL } from './config.js';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    try {
        const res = await fetch(`${API_BASE_URL}/api/users/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            credentials: 'include',
            body: params
        });

        if (!res.ok) {
            const data = await res.json();
            errorMsg.textContent = data.detail || 'Login failed. Please check your credentials.';
            errorMsg.style.display = 'block';
            return;
        }

        const data = await res.json();
        if (data.access_token) {
            setToken(data.access_token);
            window.location.href = '/dashboard.html';
        }
    } catch (err) {
        errorMsg.textContent = 'Network error. Cannot reach server.';
        errorMsg.style.display = 'block';
    }
});
