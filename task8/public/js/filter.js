/**
 * Created by Kanstantsin on 25.03.2017.
 */

function filterNews() {
    let article_list = articleModel.getArticles(0, articleModel.getSizeArticles());

    let matched_articles = [];
    let input_author;
    let input_tags;
    let input_date;

    let filterConfig = {};

    input_tags = document.querySelector(".tags-filter").value.toLowerCase();
    input_author = document.querySelector(".author-filter").value.toLowerCase();
    input_date = document.querySelector(".date-filter").value;


    if (input_author) {
        filterConfig.author = input_author;
    }
    if (input_tags.length !== 0) {
        filterConfig.tags = input_tags.split(",");
    }
    if (input_date) {
        filterConfig.date = new Date(input_date).toDateString();
    }

    matched_articles = article_list.filter(function (obj) {
        if (filterConfig) {
            let isContTags = false;
            if (filterConfig.tags) {
                filterConfig.tags.forEach(function (item) {
                    if (obj.tags.indexOf(item) !== -1) {
                        isContTags = true;
                    }
                });
                if (isContTags === false){
                    return false;
                }
            }
            if(filterConfig.author && filterConfig.author !== obj.author){
                return false;
            }
            if(filterConfig.date && filterConfig.date !== obj.createdAt.toDateString()){
                return false;
            }
            return true;
        }
        return true;
    });
    articleRenderer.removeArticlesFromDom();
    articleRenderer.insertArticlesInDOM(matched_articles);
}