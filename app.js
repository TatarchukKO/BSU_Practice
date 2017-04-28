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

app.get("/articles/count", articleWorker.getArticlesSize);
app.get("/articles/:id", articleWorker.getArticle);
app.put("/articles", articleWorker.getArticles);
app.post("/articles", articleWorker.addArticle);
app.delete("/articles/:id", articleWorker.removeArticle);
app.patch("/articles", articleWorker.editArticle);