/**
 * Created by Kanstantsin on 25.03.2017.
 */
var articleEdit = (function () {

    let id;

    function goToEditPage(currentNews) {
        document.querySelector(".detailed-view").style.display = "none";
        document.querySelector("#edit-news-page").style.display = "block";

        id = currentNews.dataset.id;
        var article = articleModel.getArticle(id);

        document.querySelector("#edit-news-title").textContent = article.title;
        document.querySelector("#edit-news-img").textContent = article.image;
        document.querySelector("#edit-news-content").textContent = article.content;
        document.querySelector("#edit-news-tags").textContent = article.tags;
    }

    function editNews() {
        let currentArticle = articleModel.getArticle(id);
        let editedArticle = {};

        editedArticle = currentArticle;

        editedArticle.title = document.querySelector("#edit-news-title").value;
        editedArticle.content = document.querySelector("#edit-news-content").value;
        editedArticle.summary = editedArticle.content.substring(0, 644);
        editedArticle.image = document.querySelector("#edit-news-img").value;
        let tagsStr = document.querySelector("#edit-news-tags").value;
        if (articleModel.validateTags(tagsStr)) {
            editedArticle.tags = tagsStr.split(",", 5);
        }

        if (articleModel.validateArticle(editedArticle)) {
            removeArticleFromDb(id);
            addArticleInDb(editedArticle);
            articleModel.replaceArticles();
            renderArticles(0, 6);
        }
        document.querySelector(".wrapper").style.display = "block";
        document.querySelector("#edit-news-page").style.display = "none";
    }

    return {
        goToEditPage: goToEditPage,
        editNews: editNews
    };
}());
