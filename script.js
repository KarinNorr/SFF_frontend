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
        //getMoviesBack();
    }
});

addNewStudioButton.addEventListener("click", function () {
    studioName = document.getElementById("studioName").value;
    studioPassword = document.getElementById("studioPassword").value;
    addNewStudio(studioName, studioPassword);
});

showListOfMovies();

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


    // ------------ MOVIE: --------------------------

    function showListOfMovies() {
    document.getElementById("listOfMovies").innerHTML = "";
    fetch('https://localhost:5001/api/film')
        .then(response => response.json())
        .then(data => buildButtonsOfMovies(data));
}


//listar filmer på startsidan
// function buildListOfMovies(Movies) {
//     document.getElementById("listOfMovies").innerHTML = "Följande filmer finns tillgängliga...";

//     Movies.forEach(Movie => {
//         var newDiv = document.createElement("div");
//         newDiv.className = "movielist";
//         newDiv.textContent = "FilmId: " + Movie.id + " Titel: " + Movie.name;

//         var containerDiv = document.getElementById("listOfMovies");
//         containerDiv.appendChild(newDiv);
//     });
// }


function buildButtonsOfMovies(Movies) {
    //göra om för att återanvända listfunktionen
    console.log("buildButtonsOfMovies:", Movies);
    document.getElementById("listOfMovies").innerHTML = "";

    Movies.forEach(Movie => {
        var newButton = document.createElement("button");
        newButton.className = "movieButton";
        newButton.textContent = Movie.name;
        newButton.id = Movie.id;

        // showListOfMovies();
        var containerDiv = document.getElementById("listOfMovies");
        containerDiv.appendChild(newButton);
    });
}

function buildListOfTriva(Trivias) {
    document.getElementById("listOfMovies").innerHTML = "";

    //lägga till en insertadjacenthtml med en placeholder för bild

    if (Trivias !== null) {
        Trivias.forEach(Trivia => {
            var newDiv = document.createElement("div");
            newDiv.className = "movieList";
            newDiv.textContent = "TRIVIA: " + Trivia.trivia;

            var containerDiv = document.getElementById("listOfMovies");
            containerDiv.appendChild(newDiv);
        });

    }
    else {
        document.getElementById("listOfMovies").innerHTML = "Den här filmen har ingen trivia";

    }
    getMoviesBack();
}

//för att komma tillbaks till filmerna
function getMoviesBack() {

    var startPage = document.getElementById("listOfMovies");
    startPage.insertAdjacentHTML("beforeend", "<div><br><Button id='goBack' class ='movieButton'>Tillbaks till filmerna!</Button></div>");
    var goBackButton = document.getElementById("goBack");

    goBackButton.addEventListener("click", function () {
        showListOfMovies();
    });

}


function fetchTriviaOfMovie(movieId) {
    fetch('https://localhost:5001/api/filmtrivia')
        .then(response => response.json())
        .then(data => data.filter(trivia => trivia.filmId == movieId))
        .then(data => buildListOfTriva(data));
}

// ------------ STUDIO: --------------------------

var studioLoginPage = document.getElementById("studioLogin");
if (localStorage.getItem("userId") !== "null") {
    //welcomeStudio();
}
else {
    showStudioLogin();
}


var loginButton = document.getElementById("studioLogin");
loginButton.addEventListener("click", function () {
    console.log("Knapp!");

    var getUser = document.getElementById("studio").value;
    var userPassword = document.getElementById("password").value;
    console.log(getUser + userPassword);

    fetch("https://localhost:5001/api/filmstudio")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);

            for (i = 0; i < json.length; i++) 
            {
                if (getUser == json[i].name && userPassword == json[i].password) 
                    {
                    console.log("Ja det stämmer");

                    localStorage.setItem("userId", i);
                    localStorage.setItem("userId", getUser);
                    console.log(localStorage.getItem("userId"));
                    studioLoginPage.innerHTML = "";
                    studioLoginPage.innerHTML = "Hej och välkommen " + getUser;

                    welcomeStudio();
                }
                else {
                    //showErrorLoginPage();
                }
            }

        });



    function welcomeStudio() {
        //Hälsar välkommen
        //studioLoginPage.innerHTML = "Hej och välkommen " + getUser;
        //Inputfält + knapp för att låna film 
        //Button med eventlistener som startar:
        //addRentedMovie(MovieId)

        //knapp för att logga ut
        studioLoginPage.insertAdjacentHTML("beforeend", "<div><Button id='logoutButton'>Logga ut!</Button></div>");

        var logoutButton = document.getElementById("logoutButton");

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("userId");
            //showLoginPage();
            //vy att visa?
        });
    }

    function showErrorLoginPage() {
        studioLoginPage.insertAdjacentHTML("beforeend", "<div>Har du glömt ditt lösenord?</div>")

    }

    function addRentedMovie(movieId, studioId) {
        var data = { FilmId: movieId, StudioId: studioId };
        fetch('https://localhost:5001/api/rentedfilm'), {
            headers: {
                'Content-Type': 'application/json',
                method: 'POST',
                body: JSON.stringify(
                    data
                )
                    .then(response => response.json())
                    .then(data => {
                        console.log('sucsess:', data);
                    })
            }
        }

    }


    // ------------ ADMIN: --------------------------

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
                    .then(data => {
                        console.log('sucsess:', data);
                    })
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
})
