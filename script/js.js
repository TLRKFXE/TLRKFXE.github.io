// 配置对象
const config = {
    folderPath: 'img/background/',  // 图片目录路径
    imageNames: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg'], // 图片文件名
    interval: 5000,           // 切换间隔（毫秒）
    fadeDuration: 1000        // 过渡时间（毫秒）
};

class Slideshow {
    constructor(containerId, config) {
        this.container = document.getElementById(containerId);
        this.images = [];
        this.currentIndex = 0;
        this.timer = null;
        this.init(config);
    }

    async init(config) {
        // 显示加载动画
        this.showLoading();

        try {
            // 预加载图片
            await this.preloadImages(config);
            
            // 初始化轮播
            this.startSlideshow(config);
            
            // 隐藏加载动画
            this.hideLoading();
        } catch (error) {
            console.error('图片加载失败:', error);
            this.showError();
        }
    }

    showLoading() {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        this.container.appendChild(spinner);
    }

    hideLoading() {
        const spinner = this.container.querySelector('.loading-spinner');
        if (spinner) spinner.remove();
    }

    showError() {
        const errorMsg = document.createElement('div');
        errorMsg.style.color = 'white';
        errorMsg.textContent = '图片加载失败，请检查路径配置';
        this.container.appendChild(errorMsg);
    }

    async preloadImages({ folderPath, imageNames }) {
        const loadPromises = imageNames.map(name => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = folderPath + name;
                img.className = 'slide-image';
                img.alt = `背景图片 ${name}`;  // 增加无障碍支持

                img.onload = () => {
                    this.container.appendChild(img);
                    this.images.push(img);
                    resolve();
                };

                img.onerror = () => reject(`无法加载图片: ${name}`);
            });
        });

        await Promise.all(loadPromises);
    }

    startSlideshow({ interval }) {
        if (this.images.length === 0) return;

        // 初始显示第一张
        this.images[0].classList.add('active');

        // 设置定时器
        this.timer = setInterval(() => {
            this.nextSlide();
        }, interval);

        // 窗口失焦时暂停
        window.addEventListener('visibilitychange', () => {
            document.hidden ? clearInterval(this.timer) : this.startSlideshow(config);
        });
    }

    nextSlide() {
        const current = this.images[this.currentIndex];
        current.classList.remove('active');

        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        
        const next = this.images[this.currentIndex];
        next.classList.add('active');
    }
}

// 初始化轮播
document.addEventListener('DOMContentLoaded', () => {
    new Slideshow('slideshow', config);
});