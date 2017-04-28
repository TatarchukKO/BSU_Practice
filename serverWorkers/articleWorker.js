let db = require('diskdb');
db.connect("./db", ["articles"]);

function validateArticle(article) {
    let imgRegExp = /^(?:([a-z]+):(?:([a-z]*):)?\/\/)?(?:([^:@]*)(?::([^:@]*))?@)?((?:[a-z0-9_-]+\.)+[a-z]{2,}|localhost|(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])\.){3}(?:(?:[01]?\d\d?|2[0-4]\d|25[0-5])))(?::(\d+))?(?:([^:\?\#]+))?(?:\?([^\#]+))?(?:\#([^\s]+))?$/i;
    if (article.id && article.createdAt && article.tags && article.author &&
        article.content && article.title && article.image &&
        typeof article.id === "string" && typeof  article.createdAt === "object" &&
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
    res.json(db.articles.count());
}
function getArticle(req, res) {
    res.json(db.articles.findOne({id: req.params.id}));
}
function getArticles(req, res) {
    const skip = req.body.skip || 0;
    const top = req.body.top || db.articles.count();
    const filterConfig = req.body.filterConfig;
    const artcls = db.articles.find().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    let matched_articles = artcls.filter(obj => {
            if (filterConfig) {
                let isContTags = false;
                if (filterConfig.tags) {
                    if (filterConfig.tags.some(item => {return obj.tags.includes(item);
                }))
                    {
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
                return artcls.indexOf(obj) >= skip && artcls.indexOf(obj) < top;
            }
            return artcls.indexOf(obj) >= skip && artcls.indexOf(obj) < top;
        });
    res.json(matched_articles);
}
function addArticle(req, res) {
    let article = req.body;
    const tagStr = article.tags;
    article.content.length > 600 ? article.summary = article.content.substr(0, 600) : article.summary = article.content;
    article.createdAt = new Date();
    if (validateTags(tagStr)) {
        article.tags = tagStr.split(",");
        if (validateArticle(article)) {
            res.json(db.articles.save(article));
        }
    }
}
function removeArticle(req, res) {
    res.json(db.articles.remove({id: req.params.id}));
}
function editArticle(req, res) {
    const editedArticle = req.body; 
    const articleID = editedArticle.id;
    let article = db.articles.findOne({id: articleID});
    article.title = editedArticle.title;
    article.image = editedArticle.image;
    article.content = editedArticle.content;
    article.createdAt = new Date();
    if (validateTags(editedArticle.tags)) {
        article.tags = editedArticle.tags.split(",");
        if(validateArticle(article)) {
            db.articles.remove({id: articleID});
            res.json(db.articles.save(article));
        }
    }
}
module.exports = {
    getArticlesSize,
    getArticle,
    getArticles,
    addArticle,
    removeArticle,
    editArticle
};