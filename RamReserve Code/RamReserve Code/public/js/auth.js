// Authentication management
const AUTH_KEY = 'ramreserve_user';

function getCurrentUser() {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return null;
        }
    }
    return null;
}

function setCurrentUser(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = 'index.html';
}

function checkAuth(requireAdmin = false) {
    const user = getCurrentUser();
    
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
    
    if (requireAdmin && user.role !== 'admin') {
        window.location.href = 'home.html';
        return;
    }
}