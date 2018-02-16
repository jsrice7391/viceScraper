const path = require("path");
const db = require("../models")




module.exports = (app) => {

    app.put("/notes", function(req, res){
     db.Note.findByIdAndRemove(req.body.id)
     .then(note => res.redirect(`/`))
    .catch(err => res.status(422).json(err));
    })

    app.post("/notes", function(req,res){
        db.Note.create({
            text:req.body.note
        }).then(function(dbNote){
           return  db.Article.findOneAndUpdate({ title: req.body.article }, { $push: { notes: dbNote}}, { new: true })
        }).then(function(dbArticle){
            res.redirect(`/article/${dbArticle.title}`)
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