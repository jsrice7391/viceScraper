const path = require("path");
const db = require("../models")




module.exports = (app) => {

    app.put("/notes", function(req, res){
        console.log(req.body.title)
    })

    app.post("/notes", function(req,res){
        db.Note.create({
            text:req.body.note
        }).then(function(dbNote){
           return  db.Article.findOneAndUpdate({ title: req.body.article }, { $push: { notes: dbNote}}, { new: true })
        }).then(function(dbArticle){
            res.redirect("/")
        })
    })

    app.get("/notes/:title", function(req,res){
        db.Article.findOne({
            title: req.params.title
        }, function(err, results){
            res.json(results)
        })
    })
    
}