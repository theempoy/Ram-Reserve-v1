async function loadMyTickets() {
    const tickets = await getTickets();
    const ticketsList = document.getElementById('ticketsList');
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
                <h3>No tickets yet</h3>
                <p>You haven't submitted any reservation requests yet.</p>
                <a href="submit.html" class="btn btn-primary" style="margin-top: 1rem;">Submit Your First Request</a>
            </div>
        `;
        return;
    }
    
    ticketsList.innerHTML = tickets.map(ticket => `
        <div class="ticket-card">
            <div class="ticket-header">
                <div style="display: flex; gap: 1rem;">
                    <div class="ticket-icon" style="background: linear-gradient(135deg, ${ticket.department === 'IT' ? '#3b82f6, #06b6d4' : '#ec4899, #f43f5e'})">
                        ${ticket.department === 'IT' ? '💻' : '🏢'}
                    </div>
                    <div>
                        <h3>${formatItemType(ticket.itemType)}</h3>
                        <div class="ticket-id">Ticket ID: ${ticket.id}</div>
                    </div>
                </div>
                <div class="ticket-badges">
                    <div class="badge-dept ${ticket.department === 'IT' ? 'it' : 'bmo'}">
                        ${ticket.department === 'IT' ? 'IT Resource Office' : 'Business Management Office'}
                    </div>
                    <div class="badge-status ${ticket.status}">
                        ${ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </div>
                </div>
            </div>
            <div class="ticket-details">
                <div class="detail-item">
                    <div class="detail-label">👤 Requested By</div>
                    <div class="detail-value">${ticket.requestedBy}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">📧 Email</div>
                    <div class="detail-value">${ticket.email}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">📅 Date</div>
                    <div class="detail-value">${formatDate(ticket.date)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">🕐 Time & Duration</div>
                    <div class="detail-value">${ticket.time} • ${formatItemType(ticket.duration)}</div>
                </div>
            </div>
            <div style="padding-top: 1rem; border-top: 2px solid var(--border-color); margin-top: 1rem;">
                <div class="detail-label">📝 Purpose</div>
                <div class="detail-value">${ticket.purpose}</div>
            </div>
            <div class="ticket-id" style="margin-top: 1rem;">
                Submitted on ${formatDate(ticket.createdAt)}
            </div>
        </div>
    `).join('');
}

function formatItemType(type) {
    return type.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}