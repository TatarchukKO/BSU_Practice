/**
 * Created by Kanstantsin on 03.04.2017.
 */

function getArrayFromDb() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "/articles");
        request.onload = function () {
            if (this.status === 200) {
                resolve(JSON.parse(this.response, (key, value) => {
                    if (key === "createdAt") {
                        return new Date(value);
                    }
                    return value;
                }));
            }
        };
        request.onerror = function () {
            reject(new Error("Error"));
        };
        request.send();
    });

}

function editArticleFromDb(article) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("PATCH", "/articles");
        request.setRequestHeader("content-type", "application/json");
        request.onload = function () {
            if (this.status === 200) {
                resolve();
            }
        };
        request.onerror = function(){
            reject(new Error("edit Error"));
        };
        request.send(JSON.stringify(article));
    });

}

function addArticleInDb(article) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "/articles");
        request.setRequestHeader("content-type", "application/json");
        request.onload = function(){
            if (this.status === 200){
                resolve();
            }
        };
        request.onerror = function(){
            reject(new Error("add article Error"));
        };
        request.send(JSON.stringify(article));
    });

}

function removeArticleFromDb(id) {
    let request = new XMLHttpRequest();
    request.open("DELETE", "/articles/" + id);
    request.setRequestHeader("content-type", "application/json");
    request.send();
}