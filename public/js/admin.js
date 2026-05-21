async function loadAdminTickets() {
    const tickets = await getTickets();
    
    // Update stats
    const pending = tickets.filter(t => t.status === 'pending');
    const approved = tickets.filter(t => t.status === 'approved');
    const rejected = tickets.filter(t => t.status === 'rejected');
    
    document.getElementById('pendingCount').textContent = pending.length;
    document.getElementById('approvedCount').textContent = approved.length;
    document.getElementById('deniedCount').textContent = rejected.length;
    
    // Display tickets
    const ticketsList = document.getElementById('adminTicketsList');
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📄</div>
                <h3>No tickets submitted yet</h3>
                <p>Tickets will appear here once users submit reservation requests.</p>
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
                <div class="badge-dept ${ticket.department === 'IT' ? 'it' : 'bmo'}">
                    ${ticket.department === 'IT' ? 'IT Resource Office' : 'Business Management Office'}
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
            <div class="ticket-actions">
                <div class="ticket-id">Submitted on ${formatDate(ticket.createdAt)}</div>
                <div style="display: flex; gap: 0.75rem;">
                    ${ticket.status === 'pending' ? `
                        <button class="btn btn-primary" onclick="handleStatusUpdate('${ticket.id}', 'approved')" style="background: linear-gradient(to right, #10b981, #34d399);">
                            ✅ Approve
                        </button>
                        <button class="btn btn-primary" onclick="handleStatusUpdate('${ticket.id}', 'rejected')" style="background: linear-gradient(to right, #ef4444, #f87171);">
                            ❌ Reject
                        </button>
                    ` : `
                        <div class="badge-status ${ticket.status}">
                            ${ticket.status === 'approved' ? 'Approved' : 'Rejected'}
                        </div>
                    `}
                </div>
            </div>
        </div>
    `).join('');
}

async function handleStatusUpdate(ticketId, status) {
    try {
        await updateTicketStatus(ticketId, status);
        showToast(`Ticket ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
        await loadAdminTickets();
    } catch (error) {
        showToast('Failed to update ticket status. Please try again.', 'error');
    }
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