function findArticles(event) {
    let filterConf = {};
    if (event.keyCode === 13) {
        let input_text = document.getElementById("search-input").value.toLowerCase();
        if(input_text){
            filterConf.search = input_text;
            renderArticles(0, 6, filterConf);
            return false;
        }
    }
}