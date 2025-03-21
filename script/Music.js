// 新增背景音乐播放器

document.addEventListener('DOMContentLoaded', () => {
    // 音乐列表配置
    const musicList = [
        'audio/春岚.mp3',
        'audio/灰色轨迹.mp3',
        'audio/親愛なるあなたは火葬.mp3',
        'audio/Better Half.mp3',
        'audio/Never Meant.mp3',
        'audio/神様のヒマ潰し.mp3'
    ];

    // 随机选择音乐
    const getRandomMusic = () => {
        const randomIndex = Math.floor(Math.random() * musicList.length);
        return musicList[randomIndex];
    };

    // 初始化播放器
    const audio = document.getElementById('bgm');
    const musicBtn = document.getElementById('musicBtn');
    
    // 配置音频元素
    audio.loop = true;
    audio.muted = true; // 初始静音
    audio.src = getRandomMusic();

    // 自动播放逻辑
    const playMusic = () => {
        audio.play().catch(error => {
            console.log('自动播放被阻止，等待用户交互...');
        });
    };

    // 首次尝试播放
    playMusic();

    // 用户交互后解除静音
    const handleFirstInteraction = () => {
        audio.muted = false;
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    // 播放控制
    musicBtn.addEventListener('click', () => {
        audio.paused ? audio.play() : audio.pause();
        musicBtn.classList.toggle('playing');
    });

    // 状态反馈
    audio.addEventListener('play', () => {
        musicBtn.classList.add('playing');
        musicBtn.style.setProperty('--neon-color', '#f831a9');
    });

    audio.addEventListener('pause', () => {
        musicBtn.classList.remove('playing');
        musicBtn.style.setProperty('--neon-color', '#13FAED');
    });

    // 错误处理
    audio.addEventListener('error', () => {
        console.error('音乐加载失败，正在重试...');
        setTimeout(() => audio.src = getRandomMusic(), 3000);
    });
});


// 新增预加载逻辑（在音乐列表后添加）
const preloadMusic = () => {
    musicList.forEach(url => {
        new Audio(url).preload = 'metadata';
    });
};
preloadMusic();
