var saveMoviebutton = document.getElementById("");
var saveRentedMovieButton = document.getElementById("");
var addNewStudioButton = document.getElementById("addStudio");
var movieList = document.getElementById("listOfMovies");

movieList.addEventListener("click", function (movie) {
    document.getElementById("listOfMovies").innerHTML = "Filminfo";
    var movieId = movie.target.id;
    document.getElementById("listOfMovies").innerHTML = "Du tryckte på id: " + movieId;
    if (movieId !== "listOfMovies") {
        fetchTriviaOfMovie(movieId);
    }

});

addNewStudioButton.addEventListener("click", function () {
    studioName = document.getElementById("studioName").value;
    studioPassword = document.getElementById("studioPassword").value;
    addNewStudio(studioName, studioPassword);
});


fetch('https://localhost:5001/api/film')
    .then(function (response) {
        return response.json()
    })
    .then(function (json) {
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
    .then(data => buildButtonsOfMovies(data));


//listar filmer på startsidan
function buildListOfMovies(Movies) {
    //göra om för att återanvända listfunktionen
    document.getElementById("listOfMovies").innerHTML = "Följande filmer finns tillgängliga...";

    Movies.forEach(Movie => {
        var newDiv = document.createElement("div");
        newDiv.className = "movielist";
        newDiv.textContent = "FilmId: " + Movie.id + " Titel: " + Movie.name;

        var containerDiv = document.getElementById("listOfMovies");
        containerDiv.appendChild(newDiv);
    });
}

//knappar
//addera eventlistener så att man kan klicka vidare
function buildButtonsOfMovies(Movies) {
    //göra om för att återanvända listfunktionen
    document.getElementById("listOfMovies").innerHTML = "";

    Movies.forEach(Movie => {
        var newButton = document.createElement("button");
        newButton.className = "movieButton";
        newButton.textContent = Movie.name;
        newButton.id = Movie.id;
        newButton.onclick = {

            //hämta triva med samma movieid
            //
        }

        var containerDiv = document.getElementById("listOfMovies");
        containerDiv.appendChild(newButton);
    });
}


function buildListOfTriva(Trivias) {
    document.getElementById("listOfMovies").innerHTML = "Här kommer trvia: "

    Trivias.forEach(Trivia => {
        var newDiv = document.createElement("div");
        newDiv.className = "movieList";
        newDiv.textContent = "Trivia om film: " + Trivia.trivia;

        var containerDiv = document.getElementById("listOfMovies");
        containerDiv.appendChild(newDiv);
    });
}


function fetchTriviaOfMovie(movieId) {
    fetch('https://localhost:5001/api/filmtrivia')
        .then(response => response.json())
        .then(data => data.filter(trivia => trivia.filmId == movieId))
        .then(data => buildListOfTriva(data))
        .then(data => console.log(data));
    
}

function welcomeStudio() {
    //Hälsar studion välkommen
    //låna filmer
}

//funktion för att ta bort film
function deleteMovie(id) {
    console.log("Raderar film " + id);

    fetch('https://localhost:5001/api/film/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
}

function addNewMovie(name, stock) {
    var data = { name: name, stock: stock };
    fetch('https://localhost:5001/api/film'), {
        headers: {
            'Content-Type': 'application/json',
            method: 'POST',
            body: JSON.stringify(
                data
            )
                .then(response => response.json())
        }
    }
}

function addNewStudio(name, password) {
    var data = { name: name, password: password }
    console.log("Startar metod addNewStudio")
    fetch('https://localhost:5001/api/filmstudio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('sucsess:', data);
        })
};

