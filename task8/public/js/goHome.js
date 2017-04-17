
function goHomePage() {
    getArrayFromDb();
    renderArticles(0, 6);

    document.querySelector(".detailed-view").style.display = "none";
    document.querySelector(".authorization").style.display = "none";
    document.querySelector("#add-news-page").style.display = "none";
    document.querySelector("#edit-news-page").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
    document.querySelector(".show-more-news").style.display = "block";
}