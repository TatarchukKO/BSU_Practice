const ArticleModel = require('../db/mongo/mongo').ArticleModel;

function validateArticle(article) {
  let imgRegExp = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
  if (article.createdAt && article.tags && article.author &&
    article.content && article.title && article.image &&
    typeof  article.createdAt === "string" &&
    typeof article.tags === "object" && typeof  article.author === "string" &&
    typeof  article.content === "string" && typeof  article.title === "string" &&
    article.createdAt.length > 0 && article.title.length > 0 && article.image.search(imgRegExp) !== -1 &&
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
  const fConfig = req.body.filterConfig;
  let filter = {};
  if (fConfig) {
    if (fConfig.author)
      filter.author = fConfig.author;
    if (fConfig.createdAt) {
      filter.createdAt = {
        $gte: new Date(fConfig.createdAt),
        $lt: new Date(new Date(fConfig.createdAt).getTime() + 24 * 60 * 60 * 1000)
      };
    }

    if (fConfig.tags)
      filter.tags = {$all: fConfig.tags};
  }
  ArticleModel.find(filter).sort({createdAt: -1}).skip(req.body.skip).limit(req.body.top).exec((err, articles) => {
    err ? res.sendStatus(500) : res.send(articles);
  });
}
function addArticle(req, res) {
  const article = req.body;
  const tagStr = article.tags;
  article.content.length > 600 ? article.summary = article.content.substr(0, 600) : article.summary = article.content;
  article.createdAt = new Date();
  article.tags = tagStr.split(/[\s\W]+/);
  new ArticleModel(article).save(err => {
    err ? res.sendStatus(500) : res.sendStatus(200);
  })
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
  newFields.tags = newFields.tags.split(/[\s\W]+/);
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