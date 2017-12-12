import App from './app.js';

require('./../less/styles.less');
require('./../json/data.json');

const newsApp = new App();

newsApp.init();
