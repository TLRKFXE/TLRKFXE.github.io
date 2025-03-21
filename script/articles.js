/* import { loadArticles } from './modules/article-loader.js';

class ArticlePage {
    constructor() {
        this.articleBasePath = '/articles/';
        this.init();
    }

    async init() {
        await this.loadArticleList();
        this.setupRouting();
    }

    async loadArticleList() {
        const response = await fetch('/article-list.json');
        const articles = await response.json();
        
        const listContainer = document.getElementById('article-list');
        listContainer.innerHTML = articles.map(article => `
            <div class="article-card" data-slug="${article.slug}">
                <h3>${article.title}</h3>
                <time>${article.date}</time>
            </div>
        `).join('');
    }

    setupRouting() {
        document.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', () => {
                const slug = card.dataset.slug;
                this.loadArticleContent(slug);
                history.pushState(null, '', `?article=${slug}`);
            });
        });
    }

    async loadArticleContent(slug) {
        try {
            const response = await fetch(`${this.articleBasePath}${slug}.md`);
            const markdown = await response.text();
            document.getElementById('article-content').innerHTML = marked.parse(markdown);
        } catch (error) {
            console.error('加载文章失败:', error);
        }
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ArticlePage();
}); */


const ARTICLES = [
    { 
        slug: 'cyberpunk-life',
        title: '赛博朋克生存指南',
        date: '2077-03-15',
        file: 'articles/cyberpunk-life.md'
    },
    // 更多文章...
];

class ArticleLoader {
    constructor() {
        this.listContainer = document.getElementById('articleList');
        this.contentContainer = document.getElementById('articleContent');
        this.init();
    }

    async init() {
        this.renderList();
        this.setupRouting();
    }

    renderList() {
        this.listContainer.innerHTML = ARTICLES.map(article => `
            <div class="article-card" data-slug="${article.slug}">
                <h3>${article.title}</h3>
                <time>${article.date}</time>
            </div>
        `).join('');
    }

    setupRouting() {
        this.listContainer.addEventListener('click', async (e) => {
            const card = e.target.closest('.article-card');
            if(card) {
                const article = ARTICLES.find(a => a.slug === card.dataset.slug);
                const content = await fetch(article.file).then(r => r.text());
                this.contentContainer.innerHTML = marked.parse(content);
            }
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ArticleLoader();
});