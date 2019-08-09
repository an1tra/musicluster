var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
    // get albums for 1 user. May have to update code here.
    app.get("/api/albums", function(req, res) {
        db.Album.findAll({})
        .then(function (){
            console.log(res.data);
            res.json(res.data)
            // response.data.results.albummatches.album[0].image[3]["#text"]
            // response.data.results.albummatches.album[0].url
            })
        })
    

    app.post("/api/albums", function(req, res) {
        console.log(req);
        var newAlbum = req.body;
        newAlbum.UserId = req.user.id;
        db.Album.create(req.body)
        .then(function (){
            res.json(res.data)
            })
         })
    }