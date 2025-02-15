export function initProfile(BACKEND_URL) {
    const profileIcon = document.getElementById('profile-icon');
    const profilePopup = document.getElementById('profile-popup');
    const profileInitials = document.getElementById('profile-initials');

    profileIcon.addEventListener('mouseenter', () => {
        profileIcon.style.transform = 'scale(1.1)';
        profileIcon.style.transition = 'transform 0.2s ease';
    });

    profileIcon.addEventListener('mouseleave', () => {
        profileIcon.style.transform = 'scale(1)';
    });

    const username = localStorage.getItem('username');
    if (username && profileInitials) {
        profileInitials.textContent = getInitials(username);
        profileIcon.style.backgroundColor = stringToColor(username);
    }

    profileIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        profilePopup.classList.toggle('hidden');

        const popupUsername = document.getElementById('popup-username');
        const popupEmail = document.getElementById('popup-email');
        popupUsername.textContent = localStorage.getItem('username') || '';
        popupEmail.textContent = localStorage.getItem('email') || '';
    });

    document.addEventListener('click', (e) => {
        if (!profilePopup.contains(e.target) && !profileIcon.contains(e.target)) {
            profilePopup.classList.add('hidden');
        }
    });

    const popupLogout = document.getElementById('popup-logout');
    popupLogout.addEventListener('click', async () => {
        const username = localStorage.getItem('username');
        if (!username) {
            window.location.href = '/login';
            return;
        }
        try {
            const response = await fetch(`${BACKEND_URL}/api/logout`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });
            const data = await response.json();
            if (data.success) {
                localStorage.removeItem('username');
                localStorage.removeItem('email');
                window.location.href = '/login';
            } else {
                alert(data.message || 'Logout failed.');
            }
        } catch (error) {
            console.error(error);
            alert('Error during logout.');
        }
    });
}

function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += ('00' + value.toString(16)).slice(-2);
    }
    return color;
}

function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
}