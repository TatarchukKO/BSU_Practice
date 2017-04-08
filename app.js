var express = require('express');
var app = express();
let db = require("diskdb");
db.connect("./db", ["articles"]);
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// we need it to parse content-type application/json
app.use(bodyParser.json());

// we need it to parse content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

app.get("/articles", function (req, res){
    res.json(db.articles.find());
});

app.get("/articles/:id", function(req, res){
    res.json(db.articles.findOne({id : req.params.id}));
});

app.post("/articles", function(req, res){
    res.json(db.articles.save(req.body));
});

/*app.delete("/articles", function(req,res){
    res.json(db.articles.remove({id : req.body.id}));
});*/

app.delete("/articles/:id", function(req,res){
    res.json(db.articles.remove({id : req.params.id}));
});

app.patch("/articles", function(req,res){
    let options = {
        multi: false,
        upsert: false
    };
    let query = db.articles.findOne({id : req.body.id});
    res.json(db.articles.update(query, req.body, options));
});

app.patch("/articles:id", function(req,res){
    let options = {
        multi: false,
        upsert: false
    };
    let query = db.articles.findOne({id : req.params.id});
    res.json(db.articles.update(query, req.body, options));
});
