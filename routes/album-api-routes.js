var db = require("../models");



module.exports = function(app) {
    // get albums for 1 user. May have to update code here.
    app.get("/api/albums/", function(req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserID = req.query.user_id
        }
        db.Album.findAll({
            where: query
        }).then(function(dbAlbum){
            res.join(dbAlbum)
        })
    })

    app.post("/api/albums", function(req, res) {
        db.Album.create(req.body).then(function(dbAlbum){
            res.json(dbAlbum)
        })
    })
};