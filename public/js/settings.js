function loadSettings() {
    // Load email notification settings
    const emailEnabled = localStorage.getItem('ramreserve_email_enabled') === 'true';
    const notificationEmail = localStorage.getItem('ramreserve_notification_email') || '';
    
    document.getElementById('emailEnabled').checked = emailEnabled;
    document.getElementById('notificationEmail').value = notificationEmail;
    
    if (emailEnabled) {
        document.getElementById('emailSettings').style.display = 'block';
    }
    
    // Update theme display
    updateThemeDisplay();
}

function toggleEmailSettings() {
    const enabled = document.getElementById('emailEnabled').checked;
    document.getElementById('emailSettings').style.display = enabled ? 'block' : 'none';
}

function saveNotificationSettings() {
    const emailEnabled = document.getElementById('emailEnabled').checked;
    const notificationEmail = document.getElementById('notificationEmail').value;
    
    localStorage.setItem('ramreserve_email_enabled', emailEnabled.toString());
    localStorage.setItem('ramreserve_notification_email', notificationEmail);
    
    showToast('Email preferences saved successfully!');
}

function switchSettingsTab(tab) {
    // Update tabs
    document.querySelectorAll('.settings-tab').forEach(tabBtn => {
        tabBtn.classList.toggle('active', tabBtn.onclick.toString().includes(tab));
    });
    
    // Update content
    document.getElementById('notificationsTab').style.display = tab === 'notifications' ? 'block' : 'none';
    document.getElementById('appearanceTab').style.display = tab === 'appearance' ? 'block' : 'none';
}

function updateThemeDisplay() {
    const currentTheme = getCurrentTheme();
    const themeIcon = document.getElementById('themeIcon');
    const themeTitle = document.getElementById('themeTitle');
    
    if (currentTheme === 'dark') {
        themeIcon.textContent = '🌙';
        themeTitle.innerHTML = '🌙 Theme Settings';
    } else {
        themeIcon.textContent = '☀️';
        themeTitle.innerHTML = '☀️ Theme Settings';
    }
    
    // Update active theme option
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
    });
    
    if (currentTheme === 'dark') {
        document.querySelector('.dark-theme').classList.add('active');
    } else {
        document.querySelector('.light-theme').classList.add('active');
    }
}