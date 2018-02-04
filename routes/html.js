const path = require("path");

module.exports = (app) => {

    app.get("/", function(req, res) {
        res.send("First route works")
    })

}