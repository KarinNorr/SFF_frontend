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


    //hämtar alla filmer och sätter igång en lista
    fetch('https://localhost:5001/api/film')
    .then(response => response.json())
    .then(data => buildListOfMovies(data));

    
    //listar filmer på startsidan
function buildListOfMovies(Movies)
{
    //göra om för att återanvända listfunktionen
    document.getElementById("listOfMovies").innerHTML = "Följande filmer finns tillgängliga...";
    
    Movies.forEach(Movie => {
        var newDiv = document.createElement("div");
        newDiv.className = "addedDiv";
        newDiv.textContent = "FilmId: " + Movie.id + " Titel: " + Movie.name + " Mer info här!"; 

        var containerDiv = document.getElementById("listOfMovies");
        containerDiv.appendChild(newDiv);
    });
}

function buildListOfTriva(id)
{
    //lägga in inpufält att välja vilken filmId man ska
    //visa upp 
    //se mer av 
    //fetch trivia med specifikt id
    //visar i diven 
    //visar också bild i divven 
}

function welcomeStudio()
{
    //Hälsar studion välkommen
    //låna filmer
}

//funktion för att ta bort film
function deleteMovie(id)
{
    console.log("Raderar film " + id);

    fetch('https://localhost:5001/api/film/' + id, {
        method: 'DELETE', 
    })
    .then(response => response.json()) 
}

function addNewMovie(name, stock)
{
    var data = {name: name, stock: stock};
    fetch('https://localhost:5001/api/film'), {
        headers: { 'Content-Type': 'application/json',
        method: 'POST',
        body: JSON.stringify({
          data
        })
        .then(response => response.json())}
    }
}