/**
 * Created by Kanstantsin on 26.03.2017.
 */
// ОТРЕДАКТИРОВАНО, РАБОТАЕТ

function removeNews(currentNews){
    var id = currentNews.dataset.id;

    removeArticleFromDb(id).then(
        () => {
            articleModel.replaceArticles().then(
                () => {
                    articleModel.storageArticles();                     // для тегов
                    articleRenderer.removeArticlesFromDom();
                    articleRenderer.insertArticlesInDOM(articleModel.getArticles(0, articleModel.getSizeArticles()));
                }
            );
        }
    );


    document.querySelector(".detailed-view").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
}