/**
 * Created by Kanstantsin on 25.03.2017.
 */
let articleEdit = (function () {
    let id;

    function goToEditPage(currentNews) {
        document.querySelector(".detailed-view").style.display = "none";
        document.querySelector("#edit-news-page").style.display = "block";

        id = currentNews.dataset.id;
        articleModel.getArticleFromDb(id).then(response => {
            let article = response;
            document.querySelector("#edit-news-title").textContent = article.title;
            document.querySelector("#edit-news-img").textContent = article.image;
            document.querySelector("#edit-news-content").textContent = article.content;
            document.querySelector("#edit-news-tags").textContent = article.tags;
        });
    }

    function editNews() {
        let editedArticle = {};

        editedArticle.id = id;
        editedArticle.title = document.querySelector("#edit-news-title").value;
        editedArticle.content = document.querySelector("#edit-news-content").value;
        editedArticle.image = document.querySelector("#edit-news-img").value;
        editedArticle.tags = document.querySelector("#edit-news-tags").value;

        articleModel.editArticleFromDb(editedArticle).then(() => {
            renderArticles(0, 6);
        });

        document.querySelector(".wrapper").style.display = "block";
        document.querySelector("#edit-news-page").style.display = "none";
    }

    return {
        goToEditPage: goToEditPage,
        editNews: editNews
    };
}());
