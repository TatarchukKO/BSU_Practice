/**
 * Created by Kanstantsin on 25.03.2017.
 */

function filterNews() {
    var article_list = articleModel.GLOBAL_ARTICLES;

    for (var i = 0; i < article_list.length; i++) {
        for (var j = 0; j < article_list[i].tags.length; j++) {
            article_list[i].tags[j] = article_list[i].tags[j].toLowerCase();
        }
    }

    var input_author;
    var input_tags;
    var input_date;
    if (document.querySelector(".tags-filter").value.toLowerCase() != "") {
        input_tags = document.querySelector(".tags-filter").value.toLowerCase().split(", ");
    }
    if (document.querySelector(".author-filter").value.toLowerCase() != "") {
        input_author = document.querySelector(".author-filter").value.toLowerCase();
    }
    if (document.querySelector(".date-filter").value.toLowerCase() != "") {
        input_date = document.querySelector(".date-filter").value;
    }

    var matched_articles = [];
    var article_author;
    var article_date;
    var article_tags = [];

    if (input_author === undefined && input_tags === undefined && input_date === undefined) {
        return false;
    } else if (input_author && input_tags && input_date) {
        for (var i = 0; i < article_list.length; i++) {

            article_author = article_list[i].author.toLowerCase();
            article_tags = article_list[i].tags;
            article_date = article_list[i].createdAt;

            if (input_author === article_author && input_date === article_date) {
                for (var j = 0; j < input_tags.length; j++) {
                    if (article_tags.indexOf(input_tags[j]) != -1) {
                        matched_articles.push(article_list[i]);
                        break;
                    }
                }

            }
        }
    } else if (input_author && input_tags && input_date === undefined) {
        for (var i = 0; i < article_list.length; i++) {

            article_author = article_list[i].author.toLowerCase();
            article_tags = article_list[i].tags;

            if (input_author === article_author) {
                for (var j = 0; j < input_tags.length; j++) {
                    if (article_tags.indexOf(input_tags[j]) != -1) {
                        matched_articles.push(article_list[i]);
                        break;
                    }
                }

            }
        }
    } else if (input_author && input_tags === undefined && input_date === undefined) {
        for (var i = 0; i < article_list.length; i++) {

            article_author = article_list[i].author.toLowerCase();
            console.log(article_author);
            if (input_author === article_author) {
                matched_articles.push(article_list[i]);
            }
        }
    } else if (input_author && input_tags === undefined && input_date) {
        for (var i = 0; i < article_list.length; i++) {

            article_author = article_list[i].author.toLowerCase();
            article_date = article_list[i].createdAt;

            if (input_author === article_author && input_date === article_date) {
                matched_articles.push(article_list[i]);
            }
        }
    } else if (input_author === undefined && input_tags && input_date) {
        for (var i = 0; i < article_list.length; i++) {

            article_date = article_list[i].createdAt;
            article_tags = article_list[i].tags;

            if (input_date === article_date) {
                for (var j = 0; j < input_tags.length; j++) {
                    if (article_tags.indexOf(input_tags[j]) != -1) {
                        matched_articles.push(article_list[i]);
                        break;
                    }
                }

            }
        }
    } else if (input_author === undefined && input_tags && input_date === undefined) {
        for (var i = 0; i < article_list.length; i++) {

            article_tags = article_list[i].tags;
            console.log(article_tags);
            for (var j = 0; j < input_tags.length; j++) {
                if (article_tags.indexOf(input_tags[j]) != -1) {
                    matched_articles.push(article_list[i]);
                    break;
                }
            }
        }
    } else if (input_author === undefined && input_tags === undefined && input_date) {
        for (var i = 0; i < article_list.length; i++) {

            article_date = article_list[i].createdAt;

            if (input_date === article_date) {
                matched_articles.push(article_list[i]);
            }
        }
    }
    console.log(matched_articles);
    articleRenderer.removeArticlesFromDom();
    articleRenderer.insertArticlesInDOM(matched_articles);
}
