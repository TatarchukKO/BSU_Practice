/**
 * Created by Kanstantsin on 26.03.2017.
 */

function removeNews(currentNews){
    var id = currentNews.dataset.id;

    articleModel.removeArticle(id);
    removeArticleFromDb(id);
    articleModel.storageArticles();
    articleRenderer.removeArticlesFromDom();
    articleRenderer.insertArticlesInDOM(articleModel.getArticles(0, articleModel.getSizeArticles()));

    document.querySelector(".detailed-view").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
}