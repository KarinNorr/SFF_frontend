fetch('https://localhost:5001/api/film')
    .then(function (response){
        return response.json()
    })
    .then(function(json){
        console.log("Filmer: ", json);
        //sorterar ut dem som har fler än 4 filmer i stocken
        var result = json.filter(a => a.stock >= 4);
    console.log(result);
    // buildList(result);
    })
    //sortera ut filmer som har mer än >= 1 i stock



    fetch('https://localhost:5001/api/film')
    .then(response => response.json())
    .then(data => buildList(data));

    
    //listar filmer på startsidan
function buildList(Movies)
{
    document.getElementById("listOfMovies").innerHTML = "Följande filmer finns tillgängliga...";
    
    Movies.forEach(Movie => {
        var newDiv = document.createElement("div");
        newDiv.className = "addedDiv";
        newDiv.textContent = "Titel: " + Movie.name + ", Id: " + Movie.id;

        var containerDiv = document.getElementById("listOfMovies");
        containerDiv.appendChild(newDiv);
    });
}