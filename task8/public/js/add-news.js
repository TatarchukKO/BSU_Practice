/**
 * Created by Kanstantsin on 25.03.2017.
 */

function goToAddPage() {
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector(".show-more-news").style.display = "none";
    document.querySelector("#add-news-page").style.display = "block";
}

function addNewsOnButton() {
    var article = {
        id: articleModel.GLOBAL_ARTICLES.length.toString(),
        title: document.querySelector("#add-news-title").value,
        image: document.querySelector("#add-news-img").value,
        author: userName,
        createdAt: new Date(),
        content: document.querySelector("#add-news-content").value,
        summary: document.querySelector("#add-news-content").value.substring(0, 200),
        tags: []
    };

    var tagsStr = document.querySelector("#add-news-tags").value.toLowerCase();
    if (articleModel.validateTags(tagsStr)){
        article.tags = tagsStr.split(",");
    }

    console.log(article);
    console.log(articleModel.validateArticle(article));
    articleModel.addArticle(article);
    addArticleInDb(article);
    articleModel.storageArticles();
    articleRenderer.removeArticlesFromDom();
    articleRenderer.insertArticlesInDOM(articleModel.getArticles(0, articleModel.getSizeArticles()));

    document.querySelector(".wrapper").style.display = "block";
    document.querySelector(".show-more-news").style.display = "block";
    document.querySelector("#add-news-page").style.display = "none";
}