$("#run-search").on("click", function(event) {
    event.preventDefault();
    
    var albumName = $("#search-album").val().trim();
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + albumName + "&api_key=c37ed91eeb7e472772c6e414db2773a3&format=json&limit=5"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var albumSearch = response.results.albummatches.album[0];
        if(!albumSearch) {
            alert("We couldn't find that album.")
        } else {
            console.log(albumSearch)
            
            // variables created from AJAX search
            var albumTitle = albumSearch.name 
            var albumArtist = albumSearch.artist
            var albumCover = albumSearch.image[3]["#text"]
            var albumLink = albumSearch.url

            // moving to Modal
            $("#albumName").text(albumTitle)
            $("#albumArtist").text(albumArtist)

            $(".albumCover").attr("src", albumCover)
            $(".albumCover").attr("url-link", albumLink)
            $(".albumCover").on("click", function(){
            window.open(albumLink, "_self");
            })

            $("#saveToCluster").on("click", function(event){
            event.preventDefault()
            postAlbum(albumTitle, albumArtist, albumCover, albumLink);
            alert("Album added!")
            location.reload()
            });            
        };
    })
})

// AJAX POST to create new Albums entry
function postAlbum(name, artist, cover, link) {
    var newAlbum = ({name: name,
                    artist: artist,
                    cover: cover,
                    link: link})
    $.ajax("/api/albums", {
        type: "POST",
        data: newAlbum
    }).then(function() {
        console.log(name)
    })
  }