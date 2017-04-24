function getArrayFromDb() {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "/articles");
        request.onload = () => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText, (key, value) => {
                    if (key === "createdAt") {
                        return new Date(value);
                    }
                    return value;
                }));
            }
        };
        request.onerror = () => {
            reject(new Error("Error"));
        };
        request.send();
    });
}
function getArticlesFromDB(skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("PUT", "/articles");
        request.setRequestHeader('content-type', 'application/json');
        request.onload = () => {
            if (request.status === 200) {
                resolve(JSON.parse(request.responseText, (key, value) => {
                    if (key === "createdAt") {
                        return new Date(value);
                    }
                    return value;
                }));
            }
        };
        request.onerror = () => {
            reject(new Error("Error"));
        };
        request.send(JSON.stringify({skip, top, filterConfig}));
    });
}

function addArticleInDb(article) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("POST", "/articles");
        request.setRequestHeader("content-type", "application/json");
        request.onload = () => {
            if (request.status === 200) {
                resolve();
            }
        };
        request.onerror = () => {
            reject(new Error("add article Error"));
        };
        request.send(JSON.stringify(article));
    });
}

function removeArticleFromDb(id) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("DELETE", "/articles/" + id);
        request.onload = () => {
            if (request.status === 200) {
                resolve();
            }
        };
        request.onerror = () => {
            reject(new Error("remove article Error"));
        };
        request.send();
    });
}