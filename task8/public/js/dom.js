/**
 * Created by Kanstantsin on 13.03.2017.
 */

var articleModel = (function () {
    var GLOBAL_ARTICLES = [{
        "id": "news/2017/02/28/rossiya-snimet-zapret-na-import-moldavskih-vin",
        "title": "Россия снимет запрет на импорт молдавских вин",
        "image": "./img/adidas-Originals-Hamburg.png",
        "author": "KOSTYA",
        "createdAt": new Date("2017-02-28"),
        "content": "img/adidas-Originals-Hamburg.png",
        "summary": "After a massively successful launch in New York City, the VLONE x Nike Air Force 1 traveled across the pond to London in early March for a limited drop at NikeLab 1948. It’s now headed to Japan as VLONE, Nike, and fragment design join forces for an incredible pop-up space at the PARK-ING Ginza. It appears that the Air Force 1 will release there as well along with exclusive VLONE x fragment design x Nike apparel. Check out some of the photos from inside the space; the store opens tomorrow on March 18th.After a massively successful launch in New York City. It appears that the Air Force 1 will release there as well along with exclusive VLONE x fragment design x Nike apparel.",
        "tags": [
            "Спорт", "Жизнь", "рб"
        ]
    }, {
        "id": "news/2017/02/28/tramp-obvinil-obamu-v-organizatsii-protestov-po-vsey-strane-i-utechek-v-smi",
        "title": "Трамп обвинил Обаму в организации протестов по всей стране и утечек в СМИ",
        "image": "./img/air-jordan-11-low-bred.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-02-27T05:24:23.316Z"),
        "content": "Content of post",
        "summary": "After a massively successful launch in New York City, the VLONE x Nike Air Force 1 traveled across the pond to London in early March for a limited drop at NikeLab 1948. It’s now headed to Japan as VLONE, Nike, and fragment design join forces for an incredible pop-up space at the PARK-ING Ginza. It appears that the Air Force 1 will release there as well along with exclusive VLONE x fragment design x Nike apparel. Check out some of the photos from inside the space; the store opens tomorrow on March 18th.After a massively successful launch in New York City.",
        "tags": [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/28/rosneft-zainteresovalas-dobychey-v-meksikanskom-zalive",
        "title": "«Роснефть» заинтересовалась добычей в Мексиканском заливе",
        "image": "./img/nike-air-presto.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-02-26T05:24:22.818Z"),
        "content": "Content of post",
        "summary": "After a massively successful launch in New York City, the VLONE x Nike Air Force 1 traveled across the pond to London in early March for a limited drop at NikeLab 1948. It’s now headed to Japan as VLONE, Nike, and fragment design join forces for an incredible pop-up space at the PARK-ING Ginza. It appears that the Air Force 1 will release there as well along with exclusive VLONE x fragment design x Nike apparel. Check out some of the photos from inside the space; the store opens tomorrow on March 18th.After a massively successful launch in New York City.",
        "tags": [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/28/amerikanskiy-senator-predlozhil-nazvat-imenem-nemtsova-ulitsu-pered-posolstvom-rossii",
        "title": "Американский сенатор предложил назвать именем Немцова улицу перед посольством России",
        "image": "./img/reebok-instapump-fury-og-camo-.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-02-25T05:24:21.043Z"),
        "content": "Content of post",
        "summary": "After a massively successful launch in New York City, the VLONE x Nike Air Force 1 traveled across the pond to London in early March for a limited drop at NikeLab 1948. It’s now headed to Japan as VLONE, Nike, and fragment design join forces for an incredible pop-up space at the PARK-ING Ginza. It appears that the Air Force 1 will release there as well along with exclusive VLONE x fragment design x Nike apparel. Check out some of the photos from inside the space; the store opens tomorrow on March 18th.After a massively successful launch in New York City.",
        "tags": [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/28/rossiya-otkazalas-zaderzhat-podozrevaemyh-v-ubiystve-kim-chen-nama",
        "title": "Россия отказалась задержать подозреваемых в убийстве Ким Чен Нама",
        "image": "./img/2128-ht3.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-02-24T05:24:19.591Z"),
        "content": "Content of post",
        "summary": "Summary of post",
        tags: [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/28/spacex-anonsiroval-polet-kosmicheskih-turistov-k-lune-v-2018-godu",
        "title": "SpaceX пообещала отправить космических туристов к Луне в 2018 году",
        "image": "./img/2128-ht3.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-02-22T05:23:51.252Z"),
        "content": "Content of post",
        "summary": "Summary of post",
        tags: [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/27/v-avstrii-vyhodtsa-iz-chechni-prigovorili-k-2-5-godam-tyurmy-za-uchastie-v-boyah-na-storone-ig",
        "title": "В Австрии выходца из Чечни приговорили к 2,5 годам тюрьмы за участие в боях на стороне ИГ",
        "image": "./img/2128-ht3.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-02-21T05:23:47.871Z"),
        "content": "Content of post",
        "summary": "Summary of post",
        tags: [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/27/v-peterburge-zaderzhali-uchastnika-aktsii-lgbt-spetsnaza-proshedshey-23-fevralya",
        "title": "В Петербурге задержали участника акции «ЛГБТ-спецназа», прошедшей 23 февраля",
        "image": "./img/2128-ht3.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-01-18T05:23:45.059Z"),
        "content": "Content of post",
        "summary": "Summary of post",
        tags: [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/27/nikolay-karachentsov-gospitalizirovan-posle-dtp-v-podmoskovie",
        "title": "Николай Караченцов госпитализирован после ДТП в Подмосковье",
        "image": "./img/2128-ht3.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-01-16T05:23:41.378Z"),
        "content": "Content of post",
        "summary": "Summary of post",
        tags: [
            "Спорт", "Жизнь"
        ]
    }, {
        "id": "news/2017/02/27/id-kommersant-nachnet-vypuskat-pod-nazvaniem-dengi-reklamnoe-prilozhenie",
        "title": "ИД «Коммерсант» начнет выпускать под названием «Деньги» рекламное приложение",
        "image": "./img/2128-ht3.jpg",
        "author": "Meduza",
        "createdAt": new Date("2017-01-15T05:23:36.803Z"),
        "content": "Content of post",
        "summary": "Summary of post",
        "tags": [
            "Спорт", "Жизнь"
        ]
    }];

    var tags = ["Музыка", "Спорт", "Искусство"];

    function getArticles(skip, top) {
        skip = skip || 0;
        top = top || 10;
        return GLOBAL_ARTICLES.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(skip, skip + top);
    }

    function getArticle(id) {
        for(var i = 0; i < GLOBAL_ARTICLES.length; i++)
        {
            if(GLOBAL_ARTICLES[i].id === id)
            {
                return GLOBAL_ARTICLES[i];
            }
        }
    }

    function addArticle(obj) {
        if (validateArticle(obj)) {
            for (var i = 0; i < obj.tags.length; i++) {
                if (tags.indexOf(obj.tags[i]) === -1) {
                    tags.push(obj.tags[i]);
                }
            }
            GLOBAL_ARTICLES[GLOBAL_ARTICLES.length] = obj;
            return true;
        }
        return false;
    }

    function validateArticle(article) {
        if (article.id && article.createdAt && article.tags && article.author &&
            article.content && article.title && article.image &&
            typeof article.id === "string" && typeof  article.createdAt === "object" &&
            typeof article.tags === "object" && typeof  article.author === "string" &&
            typeof  article.content === "string" && typeof  article.title === "string" &&
            article.title.length > 0 /*&& article.title.length <= 40*/ &&
            article.tags.length >= 1 && article.tags.length <= 5 &&
            article.content.length > 0 && article.author.length > 0)
            return true;
        else
            return false;
    }

    function removeArticle(id) {
        for (var i = 0; i < GLOBAL_ARTICLES.length; i++) {
            if (GLOBAL_ARTICLES[i].id === id) {
                GLOBAL_ARTICLES.splice(i, 1);
            }
        }
    }

    function validateTags(tagsStr) {
        if (tagsStr.length > 0){
            return true;
        } else return false;
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

    function containsTags(tagList, news) {
        for (var i = 0; i < tagList.tags.length; i++) {
            if (news.tags.indexOf(tagList.tags[i]) === -1) {
                return false;
            }
        }
        return true;
    }

    function replaceArticles() {
        GLOBAL_ARTICLES = JSON.parse(getArrayFromDb());
        for (var i = 0; i < GLOBAL_ARTICLES.length; i++)
            GLOBAL_ARTICLES[i].createdAt = new Date(GLOBAL_ARTICLES[i].createdAt);
        tags = JSON.parse(localStorage.getItem("tags"));
    }

    function storageArticles() {
        localStorage.setItem("tags", JSON.stringify(tags));
        //localStorage.setItem("articles", JSON.stringify(GLOBAL_ARTICLES));
    }

    return {
        getArticles: getArticles,
        getArticle: getArticle,
        addArticle: addArticle,
        validateArticle: validateArticle,
        removeArticle: removeArticle,
        editArticle: editArticle,
        containsTags: containsTags,
        GLOBAL_ARTICLES: GLOBAL_ARTICLES,
        tags: tags,
        getSizeArticles: getSizeArticles,
        replaceArticles: replaceArticles,
        storageArticles: storageArticles,
        validateTags: validateTags
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
    /* DOM Загрузился.
     Можно найти в нем нужные элементы и сохранить в переменные */
    articleModel.replaceArticles();
    articleRenderer.init();
    /* Нарисуем статьи из массива GLOBAL_ARTICLES в DOM */
    renderArticles(0, 6);
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
