const path = require("path");


module.exports = (app) => {
    app.get("/users", function(req, res) {
        res.send("This will show all the users")
    })
}