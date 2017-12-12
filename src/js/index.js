import App from './app.js';

require('./../less/styles.less');
const data = require('./../json/data.json');

console.log(data);

window.newsApp = new App();

window.newsApp.init();
