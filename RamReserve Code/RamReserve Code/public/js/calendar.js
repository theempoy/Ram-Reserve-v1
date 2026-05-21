let selectedRoomNumber = '204';

async function loadCalendar() {
    await renderCalendar();
    await renderReservations();
}

function selectRoom(roomNumber) {
    selectedRoomNumber = roomNumber;
    
    // Update buttons
    document.querySelectorAll('.room-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update room number displays
    document.getElementById('selectedRoom').textContent = roomNumber;
    document.getElementById('selectedRoomReservations').textContent = roomNumber;
    
    renderCalendar();
    renderReservations();
}

async function renderCalendar() {
    const tickets = await getTickets();
    const calendarGrid = document.getElementById('calendarGrid');
    
    // Get approved room reservations
    const roomReservations = tickets.filter(t => 
        t.department === 'BMO' && 
        t.itemType.startsWith('room-') && 
        t.status === 'approved'
    );
    
    // Generate next 14 days
    const days = [];
    for (let i = 0; i < 14; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        days.push(date);
    }
    
    calendarGrid.innerHTML = days.map(date => {
        const dateString = date.toISOString().split('T')[0];
        const isReserved = roomReservations.some(t => 
            t.itemType === `room-${selectedRoomNumber}` && 
            t.date === dateString
        );
        
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dayNumber = date.getDate();
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        return `
            <div class="calendar-day ${isReserved ? 'reserved' : 'available'}">
                <div class="day-name">${dayName}</div>
                <div class="day-number">${dayNumber}</div>
                <div class="day-month">${monthName}</div>
                <div class="day-status">${isReserved ? 'Reserved' : 'Available'}</div>
            </div>
        `;
    }).join('');
}

async function renderReservations() {
    const tickets = await getTickets();
    const reservationsList = document.getElementById('reservationsList');
    
    const roomReservations = tickets.filter(t => 
        t.department === 'BMO' && 
        t.itemType === `room-${selectedRoomNumber}` && 
        t.status === 'approved'
    );
    
    if (roomReservations.length === 0) {
        reservationsList.innerHTML = `
            <div class="empty-state" style="padding: 2rem;">
                No approved reservations for this room
            </div>
        `;
        return;
    }
    
    reservationsList.innerHTML = roomReservations.map(reservation => `
        <div style="display: flex; align-items: center; justify-between; padding: 1rem; background: linear-gradient(to right, #fce7f3, #fbcfe8); border: 2px solid #f9a8d4; border-radius: 0.75rem; margin-bottom: 0.75rem;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 2.5rem; height: 2.5rem; background: linear-gradient(135deg, #ec4899, #f43f5e); border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    📅
                </div>
                <div>
                    <div style="font-weight: 600; color: var(--gray-900);">${formatDate(reservation.date)}</div>
                    <div style="font-size: 0.875rem; color: var(--gray-700);">${reservation.time} • ${formatItemType(reservation.duration)}</div>
                </div>
            </div>
            <div style="text-align: right;">
                <div style="font-weight: 600; color: var(--gray-900);">${reservation.requestedBy}</div>
                <div style="font-size: 0.875rem; color: var(--gray-600);">${reservation.purpose.substring(0, 50)}...</div>
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
        month: 'short',
        day: 'numeric'
    });
}