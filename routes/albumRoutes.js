var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
    // get albums for 1 user. May have to update code here.
    app.get("/api/albums/", function(req, res) {
        var query = {};
        if (req.query.user_id) {
            query.UserID = req.query.user_id;
        }
        db.Album.findAll({
            where: query
        }).then(function (){
            for(let i = 0; i < (req.params.name).length; i++) {
                axios.get("http://ws.audioscrobbler.com/2.0/?method=album.search&album=" 
                + req.params.name + "&api_key=c37ed91eeb7e472772c6e414db2773a3&format=json&limit=5")
            .then(function(response) {
            console.log(response.data);
            res.json(response.data)
            // response.data.results.albummatches.albumSearch.album[0].image[3]["#text"]
            // response.data.results.albummatches.albumSearch.album[0].url
            
            })
        }
    })
})
    app.post("/api/albums", function(req, res) {
        db.Album.create(req.body)
        .then(function (){
            for(let i = 0; i < (req.params.name).length; i++) {
                axios.get("http://ws.audioscrobbler.com/2.0/?method=album.search&album=" 
                + req.params.name + "&api_key=c37ed91eeb7e472772c6e414db2773a3&format=json&limit=5")
            .then(function(response) {
            console.log(response.data);
            res.json(response.data)
            // response.data.results.albummatches.albumSearch.album[0].image[3]["#text"]
            // response.data.results.albummatches.albumSearch.album[0].url
            })
         }
     })
  })
}