/**
 * Created by Kanstantsin on 24.03.2017.
 */

function findArticles(event) {
    if (event.keyCode === 13) {
        var article_list = articleModel.getArticles(0,articleModel.getSizeArticles())
        var article_title;
        var matched_articles = [];
        var input_text = document.querySelector("#search-input").value.toLowerCase();
        for (var i = 0; i < article_list.length; i++) {
            article_title = article_list[i].title.toLowerCase();
            if (article_title.indexOf(input_text) != -1) {
                matched_articles.push(article_list[i]);
            }
        }
        articleRenderer.removeArticlesFromDom();
        articleRenderer.insertArticlesInDOM(matched_articles);
        return false;
    }
}