class Guestbook {
    constructor() {
      // 初始化 Firestore 集合引用
      this.messagesRef = db.collection("messages");
      this.form = document.getElementById('messageForm');
      this.userInput = document.getElementById('userInput');
      this.messageInput = document.getElementById('messageInput');
      this.archive = document.getElementById('messageArchive');
      
      this.init();
    }
  
    init() {
      // 实时监听数据库变化
      this.messagesRef
        .orderBy("timestamp", "desc") // 按时间倒序排列
        .onSnapshot((snapshot) => {
          this.archive.innerHTML = ''; // 清空旧数据
          snapshot.forEach((doc) => {
            const data = doc.data();
            this.appendMessage(data);
          });
        });
  
      // 表单提交事件
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  
    async handleSubmit(e) {
      e.preventDefault();
  
      const messageData = {
        user: this.userInput.value.trim(),
        content: this.messageInput.value.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // 服务器时间
      };
  
      // 输入验证
      if (!messageData.user || !messageData.content) {
        this.showError('ERROR: 神经信号输入不完整');
        return;
      }
  
      try {
        // 提交到 Firestore
        await this.messagesRef.add(messageData);
        this.form.reset(); // 清空表单
      } catch (error) {
        this.showError(`上传失败: ${error.message}`);
      }
    }
  
    appendMessage(data) {
      const msgElement = document.createElement('div');
      msgElement.className = 'message-item';
      
      // 转换 Firestore 时间戳
      const timestamp = data.timestamp?.toDate().toLocaleString('zh-CN') || '未知时间';
  
      msgElement.innerHTML = `
        <div class="user-signal">
          <span class="user-id">${this.glitchText(data.user)}</span>
          <span class="timestamp">[${timestamp}]</span>
        </div>
        <p class="message-content">// ${this.formatContent(data.content)}</p>
      `;
  
      this.archive.prepend(msgElement);
    }
  
    glitchText(text) {
      return text.split('').map(c => 
        Math.random() < 0.2 ? '�' : c
      ).join('');
    }
  
    formatContent(text) {
      return text.split(' ')
        .map(word => Math.random() < 0.3 ? `【${word}】` : word)
        .join(' ');
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