function setupNavigation() {
    const user = getCurrentUser();
    const navLinks = document.getElementById('navLinks');
    const mainNav = document.getElementById('mainNav');
    
    if (!user) return;
    
    if (user.role === 'admin') {
        mainNav.classList.remove('user-nav');
        mainNav.classList.add('admin-nav');
        
        const currentPage = window.location.pathname.split('/').pop();
        
        navLinks.innerHTML = `
            <a href="admin.html" ${currentPage === 'admin.html' ? 'class="active"' : ''}>📊 Dashboard</a>
            <a href="about.html" ${currentPage === 'about.html' ? 'class="active"' : ''}>👥 About</a>
            <a href="settings.html" ${currentPage === 'settings.html' ? 'class="active"' : ''}>⚙️ Settings</a>
            <button class="btn btn-outline-light" onclick="logout()">🚪 Logout</button>
        `;
    } else {
        const currentPage = window.location.pathname.split('/').pop();
        
        navLinks.innerHTML = `
            <a href="home.html" ${currentPage === 'home.html' ? 'class="active"' : ''}>🏠 Home</a>
            <a href="submit.html" ${currentPage === 'submit.html' ? 'class="active"' : ''}>➕ Submit Ticket</a>
            <a href="my-tickets.html" ${currentPage === 'my-tickets.html' ? 'class="active"' : ''}>🎫 My Tickets</a>
            <a href="room-calendar.html" ${currentPage === 'room-calendar.html' ? 'class="active"' : ''}>📅 Room Calendar</a>
            <a href="about.html" ${currentPage === 'about.html' ? 'class="active"' : ''}>👥 About</a>
            <a href="settings.html" ${currentPage === 'settings.html' ? 'class="active"' : ''}>⚙️ Settings</a>
            <button class="btn btn-outline-light" onclick="logout()">🚪 Logout</button>
        `;
    }
}