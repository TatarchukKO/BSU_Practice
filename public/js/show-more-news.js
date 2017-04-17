/**
 * Created by Kanstantsin on 26.03.2017.
 */


var showMoreNews = (function () {
    var newsAmountOnPage = 6;

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
        var articles = articleModel.getArticles(skip, top);

        // 3. Отобразим статьи
        articleRenderer.insertArticlesInDOM(articles);
    }

    function showMore() {
        if (newsAmountOnPage < articleModel.getSizeArticles()) {
            startApp();
        }
        if (newsAmountOnPage >= articleModel.getSizeArticles()) {
            document.querySelector(".show-more-news").style.display = "none";
        }
        return false;
    }

    return{
        showMore : showMore
    };

}());