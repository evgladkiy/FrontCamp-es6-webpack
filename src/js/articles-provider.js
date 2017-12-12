export default class ArticlesProvider {
    constructor() {
        this.searchUrl = 'https://newsapi.org/v2/';
        this.apiKey = 'a7ce20d66ed9428483334b6a27210bbc';
    }

    static sortArticlesByDate(articles) {
        return articles.filter(article => article.publishedAt !== null)
            .map((article) => {
                const { source: { name } } = article;
                let { publishedAt, author } = article;

                author = (author === null) ? name : author;
                publishedAt = new Date(publishedAt);

                return Object.assign(article, { publishedAt, author });
            })
            .sort((articleB, articleA) => (
                Number(articleA.publishedAt) - Number(articleB.publishedAt)
            ));
    }

    getFullUrl(searchKey, searchValue) {
        const { searchUrl, apiKey } = this;
        switch (searchKey) {
            case 'categories': {
                return `${searchUrl}top-headlines?category=${searchValue}&apiKey=${apiKey}`;
            }
            case 'sources': {
                return `${searchUrl}top-headlines?sources=${searchValue}&apiKey=${apiKey}`;
            }
            case 'query': {
                return `${searchUrl}everything?q=${searchValue}&apiKey=${apiKey}`;
            }
            default: {
                return new Error('invalid searhKey or searchValue');
            }
        }
    }

    searchArticles(searchKey, searchValue) {
        return fetch(this.getFullUrl(searchKey, searchValue))
            .then(response => response.json())
            .then(({ articles }) => ArticlesProvider.sortArticlesByDate(articles));
    }
}
