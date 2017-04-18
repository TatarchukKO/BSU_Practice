/**
 * Created by Kanstantsin on 25.03.2017.
 */
// ОТРЕДАКТИРОВАНО, РАБОТАЕТ
function goToAddPage() {
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector(".show-more-news").style.display = "none";
    document.querySelector("#add-news-page").style.display = "block";
}

function addNewsOnButton() {
    var article = {
        id: userName + new Date().toString(),
        title: document.querySelector("#add-news-title").value,
        image: document.querySelector("#add-news-img").value,
        author: userName,
        createdAt: new Date(),
        content: document.querySelector("#add-news-content").value,
        summary: document.querySelector("#add-news-content").value.substring(0, 644),
        tags: []
    };

    var tagsStr = document.querySelector("#add-news-tags").value.toLowerCase();
    if (articleModel.validateTags(tagsStr)) {
        article.tags = tagsStr.split(",");
    }

    if(articleModel.validateArticle(article)) {
        addArticleInDb(article).then(
            () => {
                articleModel.storageArticles();                        // для тегов
                articleModel.replaceArticles().then(
                    () => {
                        renderArticles(0, 6);
                    }
                );
            }
        );
    }

    document.querySelector(".wrapper").style.display = "block";
    document.querySelector(".show-more-news").style.display = "block";
    document.querySelector("#add-news-page").style.display = "none";
}