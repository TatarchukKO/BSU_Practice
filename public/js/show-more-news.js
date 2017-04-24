/**
 * Created by Kanstantsin on 26.03.2017.
 */


let showMoreNews = (function () {
    let newsAmountOnPage = 6;

    function startApp() {
        newsAmountOnPage += 6;
        /* DOM Загрузился.
         Можно найти в нем нужные элементы и сохранить в переменные */
        articleRenderer.init();
        /* Нарисуем статьи из массива GLOBAL_ARTICLES в DOM */
        renderArticles(0, newsAmountOnPage);
        document.querySelector(".show-more-news").style.display = "block";
    }

    function renderArticles(skip, top) {
        // 1. Удалим статьи из HTML
        articleRenderer.removeArticlesFromDom();

        // 2. Достанем статьи из модели
        let articles = articleModel.getArticles(skip, top);

        // 3. Отобразим статьи
        articleRenderer.insertArticlesInDOM(articles);
    }

    function showMore() {
        articleModel.getArticlesSizeFromDb().then(response =>{
            const size = response;
            if (newsAmountOnPage < size) {
                startApp();
            }
            if (newsAmountOnPage >= size) {
                document.querySelector(".show-more-news").style.display = "none";
            }
        });
        return false;
    }

    return{
        showMore : showMore
    };

}());