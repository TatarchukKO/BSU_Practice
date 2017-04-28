/**
 * Created by Kanstantsin on 26.03.2017.
 */


let showMoreNews = (function () {
    let newsAmountOnPage = 6;

    function startApp() {
        newsAmountOnPage += 6;
        articleRenderer.init();
        renderArticles(0, newsAmountOnPage);
        document.querySelector(".show-more-news").style.display = "block";
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