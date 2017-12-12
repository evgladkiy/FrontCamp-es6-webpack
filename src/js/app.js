export default class App {
    constructor() {
        this.body = document.body;
        this.articlesContainer = document.querySelector('.articles-container');
        this.form = document.forms[0];
        this.radioButtonsValue = this.getValueFromRadioButton('radio');
        this.articles = null;
    }

    showError(errorText) {
        this.body.className = '';
        this.articlesContainer.innerHTML = `
            <p class="searchError centred">${errorText}</p>
        `;
    }

    async getArticles(searchValue) {
        if (this.articlesCreator === undefined || this.articlesProvider === undefined) {
            const module = await import(/* webpackChunkName: "articles" */ './articles');
            const { ArticlesCreator, ArticlesProvider } = module.default;

            this.articlesProvider = new ArticlesProvider();
            this.articlesCreator = new ArticlesCreator();
        }

        this.searchAndRenderArticles(this.radioButtonsValue, searchValue);
}

    submitFormHandler(e) {
        const searchValue = this.form[this.radioButtonsValue].value;
        e.preventDefault();

        if (searchValue !== '') {
            this.getArticles(searchValue);
        }
    }

    getValueFromRadioButton(name) {
        const buttons = document.getElementsByName(name);

        for (let i = 0; i < buttons.length; i++) {
            var button = buttons[i];
            if(button.checked) {
                return button.value;
            }
        }

        return null;
    }

    onChangeRadioHandler(e) {
        const { target } = e;
        const { radioButtonsValue, form } = this;
        if (target.type === 'radio' && target.value !== radioButtonsValue) {
            form[radioButtonsValue].className = 'form__input';
            this.radioButtonsValue = target.value;
            form[target.value].className += ' active';
        }
    }

    searchAndRenderArticles(searchKey, searchValue) {
        this.articlesContainer.innerHTML = '';
        this.body.className = 'with-spinner';

        return this.articlesProvider.searchArticles(searchKey, searchValue)
            .then((articles) => {
                this.articles = articles;

                if (this.articles.length > 0) {
                    this.articlesCreator.createArticles(articles, this.articlesContainer);
                    this.body.className = '';
                } else {
                    this.showError('Nothing found... try again');
                }
            })
            .catch(() => this.showError('Something went wrong...</br> check internet connection'));
    }

    init() {
        const radiosContainer = document.querySelector('.radios-container');
        this.form.addEventListener('submit', this.submitFormHandler.bind(this));
        radiosContainer.addEventListener('click', this.onChangeRadioHandler.bind(this));
    }
}
