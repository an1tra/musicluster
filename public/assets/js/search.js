var axios = require("axios");

// Route for storing album by mbid by specific users
app.post("/album/:mbid", function(req, res) {
  if(!req.session.userId) return;
  db.Album.create({
    userId: req.session.userId,
    album: req.params.mbid})
})
// Route for calling LastFM API without exposing api_key
app.get("/lastfm/:album", function(req, res) {
  axios.get("http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + req.params.album + "&api_key=c37ed91eeb7e472772c6e414db2773a3&format=json&limit=5").then(function(results) {
    console.log(results.data);
    res.json(results.data);
  })
})