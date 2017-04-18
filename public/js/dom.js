/**
 * Created by Kanstantsin on 13.03.2017.
 */

var articleModel = (function () {
    let GLOBAL_ARTICLES = [{}];

    var tags = [];

    function getArticles(skip, top, filterConfig) {
        skip = skip || 0;
        top = top || GLOBAL_ARTICLES.length;
        return GLOBAL_ARTICLES.filter(function (obj) {
            if (filterConfig) {
                let isContTags = false;
                if (filterConfig.tags) {
                    if (filterConfig.tags.some(item => { return obj.tags.includes(item); })) {
                        isContTags = true;
                    }
                    if (isContTags === false) {
                        return false;
                    }
                }
                if (filterConfig.author && filterConfig.author !== obj.author) {
                    return false;
                }
                if (filterConfig.date && filterConfig.date !== obj.createdAt.toDateString()) {
                    return false;
                }
                return GLOBAL_ARTICLES.indexOf(obj) >= skip && GLOBAL_ARTICLES.indexOf(obj) < top;
            }
            return GLOBAL_ARTICLES.indexOf(obj) >= skip && GLOBAL_ARTICLES.indexOf(obj) < top;
        }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    }

    function getArticleIndexById(id) {
        let index;
        for (let i = 0; i < GLOBAL_ARTICLES.length; i++) {
            if (GLOBAL_ARTICLES[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    function getArticle(id) {
        let index = getArticleIndexById(id);
        if (typeof index === "number") {
            return GLOBAL_ARTICLES[index];
        } else {
            return null;
        }
    }

    function isContainsTagInTaglist(tag) {
        if (tags.indexOf(tag) === -1) {
            return false;
        } else {
            return true;
        }
    }

    function addNewTagsToTagList(obj) {
        obj.tags.forEach(function (item) {
            if (!isContainsTagInTaglist(item)) {
                tags.push(item);
            }
        });
    }

    function addArticle(obj) {
        if (validateArticle(obj)) {
            addNewTagsToTagList(obj);
            GLOBAL_ARTICLES[GLOBAL_ARTICLES.length] = obj;
            return true;
        } else {
            return false;
        }
    }

    function validateArticle(article) {
        let imgRegExp = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
        if (article.id && article.createdAt && article.tags && article.author &&
            article.content && article.title && article.image &&
            typeof article.id === "string" && typeof  article.createdAt === "object" &&
            typeof article.tags === "object" && typeof  article.author === "string" &&
            typeof  article.content === "string" && typeof  article.title === "string" &&
            article.title.length > 0 && article.image.search(imgRegExp) !== -1 &&
            article.tags.length >= 1 && article.tags.length <= 5 &&
            article.content.length > 0 && article.author.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function removeArticle(id) {
        let index = getArticleIndexById(id);
        GLOBAL_ARTICLES.splice(index, 1);
    }

    function validateTags(tagsStr) {
        if (tagsStr.length > 0) {
            return true;
        } else {
            return false;
        }
    }

    function editArticle(id, obj) {
        if (obj.author != undefined || obj.id != undefined || obj.createdAt != undefined || obj.tags != undefined) {
            return false;
        }
        for (var i = 0; i < GLOBAL_ARTICLES.length; i++) {
            if (id === GLOBAL_ARTICLES[i].id) {
                if (validateArticle(GLOBAL_ARTICLES[i])) {
                    if (obj.title != undefined && obj.content != undefined && obj.summary != undefined) {
                        GLOBAL_ARTICLES[i].title = obj.title;
                        GLOBAL_ARTICLES[i].content = obj.content;
                        GLOBAL_ARTICLES[i].summary = obj.summary;
                        return true;
                    } else if (obj.title === undefined && obj.content != undefined && obj.summary === undefined) {
                        GLOBAL_ARTICLES[i].content = obj.content;
                        return true;
                    } else if (obj.title != undefined && obj.content === undefined && obj.summary === undefined) {
                        GLOBAL_ARTICLES[i].title = obj.title;
                        return true;
                    } else if (obj.title === undefined && obj.content === undefined && obj.summary != undefined) {
                        GLOBAL_ARTICLES[i].summary = obj.summary;
                        return true;
                    } else if (obj.title != undefined && obj.content === undefined && obj.summary != undefined) {
                        GLOBAL_ARTICLES[i].summary = obj.summary;
                        GLOBAL_ARTICLES[i].title = obj.title;
                        return true;
                    } else if (obj.title === undefined && obj.content != undefined && obj.summary != undefined) {
                        GLOBAL_ARTICLES[i].summary = obj.summary;
                        GLOBAL_ARTICLES[i].content = obj.content;
                        return true;
                    } else if (obj.title != undefined && obj.content != undefined && obj.summary === undefined) {
                        GLOBAL_ARTICLES[i].title = obj.title;
                        GLOBAL_ARTICLES[i].content = obj.content;
                        return true;
                    }
                }
            }
        }
    }

    function getSizeArticles() {
        return GLOBAL_ARTICLES.length;
    }

    function isContainsTagsInArticle(tagArr, obj) {
        let containFlag = false;
        tagArr.forEach(function (item) {
            if (obj.tags.indexOf(item) !== -1) {
                containFlag = true;
                return;
            }
        });
        return containFlag;
    }

    function replaceArticles() {
        return new Promise((resolve) => {
            getArrayFromDb().then(
                response => {
                    GLOBAL_ARTICLES = response;
                    GLOBAL_ARTICLES = GLOBAL_ARTICLES.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
                    tags = JSON.parse(localStorage.getItem("tags"));
                    resolve();
                },
                error => console.log("ARRAY FROM DB HAVEN'T LOADED")
            )
        });
    }

    function storageArticles() {
        localStorage.setItem("tags", JSON.stringify(tags));
    }

    function setArticleList(article_list) {
        GLOBAL_ARTICLES = article_list;
    }

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        addArticle: addArticle,
        validateArticle: validateArticle,
        removeArticle: removeArticle,
        editArticle: editArticle,
        isContainsTagsInArticle: isContainsTagsInArticle,
        GLOBAL_ARTICLES: GLOBAL_ARTICLES,
        tags: tags,
        getSizeArticles: getSizeArticles,
        replaceArticles: replaceArticles,
        storageArticles: storageArticles,
        validateTags: validateTags,
        setArticleList: setArticleList
    };
}());

var articleRenderer = (function () {
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST_NODE;

    function init() {
        /* DOM Загрузился.
         Можно найти в нем нужные элементы и сохранить в переменные */
        ARTICLE_TEMPLATE = document.querySelector('#template-article-list-item');
        ARTICLE_LIST_NODE = document.querySelector('.news-list');
    }

    function insertArticlesInDOM(articles) {
        /* для массива объектов статей получим соотвествующие HTML элементы */
        var articlesNodes = renderArticles(articles);
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
        var template = ARTICLE_TEMPLATE;
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
    articleModel.replaceArticles().then(
        ready => {
            articleRenderer.init();
            renderArticles(0, 6);
        }
    );
}

/* Глобальная Функция для проверки. Свяжет модель и отображения */

function renderArticles(skip, top) {
    // 1. Удалим статьи из HTML
    articleRenderer.removeArticlesFromDom();

    // 2. Достанем статьи из модели
    var articles = articleModel.getArticles(skip, top);

    // 3. Отобразим статьи
    articleRenderer.insertArticlesInDOM(articles);
}
