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

    renderArticles(0, 6, filterConf);
}