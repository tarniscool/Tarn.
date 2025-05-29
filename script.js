async function fetchDiscordAvatar() {
    const userId = '1356994686384079108';
    const avatarElement = document.getElementById('discord-avatar');

    if (!avatarElement) {
        console.error('Discord avatar element not found.');
        return;
    }

    try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        if (!response.ok) {
            throw new Error(`Lanyard API request failed: ${response.status}`);
        }
        const data = await response.json();

        if (data.success && data.data.discord_user && data.data.discord_user.avatar) {
            const avatarHash = data.data.discord_user.avatar;
            const isAnimated = avatarHash.startsWith('a_');
            const extension = isAnimated ? 'gif' : 'png';
            const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${avatarHash}.${extension}?size=256`;
            avatarElement.src = avatarUrl;
        } else if (data.success && data.data.discord_user) {
            console.log('User has no custom Discord avatar or Lanyard did not return avatar hash.');
        } else {
            console.error('Failed to fetch Discord avatar from Lanyard:', data);
        }
    } catch (error) {
        console.error('Error fetching Discord avatar:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    const pulseSlow = document.querySelector('.animate-pulse-slow');
    const pulseSlower = document.querySelector('.animate-pulse-slower');
    if (pulseSlow) {
        pulseSlow.style.animation = 'pulse 6s infinite ease-in-out';
    }
    if (pulseSlower) {
        pulseSlower.style.animation = 'pulse 8s infinite ease-in-out';
    }

    fetchDiscordAvatar();
});
