const articleModel = (function () {
  function getArticlesSizeFromDb() {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/articles/count');
      request.onload = () => {
        if (request.status === 200) {
          resolve(Number(request.responseText));
        }
      };
      request.onerror = () => {
        reject(new Error('Error getting articles size'));
      };
      request.send();
    });
  }

  function getArticlesFromDb(skip, top, filterConfig) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('PUT', '/articles');
      request.setRequestHeader('content-type', 'application/json');
      request.onload = () => {
        if (request.status === 200) {
          const res = JSON.parse(request.responseText);
          res.articles.forEach(article => {
            article.createdAt = new Date(article.createdAt);
          });
          resolve(res);
        }
      };
      request.onerror = () => {
        reject(new Error('Error'));
      };
      request.send(JSON.stringify({skip, top, filterConfig}));
    });
  }

  function getArticleFromDb(id) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/articles/' + id);
      request.onload = () => {
        if (request.status === 200) {
          resolve(JSON.parse(request.responseText));
        }
      };
      request.onerror = () => {
        reject(new Error('getting article error'));
      };
      request.send();
    });
  }

  function editArticleFromDb(article) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('PATCH', '/articles');
      request.setRequestHeader('content-type', 'application/json');
      request.onload = () => {
        if (request.status === 200) {
          resolve();
        }
      };
      request.onerror = () => {
        reject(new Error('edit Error'));
      };
      request.send(JSON.stringify(article));
    });
  }

  function addArticleInDb(article) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', '/articles');
      request.setRequestHeader('content-type', 'application/json');
      request.onload = () => {
        if (request.status === 200) {
          resolve();
        }
      };
      request.onerror = () => {
        reject(new Error('add article Error'));
      };
      request.send(JSON.stringify(article));
    });
  }

  function removeArticleFromDb(id) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('DELETE', `/articles/${id}`);
      request.onload = () => {
        if (request.status === 200) {
          resolve();
        }
      };
      request.onerror = () => {
        reject(new Error('remove article Error'));
      };
      request.send();
    });
  }

  function validateArticle(article) {
    const imgRegExp = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
    if (article.tags && article.author &&
      article.content && article.title && article.image &&
      typeof article.tags === "string" && typeof  article.author === "string" &&
      typeof  article.content === "string" && typeof  article.title === "string" &&
      article.title.length > 0 && article.image.search(imgRegExp) !== -1 &&
      article.tags.length > 0 && article.content.length > 0 && article.author.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function validateTags(tagsStr) {
    if (tagsStr.length > 0)
      return true;
    else
      return false;
  }

  return {
    getArticlesFromDb: getArticlesFromDb,
    getArticlesSizeFromDb: getArticlesSizeFromDb,
    getArticleFromDb: getArticleFromDb,
    editArticleFromDb: editArticleFromDb,
    addArticleInDb: addArticleInDb,
    removeArticleFromDb: removeArticleFromDb,
    validateArticle: validateArticle,
    validateTags: validateTags,
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
    const articlesNodes = renderArticles(articles);
    /* вставим HTML элементы в '.article-list' элемент в DOM. */
    articlesNodes.forEach((node) => {
      ARTICLE_LIST_NODE.appendChild(node);
    });
  }

  function removeArticlesFromDom() {
    ARTICLE_LIST_NODE.innerHTML = '';
  }

  function renderArticles(articles) {
    /* каждый объект article из массива преобразуем в HTML элемент */
    return articles.map(article => renderArticle(article));
  }

  function renderArticle(article) {
    /*
     Используем template из DOM, заполним его данными конкретной статьи - article.
     Этот код можно сделать лучше ...
     */
    const template = ARTICLE_TEMPLATE;
    template.content.querySelector('.article-list-item').dataset.id = article._id;
    template.content.querySelector('.article-list-item-title').textContent = article.title;
    template.content.querySelector('.article-list-item-summary').textContent = article.summary;
    template.content.querySelector('.article-list-item-author').textContent = article.author;
    template.content.querySelector('.article-list-item-date').textContent = new Date(article.createdAt).toDateString();
    template.content.querySelector('.article-list-item-img').setAttribute('src', article.image);
    /*
     Склонируем полученный контент из template и вернем как результат
     */
    return template.content.querySelector('.article-list-item').cloneNode(true);
  }

  /* Date -> 16/05/2015 09:50 */
  function formatDate(d) {
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${
      d.getHours()}:${d.getMinutes()}`;
  }

  return {
    init,
    insertArticlesInDOM,
    removeArticlesFromDom
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
  const top = showMoreNews.getNewsAmountOnPage();
  authorizationModel.getUsername().then((response) => {
      userName = response;
      renderArticles(0, top);
    }, () => {
      renderArticles(0, top);
    }
  );
}
function renderArticles(skip, top, filterConfig) {
  return new Promise((resolve) => {
    articleRenderer.removeArticlesFromDom();
    articleModel.getArticlesFromDb(skip, top, filterConfig).then((response) => {
      articleRenderer.insertArticlesInDOM(response.articles);
      totalArticlesAmount = response.size;
      resolve();
    });
  });
}
