// API base URL
const API_BASE = 'http://localhost:3000/api';

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Login API
async function loginAPI(email, password, role) {
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, role })
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Connection error' };
    }
}

// Get all tickets
async function getTickets() {
    try {
        const response = await fetch(`${API_BASE}/tickets`);
        const data = await response.json();
        return data.tickets || [];
    } catch (error) {
        console.error('Get tickets error:', error);
        return [];
    }
}

// Create ticket
async function createTicket(ticketData) {
    try {
        const response = await fetch(`${API_BASE}/tickets`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        });
        
        const data = await response.json();
        return data.ticket;
    } catch (error) {
        console.error('Create ticket error:', error);
        throw error;
    }
}

// Update ticket status
async function updateTicketStatus(ticketId, status) {
    try {
        const response = await fetch(`${API_BASE}/tickets/${ticketId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        return data.ticket;
    } catch (error) {
        console.error('Update ticket error:', error);
        throw error;
    }
}