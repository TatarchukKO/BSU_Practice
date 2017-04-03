/**
 * Created by Kanstantsin on 03.04.2017.
 */

function getArrayFromDb() {
    let request = new XMLHttpRequest();
    request.open("GET", "/articles", false);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            return request.responseText;
        }
    };
    return request.onreadystatechange();
}

function editArticleFromDb(article) {
    let request = new XMLHttpRequest();
    request.open("PATCH", "/articles");
    request.setRequestHeader("content-type", "application/json");
    request.send(JSON.stringify(article));
}

function addArticleInDb(article) {
    let request = new XMLHttpRequest();
    request.open("POST", "/articles");
    request.setRequestHeader("content-type", "application/json");
    request.send(JSON.stringify(article));
}

function removeArticleFromDb(id) {
    let request = new XMLHttpRequest();
    request.open("DELETE", "/article/" + id);
    request.send();
}