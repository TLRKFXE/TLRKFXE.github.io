// guestbook.js 修复（保持样式不变）
class Guestbook {
    constructor() {
        this.form = document.querySelector('.neuro-form');
        this.inputs = this.form.querySelectorAll('.hologram-input');
        this.archive = document.querySelector('.message-archive');
        
        // 初始化本地存储
        if(!localStorage.getItem('neuroMessages')) {
            localStorage.setItem('neuroMessages', JSON.stringify([]));
        }

        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.loadMessages();
        
        // 限制文本域缩放
        const textarea = this.form.querySelector('textarea');
        textarea.style.resize = 'vertical';
        textarea.style.minHeight = '100px';
        textarea.style.maxHeight = '300px';
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const messageData = {
            user: this.inputs[0].value.trim(),
            content: this.inputs[1].value.trim(),
            timestamp: new Date().toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        if (!messageData.user || !messageData.content) {
            this.showError('ERROR: 神经信号不完整');
            return;
        }

        this.saveMessage(messageData);
        this.appendMessage(messageData);
        this.form.reset();
    }

    saveMessage(data) {
        const messages = JSON.parse(localStorage.getItem('neuroMessages'));
        messages.unshift(data);
        localStorage.setItem('neuroMessages', JSON.stringify(messages));
    }

    loadMessages() {
        const messages = JSON.parse(localStorage.getItem('neuroMessages'));
        messages.forEach(msg => this.appendMessage(msg));
    }

    appendMessage(data) {
        const msgElement = document.createElement('div');
        msgElement.className = 'message-item';
        msgElement.innerHTML = `
            <div class="user-signal">
                <span class="user-id">${data.user}</span>
                <span class="timestamp">[${data.timestamp}]</span>
            </div>
            <p class="message-content">// ${data.content}</p>
        `;
        this.archive.prepend(msgElement);
    }

    showError(text) {
        const error = document.createElement('div');
        error.className = 'neuro-error';
        error.textContent = text;
        document.body.appendChild(error);
        setTimeout(() => error.remove(), 3000);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => new Guestbook());