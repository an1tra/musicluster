// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models")
//
// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
//
module.exports = function(app) {
//
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index");
    } else {
      res.render("index");
    }

  });
//
  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("members");
    } else {
    res.render("login");
    }
  });
//
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be 
  //redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    db.Album.findAll({
      where: {
        userId: req.user.id
      }
    }).then(function(dbAlbum) {
      req.user.Albums = dbAlbum
      res.render("members", {user: req.user});
    })
   
  });

  app.get("/search", isAuthenticated, function(req, res) {
    res.render("search", {user: req.user});
  });  
};
