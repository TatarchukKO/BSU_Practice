/**
 * Created by Kanstantsin on 21.03.2017.
 */

function openDetailedView(currentNews) {
    document.querySelector(".wrapper").style.display = "none";
    document.querySelector(".show-more-news").style.display = "none";
    document.querySelector(".detailed-view").style.display = "inline-block";

    var id = currentNews.dataset.id;
    var article = articleModel.getArticle(id);
    document.querySelector(".detailed-view").dataset.id = id;
    document.querySelector(".dv-title").textContent = article.title;
    document.querySelector(".dv-img").setAttribute("src", article.image);
    document.querySelector(".dv-content").textContent = article.content;
    document.querySelector(".dv-author").textContent = article.author;
    document.querySelector(".dv-date").textContent = article.createdAt.toDateString();
    document.querySelector(".dv-tags").textContent = "";
    for (var j = 0; j < article.tags.length; j++) {
        document.querySelector(".dv-tags").textContent += (article.tags[j] + " ");
    }
}
