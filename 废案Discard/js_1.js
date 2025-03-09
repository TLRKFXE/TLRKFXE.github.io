// main.js
document.addEventListener('DOMContentLoaded', () => {
    // 鼠标跟随效果
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);

    document.addEventListener('mousemove', (e) => {
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
        
        const img = document.querySelector('.content img');
        const rect = img.getBoundingClientRect();
        const centerX = rect.left + rect.width/2;
        const centerY = rect.top + rect.height/2;
        const rotateX = (e.clientY - centerY) * 0.03;
        const rotateY = (centerX - e.clientX) * 0.03;
        img.style.transform = `scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // 点击动画效果
    document.getElementById('mainImage').addEventListener('click', function(e) {
        e.preventDefault();
        const img = this.querySelector('img');
        img.classList.add('jump-animation');
        setTimeout(() => {
            window.location.href = this.href;
        }, 800);
    });

    /* // 音效播放
    const sounds = ['mickey_laugh1.mp3', 'mickey_laugh2.mp3'];
    document.querySelector('.content img').addEventListener('click', () => {
        const audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
        audio.play();
    }); */
});