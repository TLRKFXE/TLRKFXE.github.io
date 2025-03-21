// js/modules/article-loader.js
export const loadArticles = async () => {
    // 从API获取文章列表
    const response = await fetch('/api/articles');
    return response.json();
};