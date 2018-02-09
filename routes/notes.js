const path = require("path");
const db = require("../models")




module.exports = (app) => {

    app.put("/notes", function(req, res){
        console.log(req.body.title)
    })

    app.get("/notes/:title", function(req,res){
        db.Article.findOne({
            title: req.params.title
        }, function(err, results){
            res.json(results)
        })
    })
    


}