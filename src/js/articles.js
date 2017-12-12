import ArticlesProvider from './articles-provider.js';
import ArticlesCreator from './articles-creator.js';

require('./../less/articles.less');

export default () => {
    window.newsApp.articlesProvider = new ArticlesProvider();
    window.newsApp.articlesCreator = new ArticlesCreator();
};
