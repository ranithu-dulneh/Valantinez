document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const emojiContainer = document.getElementById('emoji-container');

    let noClickCount = 0;
    const noTexts = [
        "Are you sure",
        "I know you want to say Yes",
        "Do not press me like things"
    ];

    let currentFontSize = 20; // Initial font size in px
    let currentPaddingv = 10; // Initial vertical padding
    let currentPaddingh = 20; // Initial horizontal padding

    noBtn.addEventListener('click', () => {
        noClickCount++;

        // Change text
        // Use modulo to cycle through texts
        const textIndex = (noClickCount - 1) % noTexts.length;
        noBtn.textContent = noTexts[textIndex];

        // Increase Yes button size
        const scaleFactor = 1.2;
        currentFontSize *= scaleFactor;
        currentPaddingv *= scaleFactor;
        currentPaddingh *= scaleFactor;

        yesBtn.style.fontSize = `${currentFontSize}px`;
        yesBtn.style.padding = `${currentPaddingv}px ${currentPaddingh}px`;

        // Decrease No button size
        const shrinkFactor = 0.8;
        const currentNoFontSize = parseFloat(window.getComputedStyle(noBtn).fontSize);
        const currentNoPaddingv = parseFloat(window.getComputedStyle(noBtn).paddingTop);
        const currentNoPaddingh = parseFloat(window.getComputedStyle(noBtn).paddingRight);

        noBtn.style.fontSize = `${currentNoFontSize * shrinkFactor}px`;
        noBtn.style.padding = `${currentNoPaddingv * shrinkFactor}px ${currentNoPaddingh * shrinkFactor}px`;


        // Check if clicks >= 7
        if (noClickCount >= 7) {
            yesBtn.style.position = 'fixed';
            yesBtn.style.top = '0';
            yesBtn.style.left = '0';
            yesBtn.style.width = '100vw';
            yesBtn.style.height = '100vh';
            yesBtn.style.zIndex = '100';
            yesBtn.style.fontSize = '5rem';
            yesBtn.style.display = 'flex';
            yesBtn.style.justifyContent = 'center';
            yesBtn.style.alignItems = 'center';
            // Hide No button when Yes covers screen
            noBtn.style.display = 'none';
        }
    });

    yesBtn.addEventListener('click', () => {
        window.location.href = "https://wa.me/0725571648?text=Yes%20I'll%20be%20your%20valantine";
    });

    // Floating Emojis
    const emojis = ['❤️', '💖', '💘', '💝', '😍', '😘', '🥰', '💕', '💞', '💓'];

    function createFloatingEmoji() {
        const emoji = document.createElement('div');
        emoji.classList.add('floating-emoji');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const randomLeft = Math.random() * 100;
        const randomDuration = Math.random() * 3 + 2; // 2 to 5 seconds
        const randomSize = Math.random() * 20 + 20; // 20 to 40px

        emoji.style.left = `${randomLeft}vw`;
        emoji.style.animationDuration = `${randomDuration}s`;
        emoji.style.fontSize = `${randomSize}px`;

        emojiContainer.appendChild(emoji);

        // Remove element after animation finishes
        setTimeout(() => {
            emoji.remove();
        }, randomDuration * 1000);
    }

    setInterval(createFloatingEmoji, 300);
});
