// Page Navigation
function nextPage(pageNumber) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById('page' + pageNumber).classList.add('active');

    // Load message when reaching page 4
    if (pageNumber === 4) {
        loadBirthdayMessage();
    }
}

// Show Alert for Wrong Answers
function showAlert() {
    const alert = document.getElementById('alert');
    alert.style.display = 'block';

    // Add shake animation to wrong buttons
    const wrongButtons = document.querySelectorAll('.wrong-option');
    wrongButtons.forEach(btn => {
        btn.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
    });

    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000);
}

// Cake Cutting Function
function cutCake() {
    const cake = document.querySelector('.cake');
    cake.style.transform = 'scale(0.9)';
    cake.style.opacity = '0.7';
    cake.style.pointerEvents = 'none';

    // Extinguish flames
    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = 'none';
        flame.style.opacity = '0';
    });

    // Create cake cutting effect
    createConfetti();
    createSparkles();

    setTimeout(() => {
        nextPage(4);
    }, 2000);
}

// Load Birthday Message from Backend
async function loadBirthdayMessage() {
    try {
        const response = await fetch('/get_birthday_message');
        const data = await response.json();

        const messageContent = document.getElementById('messageContent');
        messageContent.innerHTML = '';

        // Split message into paragraphs and add typing effect
        const paragraphs = data.content.split('\n\n');
        paragraphs.forEach((paragraph, index) => {
            const p = document.createElement('p');
            messageContent.appendChild(p);
            typeWriter(p, paragraph, 30, index * 1000);
        });

    } catch (error) {
        console.error('Error loading message:', error);
        document.getElementById('messageContent').innerHTML =
            '<p>Error loading message. Please refresh the page.</p>';
    }
}

// Typewriter Effect
function typeWriter(element, text, speed, delay = 0) {
    setTimeout(() => {
        let i = 0;
        element.innerHTML = '';

        function typing() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }, delay);
}

// Confetti Effect
function createConfetti() {
    const colors = ['#ff6b6b', '#667eea', '#764ba2', '#ffde59', '#4CAF50', '#a1c4fd'];
    const emojis = ['🎉', '🎊', '✨', '💫', '🌟', '💖', '🎂', '🥳'];

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 20 + 15}px;
                top: -50px;
                left: ${Math.random() * 100}vw;
                animation: confettiFall linear forwards;
                animation-duration: ${Math.random() * 3 + 2}s;
                z-index: 1000;
                pointer-events: none;
            `;
            confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Sparkle Effect
function createSparkles() {
    for (let i = 0; i < 30; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: fixed;
            font-size: 1.5rem;
            top: 50%;
            left: 50%;
            animation: sparkleExplode linear forwards;
            animation-duration: 1.5s;
            z-index: 1000;
            pointer-events: none;
        `;
        sparkle.textContent = '✨';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

// Heart Animation
function createHearts() {
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.cssText = `
                position: fixed;
                font-size: 2rem;
                bottom: -50px;
                left: ${Math.random() * 100}vw;
                animation: heartRise linear forwards;
                animation-duration: ${Math.random() * 4 + 3}s;
                z-index: 1000;
                pointer-events: none;
            `;
            heart.textContent = '💖';
            heart.style.color = '#ff6b6b';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, i * 200);
    }
}

// Magic Effect
function createMagic() {
    createConfetti();
    createSparkles();
    createHearts();

    // Add twinkle to all doodles
    const doodles = document.querySelectorAll('.doodle');
    doodles.forEach(doodle => {
        doodle.style.animation = 'none';
        setTimeout(() => {
            doodle.style.animation = '';
        }, 1000);
    });
}

// Reset Experience
function resetExperience() {
    nextPage(1);

    // Reset cake
    const cake = document.querySelector('.cake');
    cake.style.transform = '';
    cake.style.opacity = '';
    cake.style.pointerEvents = '';

    const flames = document.querySelectorAll('.flame');
    flames.forEach(flame => {
        flame.style.animation = '';
        flame.style.opacity = '';
    });
}

// Music Player
const musicBtn = document.getElementById('musicBtn');
const birthdayMusic = document.getElementById('birthdayMusic');
let isPlaying = false;

musicBtn.addEventListener('click', function() {
    if (isPlaying) {
        birthdayMusic.pause();
        musicBtn.textContent = '🎵 Play Birthday Music';
    } else {
        birthdayMusic.play().catch(e => {
            console.log('Audio play failed:', e);
            musicBtn.textContent = '🎵 Click to Play';
        });
        musicBtn.textContent = '🔇 Pause Music';
    }
    isPlaying = !isPlaying;
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 360}deg);
            opacity: 0;
        }
    }

    @keyframes sparkleExplode {
        0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }

    @keyframes heartRise {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) scale(1.5);
            opacity: 0;
        }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Auto-start some animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createSparkles();
    }, 1000);
});