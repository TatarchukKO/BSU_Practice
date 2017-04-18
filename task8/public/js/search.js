/**
 * Created by Kanstantsin on 24.03.2017.
 */

function findArticles(event) {
    if (event.keyCode === 13) {
        let input_text = document.getElementById("search-input").value.toLowerCase();
        let article_list = articleModel.getArticles(0,articleModel.getSizeArticles());
        let matched_articles = [];
        article_list.forEach(function (item) {
            if(item.title.toLowerCase().indexOf(input_text) !== -1){
                matched_articles.push(item);
            }
        });
        articleModel.setArticleList(matched_articles);
        renderArticles(0, 6);
        console.log(matched_articles);
        return false;
    }
}