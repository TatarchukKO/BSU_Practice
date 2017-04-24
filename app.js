const articleWorker = require('./serverWorkers/articleWorker');
let express = require("express");
let app = express();
let db = require("diskdb");
db.connect("./db", ["articles"]);
let bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// we need it to parse content-type application/json
app.use(bodyParser.json());

// we need it to parse content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.get("/articles", function (req, res) {
    res.json(db.articles.find());
});

app.get("/articles/count", (req, res) => {
    res.json(db.articles.count());
});
app.get("/articles/:id", function (req, res) {
    res.json(db.articles.findOne({id: req.params.id}));
});
app.put("/articles", function (req, res) {
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
});

app.post("/articles", function (req, res) {
    let article = req.body;
    const tagStr = article.tags;
    article.content.length > 600 ? article.summary = article.content.substr(0, 600) : article.summary = article.content;
    article.createdAt = new Date();
    if (articleWorker.validateTags(tagStr)) {
        article.tags = tagStr.split(",");
        if (articleWorker.validateArticle(article)) {
            res.json(db.articles.save(article));
        }
    }
});

app.delete("/articles/:id", function (req, res) {
    res.json(db.articles.remove({id: req.params.id}));
});

app.patch("/articles", function (req, res) {
    const editedArticle = req.body; 
    const articleID = editedArticle.id;
    let article = db.articles.findOne({id: articleID});
    article.title = editedArticle.title;
    article.image = editedArticle.image;
    article.content = editedArticle.content;
    article.createdAt = new Date();
    if (articleWorker.validateTags(editedArticle.tags)) {
        article.tags = editedArticle.tags.split(",");
    }
    if(articleWorker.validateArticle(article)) {
        db.articles.remove({id: articleID});
        res.json(db.articles.save(article));
    }
});

/*app.patch("/articles:id", function(req,res){
 let options = {
 multi: false,
 upsert: false
 };
 let query = db.articles.findOne({id : req.params.id});
 res.json(db.articles.update(query, req.body, options));
 });*/
