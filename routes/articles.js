const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
const Article = require("../models/article.js");
const mongoose = require("mongoose");
const db = require("../models")





const getArticles = () => {
    // The beginning of the request from VICE
    request("https://www.vice.com/en_us", (err, response, body) => {
        // Loads the body of the page.
        const $ = cheerio.load(body);
        var results = [];
        // VICE is nice because all of their articles hide within a master div. All of their article links have the same class and are children of this parent div.
        $("div.grd-row").children().each((i, element) => {
            // This will take the links from the articles
            const link = $(element).attr("href");
            // This will be the headline for the Article 
            const headline = $(element).children().next().next().children().children("h2").text();
            // This will be the sub text for the article.
            const subText = $(element).children().next().next().children().children("div .grid__wrapper__card__text__summary").text();
            // This is the author
            const author = $(element).children().next().next().children().next().children().text()
                // const photoLink = $(element).children().next().children().next().children().children().attr("class");
        
            if(link && headline && subText && author){
                    Article.create({ title: headline, author: author, link: link, subText: subText })
                    .then(function(result) {
                        console.log(result);
                    }).catch(function(){
                        console.log("Something went wrong");
                    })
            }
        })

    })
}



module.exports = (app) => {

    app.put("/notes/:title", function(req, res){
        console.log(req.body.title)
    })

    app.get("/", function(req, res) {
        db.Article.find({}).sort({date: 1}).exec((err,articles)=>{
            if(err){throw err}else {res.render("index",{articles: articles})}
            })
    });
 
    app.get("/articles/scrape", function(req, res) {
        getArticles()
        res.redirect("/")
    })

    app.put("/save", function(req,res){
        console.log(req.body);
    db.Article.findOneAndUpdate({ _id: req.body.id }, {saved: true})
      .then(dbModel =>{
          if(dbModel){
              return res
                .status(200)
                .send({result:"good"});
          }
      })
      .catch(err => res.status(422).json(err));

    });

    app.get("/saved", function(req,res){
        db.Article.find({
            saved: true
        },function(err, results){
            if(err){
                throw err;
            }else{
                res.render("saved",{articles: results})
            }
        })
    })


    app.get("/article/:title", function(req, res){
        db.Article.findOne({ title: req.params.title })
       .populate("notes")
          .exec(function(err, article) {
            if (err) return handleError(err);
            // res.json(article);
            res.render("article", {article: article});
          });      
    })
}