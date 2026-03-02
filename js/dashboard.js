// Dashboard Javascript Logic
import { getCurrentUser } from './auth.js';
import { API_BASE_URL } from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Fetch user to verify login
    const user = await getCurrentUser();
    if (!user) {
        // Redirect to login if not authenticated
        // window.location.href = '/login.html'; // Uncomment this in real production
    } else {
        // Set user name if element exists
        const userProfile = document.querySelector('.user-profile span');
        if (userProfile) {
            userProfile.textContent = user.business?.name || user.username || 'Admin Console';
        }
    }

    // 2. We simulate fetching backend data (since Jinja used pure server-rendered objects)
    // Replace this URL `/api/v1/dashboard/stats` with your actual endpoint
    fetchDashboardData();
});

async function fetchDashboardData() {
    try {
        const token = localStorage.getItem('access_token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${API_BASE_URL}/api/v1/dashboard/stats`, { headers, credentials: 'include' });
        if (!res.ok) {
            console.error('Failed to fetch dashboard stats');
            // Mocking data for visual testing since API might not be running
            renderDashboard({
                ai_credits: 50000,
                products_count: 14,
                orders: [
                    { id: '10001', customer_name: 'TechFlow Inc.', amount: 499.00, status: 'completed' },
                    { id: '10002', customer_name: 'Acme Corp', amount: 1250.00, status: 'pending' },
                    { id: '10003', customer_name: 'Studio Design', amount: 99.50, status: 'completed' }
                ],
                payments: [
                    { reference: 'ch_1928373', amount: 499.00 },
                    { reference: 'ch_9827361', amount: 99.50 }
                ],
                payouts: [
                    { reference: 'po_09281', amount: 1520.00 }
                ],
                invoices: [
                    { id: '891', amount: 499.00, paid: true },
                    { id: '892', amount: 1250.00, paid: false }
                ]
            });
            return;
        }

        const data = await res.json();
        renderDashboard(data);
    } catch (err) {
        console.error('Error fetching dashboard data:', err);
    }
}

function renderDashboard(data) {
    // Top Stats
    document.getElementById('val-orders').textContent = data.orders?.length || 0;
    document.getElementById('val-payments').textContent = data.payments?.length || 0;
    document.getElementById('val-credits').textContent = data.ai_credits || 0;
    document.getElementById('val-products').textContent = data.products_count || 0;

    // Render Recent Orders Table
    const ordersBody = document.getElementById('orders-tbody');
    if (ordersBody && data.orders) {
        ordersBody.innerHTML = '';
        if (data.orders.length === 0) {
            ordersBody.innerHTML = `<tr><td colspan="4" style="text-align: center;">No orders yet</td></tr>`;
        } else {
            data.orders.slice(0, 5).forEach(order => {
                let badgeClass = 'badge badge-success'; // Defaults
                if (order.status === 'pending') badgeClass = 'badge badge-warning';
                if (order.status === 'failed') badgeClass = 'badge badge-error';

                ordersBody.innerHTML += `
                    <tr>
                        <td class="tech-font">#${order.id}</td>
                        <td>${order.customer_name || 'N/A'}</td>
                        <td class="tech-font">$${Number(order.amount).toFixed(2)}</td>
                        <td><span class="${badgeClass}">${order.status || 'unknown'}</span></td>
                    </tr>
                `;
            });
        }
    }

    // Render Recent Payments
    const paymentsList = document.getElementById('payments-list');
    if (paymentsList && data.payments) {
        paymentsList.innerHTML = data.payments.length === 0 ? '<div style="opacity: 0.5;">No payments recorded</div>' : '';
        data.payments.slice(0, 5).forEach(p => {
            paymentsList.innerHTML += `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.2rem; margin-bottom: 0.5rem;">
                    <span>${p.reference}</span>
                    <span style="color: #10B981;">+$${Number(p.amount).toFixed(2)}</span>
                </div>
            `;
        });
    }

    // Render Recent Payouts
    const payoutsList = document.getElementById('payouts-list');
    if (payoutsList && data.payouts) {
        payoutsList.innerHTML = data.payouts.length === 0 ? '<div style="opacity: 0.5;">No payouts recorded</div>' : '';
        data.payouts.slice(0, 5).forEach(p => {
            payoutsList.innerHTML += `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.2rem; margin-bottom: 0.5rem;">
                    <span>${p.reference}</span>
                    <span style="color: #3B82F6;">-$${Number(p.amount).toFixed(2)}</span>
                </div>
            `;
        });
    }

    // Render Recent Invoices
    const invoicesList = document.getElementById('invoices-list');
    if (invoicesList && data.invoices) {
        invoicesList.innerHTML = data.invoices.length === 0 ? '<div style="opacity: 0.5;">No invoices generated</div>' : '';
        data.invoices.slice(0, 5).forEach(inv => {
            invoicesList.innerHTML += `
                <div style="display: flex; justify-content: space-between; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 0.2rem; margin-bottom: 0.5rem;">
                    <span>INV-${inv.id}</span>
                    <span>$${Number(inv.amount).toFixed(2)} <span style="color: ${inv.paid ? '#10B981' : '#F59E0B'}">[${inv.paid ? 'PAID' : 'UNPAID'}]</span></span>
                </div>
            `;
        });
    }
}
