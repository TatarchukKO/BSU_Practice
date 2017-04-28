function goHomePage() {
    articleModel.getArticlesSizeFromDb().then(response => {
        const size = response;
        renderArticles(0, 6).then(() => {
            if (size <= 6)
                document.querySelector(".show-more-news").style.display = "none";
            else
                document.querySelector(".show-more-news").style.display = "block";
            if (!userName) {
                document.querySelector(".sign-in-button").style.visibility = "visible";
                document.querySelector(".sign-out-button").style.visibility = "hidden";
                document.querySelector(".user-name").style.visibility = "hidden";
            } else {
                document.querySelector(".sign-in-button").style.visibility = "hidden";
                document.querySelector(".sign-out-button").style.visibility = "visible";
                document.querySelector(".user-name").style.visibility = "visible";
            }
            document.querySelector(".detailed-view").style.display = "none";
            document.querySelector(".authorization").style.display = "none";
            document.querySelector("#add-news-page").style.display = "none";
            document.querySelector("#edit-news-page").style.display = "none";
            document.querySelector(".wrapper").style.display = "block";
        });
    });
}