const path = require("path");
const cheerio = require("cheerio");
const request = require("request");
const Article = require("../models/article.js");


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

            Article.create({ title: headline, author: author, link: link, subText: subText }).then(function(result) {
                return result;
            })

        })

    })
}



module.exports = (app) => {

    app.get("/", function(req, res) {
        res.render("index")
    })
    app.get("/articles/scrape", function(req, res) {
        getArticles()
        res.send("Check the console for the articles")
    })
}