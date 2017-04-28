let articleModel = (function () {
    function getArticlesSizeFromDb() {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "/articles/count");
            request.onload = () => {
                if (request.status === 200) {
                    resolve(Number(request.responseText));
                }
            };
            request.onerror = () => {
                reject(new Error("Error getting articles size"));
            };
            request.send();
        });
    }
    function getArticlesFromDb(skip, top, filterConfig) {
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
    function getArticleFromDb(id) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("GET", "/articles/" + id);
            request.setRequestHeader("content-type", "application/json");
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
                reject(new Error("edit Error"));
            };
            request.send(JSON.stringify(id));
        });
    }
    function editArticleFromDb(article) {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("PATCH", "/articles");
            request.setRequestHeader("content-type", "application/json");
            request.onload = () => {
                if (request.status === 200) {
                    resolve();
                }
            };
            request.onerror = () => {
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

    return {
        getArticlesFromDb: getArticlesFromDb,
        getArticlesSizeFromDb: getArticlesSizeFromDb,
        getArticleFromDb: getArticleFromDb,
        editArticleFromDb: editArticleFromDb,
        addArticleInDb: addArticleInDb,
        removeArticleFromDb: removeArticleFromDb
    };
}());

const articleRenderer = (function () {
    let ARTICLE_TEMPLATE;
    let ARTICLE_LIST_NODE;

    function init() {
        /* DOM Загрузился.
         Можно найти в нем нужные элементы и сохранить в переменные */
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.news-list');
    }

    function insertArticlesInDOM(articles) {
        /* для массива объектов статей получим соотвествующие HTML элементы */
        let articlesNodes = renderArticles(articles);
        /* вставим HTML элементы в '.article-list' элемент в DOM. */
        articlesNodes.forEach(function (node) {
            ARTICLE_LIST_NODE.appendChild(node);
        });
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST_NODE.innerHTML = '';
    }

    function renderArticles(articles) {
        /* каждый объект article из массива преобразуем в HTML элемент */
        return articles.map(function (article) {
            return renderArticle(article);
        });
    }

    function renderArticle(article) {
        /*
         Используем template из DOM, заполним его данными конкретной статьи - article.
         Этот код можно сделать лучше ...
         */
        let template = ARTICLE_TEMPLATE;
        template.content.querySelector('.article-list-item').dataset.id = article.id;
        template.content.querySelector('.article-list-item-title').textContent = article.title;
        template.content.querySelector('.article-list-item-summary').textContent = article.summary;
        template.content.querySelector('.article-list-item-author').textContent = article.author;
        template.content.querySelector('.article-list-item-date').textContent = formatDate(article.createdAt);
        template.content.querySelector('.article-list-item-img').setAttribute("src", article.image);
        /*
         Склонируем полученный контент из template и вернем как результат
         */
        return template.content.querySelector('.article-list-item').cloneNode(true);
    }

    /* Date -> 16/05/2015 09:50 */
    function formatDate(d) {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' +
            d.getHours() + ':' + d.getMinutes();
    }

    return {
        init: init,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom
    };
}());

/*
 Функция startApp вызовется, когда браузер полностью загрузит и распарсит исходный HTML (index.html)
 DOMContentLoaded – означает, что все DOM-элементы разметки уже созданы,
 можно их искать, вешать обработчики, создавать интерфейс, но при этом, возможно,
 ещё не догрузились какие-то картинки или стили.
 */
document.addEventListener('DOMContentLoaded', startApp);

function startApp() {
    articleRenderer.init();
    articleModel.getArticlesSizeFromDb().then(response =>{
       if (response <= 6)
           document.querySelector(".show-more-news").style.display = "none";
        renderArticles(0, 6);
    });

}

function renderArticles(skip, top, filterConfig) {
    return new Promise(resolve => {
        articleRenderer.removeArticlesFromDom();
        articleModel.getArticlesFromDb(skip, top, filterConfig).then(response => {
            articleRenderer.insertArticlesInDOM(response);
            resolve();
        });
    });
}
