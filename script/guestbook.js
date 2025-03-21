class Guestbook {
    constructor() {
      // 初始化 Firestore 集合
      this.messagesRef = db.collection("messages");
      this.form = document.getElementById('messageForm');
      this.archive = document.getElementById('messageArchive');
      
      this.init();
    }
  
    init() {
      // 实时监听数据库变化
      this.messagesRef.orderBy("timestamp", "desc").onSnapshot(snapshot => {
        this.archive.innerHTML = ''; // 清空旧数据
        snapshot.forEach(doc => this.appendMessage(doc.data()));
      });
  
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  
    async handleSubmit(e) {
      e.preventDefault();
      
      const messageData = {
        user: this.form.querySelector('#userInput').value.trim(),
        content: this.form.querySelector('#messageInput').value.trim(),
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // 服务器时间
      };
  
      if (!messageData.user || !messageData.content) {
        this.showError('ERROR: 神经信号不完整');
        return;
      }
  
      try {
        // 提交到云端
        await this.messagesRef.add(messageData);
        this.form.reset();
      } catch (error) {
        this.showError('上传失败: ' + error.message);
      }
    }
  
    appendMessage(data) {
      const msgElement = document.createElement('div');
      msgElement.className = 'message-item';
      msgElement.innerHTML = `
        <div class="user-signal">
          <span class="user-id">${this.glitchText(data.user)}</span>
          <span class="timestamp">[${new Date(data.timestamp?.toDate()).toLocaleString()}]</span>
        </div>
        <p class="message-content">// ${this.formatContent(data.content)}</p>
      `;
      this.archive.prepend(msgElement);
    }
  
    // 保留原有辅助方法（glitchText、formatContent、showError）
  }