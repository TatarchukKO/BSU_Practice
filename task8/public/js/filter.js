/**
 * Created by Kanstantsin on 25.03.2017.
 */

function filterNews() {
    let filterConf = {};
    let input_tags = document.querySelector(".tags-filter").value.toLowerCase();
    let input_author = document.querySelector(".author-filter").value.toLowerCase();
    let input_date = document.querySelector(".date-filter").value;

    if (input_author) {
        filterConf.author = input_author;
    }
    if (input_tags.length !== 0) {
        filterConf.tags = input_tags.split(",");
    }
    if (input_date) {
        filterConf.date = new Date(input_date).toDateString();
    }

    articleModel.setArticleList(articleModel.getArticles(0, articleModel.getSizeArticles(), filterConf));
    renderArticles(0, 6);
}