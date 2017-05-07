const ArticleModel = require('../db/mongo/mongo').ArticleModel;

function validateArticle(article) {
  let imgRegExp = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
  if (article.createdAt && article.tags && article.author &&
    article.content && article.title && article.image &&
    typeof  article.createdAt === "object" &&
    typeof article.tags === "object" && typeof  article.author === "string" &&
    typeof  article.content === "string" && typeof  article.title === "string" &&
    article.title.length > 0 && article.image.search(imgRegExp) !== -1 &&
    article.tags.length > 0 && article.tags.length < 6 &&
    article.content.length > 0 && article.author.length > 0) {
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

function getArticlesSize(req, res) {
  ArticleModel.count((err, size) => {
    err ? res.sendStatus(500) : res.json(size);
  });
}
function getArticle(req, res) {
  ArticleModel.findById(req.params.id, (err, article) => {
    if (!article) {
      res.statusCode = 404;
      res.send({error: 'not found'});
    }
    err ? res.sendStatus(500) : res.json(article);
  });
}
function getArticles(req, res) {
  const skip = req.body.skip || 0;
  const filterConfig = req.body.filterConfig;
  let counter = 0;
  let top;
  let artcls = [{}];
  ArticleModel.count().exec((err, size) => {
    if (err)
      res.sendStatus(500);
    else {
      top = req.body.top || size;
      ArticleModel.find().exec((err, result) => {
        if (err)
          res.sendStatus(500);
        else {
          artcls = result;
          artcls.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          let matched_articles = artcls.filter(obj => {
            if (filterConfig) {
              let isContTags = false;
              if (filterConfig.tags) {
                console.log(filterConfig.tags);
                console.log(obj.tags);
                if (filterConfig.tags.some(item => {
                    return obj.tags.includes(item);
                  })) {
                  isContTags = true;
                }
                if (isContTags === false) {
                  return false;
                }
              }
              if (filterConfig.author && filterConfig.author !== obj.author) {
                return false;
              }
              if (filterConfig.search && !obj.title.toLowerCase().includes(filterConfig.search)) {
                return false;
              }
              if (filterConfig.date && new Date(filterConfig.date).toDateString() !== new Date(obj.createdAt).toDateString()) {
                return false;
              }
              counter++;
              return counter <= 6;
            }
            return artcls.indexOf(obj) >= skip && artcls.indexOf(obj) < top;
          });
          res.json(matched_articles);
        }
      });
    }
  });
}
function addArticle(req, res) {
  let article = req.body;
  const tagStr = article.tags;
  article.content.length > 600 ? article.summary = article.content.substr(0, 600) : article.summary = article.content;
  article.createdAt = new Date();
  if (validateTags(tagStr)) {
    article.tags = tagStr.split(', ');
    if (validateArticle(article)) {
      new ArticleModel(article).save(err => {
        err ? res.sendStatus(500) : res.sendStatus(200);
      })
    }
  }
}
function removeArticle(req, res) {
  ArticleModel.findByIdAndRemove(req.params.id, err => {
    err ? res.sendStatus(500) : res.sendStatus(200);
  });
}
function editArticle(req, res) {
  const newFields = req.body;
  newFields.content.length > 600 ? newFields.summary = newFields.content.substr(0, 600) : newFields.summary = newFields.content;
  newFields.createdAt = new Date();
  newFields.tags = newFields.tags.split(',');
  ArticleModel.findByIdAndUpdate(newFields.id, newFields, err => {
    err ? res.sendStatus(500) : res.sendStatus(200);
  });
}
module.exports = {
  getArticlesSize,
  getArticle,
  getArticles,
  addArticle,
  removeArticle,
  editArticle
};