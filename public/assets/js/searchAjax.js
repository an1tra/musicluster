$("#run-search").on("click", function(event) {
    event.preventDefault();
    
    var albumName = $("#search-album").val().trim();
    var queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" + albumName + "&api_key=c37ed91eeb7e472772c6e414db2773a3&format=json&limit=5"
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var albumSearch = response.results.albummatches.album[0];
        console.log(albumTitle)
        if(!albumSearch) {
            alert("We couldn't find that album.")
        } else {
            console.log(albumSearch)
            clear()
            
            var albumTitle = albumSearch.name 
            var pOne = $("<p>").text("Album Name: " + albumSearch.name);
            var pTwo = $("<p>").text("Album Artist: " + albumSearch.artist);
            
            var AlbumCover = $("<img class='cover'>");
            AlbumCover.attr("src", albumSearch.image[3]["#text"]);
            AlbumCover.attr("url-link", albumSearch.url);

            var addButton = $("<button>");
            addButton.text("Add to Cluster");
            addButton.attr("id", "albumResult")
            console.log(albumSearch.url)

            $("#album-section").append(pOne);
            $("#album-section").append(pTwo);
            $("#album-section").append(AlbumCover);
            $("#album-section").append(addButton);

            $(".cover").on("click", function(){
            window.open(albumSearch.url, "_self");
            })

            $(document).on("click", "#albumResult", function(event){
            event.preventDefault()
            postAlbum(albumTitle);
            alert("Album Added")
            location.reload()
            });            
        };
    })
})


function clear() {
    $("#album-section").empty();
}

function postAlbum(title) {
    var newAlbum = {name: title}
    $.ajax("/api/albums", {
        type: "POST",
        data: newAlbum
    }).then(function() {
        console.log(name)
        alert("Album added!")
    })
  }

$("#clear-all").on("click", clear);