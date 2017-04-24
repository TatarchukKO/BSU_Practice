function removeNews(currentNews) {
    let id = currentNews.dataset.id;
    removeArticleFromDb(id).then(() => {
        renderArticles(0, 6);
    });
    document.querySelector(".detailed-view").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
}