var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
    // get albums for 1 user. May have to update code here.
    app.get("/api/albums", function(req, res) {
        // var query = {};
        // if (req.query.user_id) {
        //     query.UserID = req.query.user_id;
        // }
        db.Album.findAll({
            attributes: ['name']
            
            // where: query
        })
        .then(function (){
            console.log(res.data);
            res.json(res.data)
            // response.data.results.albummatches.album[0].image[3]["#text"]
            // response.data.results.albummatches.album[0].url
            })
        })
    

    app.post("/api/albums", function(req, res) {
        db.Album.create(req.body)
        .then(function (){
            res.json(res.data)
            })
         })
    }