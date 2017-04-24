function findArticles(event) {
    if (event.keyCode === 13) {
        let input_text = document.getElementById("search-input").value.toLowerCase();
        renderArticles(0, 6);
        return false;
    }
}