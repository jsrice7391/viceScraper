const path = require("path");

module.exports = (app) => {


    app.get("/about", function(req, res){
        res.render("about");
        
    })
    // app.get("/", function(req, res) {
    //     res.render("index")
    // })

}