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

addNewStudioButton.addEventListener("click", function() {
    console.log("addNewStudioButton Eventlistener");
    studioName = document.getElementById("studioName").value;
    studioPassword = document.getElementById("studioPassword").value;
    
    addNewStudio(studioName, studioPassword);

});

function addNewStudio(name, password) 
{
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
}

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
        newButton.id = Movie.id;
        newButton.textContent = Movie.id + ") " + Movie.name;




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

            var newPicture = document.createElement("picture");
            newPicture;

            var containerDiv = document.getElementById("listOfMovies");
            containerDiv.appendChild(newDiv, newPicture);
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
//------------------------------------------------

var studioLoginPage = document.getElementById("content");
if (localStorage.getItem("userId") !== "null") {
    //welcomeStudio();
}
else {
    showStudioLogin();
}

//variabel för att hålla koll på inloggad studio
var studioId;
var loginButton = document.getElementById("studioLogin");
var isLoggedin = false;

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

            for (i = 0; i < json.length; i++) {
                if (getUser == json[i].name && userPassword == json[i].password && json[i].verified == true) {
                    console.log("Ja det stämmer");
                    localStorage.setItem("userId", i);
                    localStorage.setItem("userId", getUser);
                    console.log(localStorage.getItem("userId"));

                    studioId = json[i].id;
                    isLoggedin = true;
                    welcomeStudio();
                }
            }
            if (isLoggedin == false) { showErrorLoginPage(); }

        });



    function welcomeStudio() {
        console.log("velcomeStudio");
        console.log(localStorage.getItem("userId"));

        studioLoginPage.innerHTML = "Hej och välkommen " + getUser + " Vilken film vill du låna?";
        studioLoginPage.insertAdjacentHTML("beforeend", "<div><input type='number' id='movieInput'></input><Button id='rentButton'>Låna!</Button></div>");


        var rentButton = document.getElementById("rentButton");
        rentButton.addEventListener("click", function () {
            var movieId = document.getElementById("movieInput").value;
            console.log("FilmId: " + movieId);
            console.log("StudioId: " + studioId);
            addRentedMovie(Number(movieId), studioId);
        });
        studioLoginPage.insertAdjacentHTML("beforeend", "<div>Skriv in din Triva här:   Film-Id här:</div>");
        studioLoginPage.insertAdjacentHTML("beforeend", "<div><input type='text' id='triviaInput'></input><input type='text' id='triviaMovieId'></input><Button id='inputTrivia'>Skicka in!</Button></div>");
        studioLoginPage.insertAdjacentHTML("beforeend", "<div>Lämna tillbaks film nedan:</input></div>");
        studioLoginPage.insertAdjacentHTML("beforeend", "<div><input type='text' id='triviaInput'></input><Button id='returnMovie'>Lämna tillbaks!</Button></div>");


        let triviaButton = document.getElementById("inputTrivia");
        triviaButton.addEventListener("click", function () {
            let movieId = document.getElementById("triviaMovieId").value;
            let triviaText = document.getElementById("triviaInput").value;
            console.log("eventlistener triviaButton");
            console.log(triviaText);
            addTrivia(Number(movieId), triviaText);
        })
        //Button med eventlistener som startar:
        //addRentedMovie(MovieId)

        //knapp för att logga ut
        //logOutStudio();
    }

    function logOutStudio() {
        console.log("logOutStudio");
        studioLoginPage.insertAdjacentHTML("beforeend", "<div><Button id='logoutButton'>Logga ut!</Button></div>");

        var logoutButton = document.getElementById("logoutButton");

        //obs att kolla denna eventlistener
        logoutButton.addEventListener("click", function () {
            //variablen "userId" finns bara lokalt ifunktion ovanför
            console.log(localStorage.getItem("userId"));
            localStorage.removeItem("userId");
            //showLoginPage();
            //vy att visa?
        });
    }

    function showErrorLoginPage() {
        studioLoginPage.insertAdjacentHTML("beforeend", "<div> Du har angett något fel. Försök igen eller vänta på att ditt medlemsskap bekräftas.</div>")
    }



    function addRentedMovie(movieid, studioid) {
        var data = { filmId: movieid, studioId: studioid }
        console.log("addRentedMovie");
        fetch('https://localhost:5001/api/rentedfilm', {
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

    function addTrivia(filmid, text) {
        console.log("addTrivia");
        var data = { filmid: filmid, trivia: text };
        fetch('https://localhost:5001/api/filmtrivia', {
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



// ------------ ADMIN: --------------------------




//funktion för att ta bort film
function deleteMovie(id) {
    console.log("Raderar film " + id);

    fetch('https://localhost:5001/api/film/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
}

// function addNewMovie(name, stock) {
//     var data = { name: name, stock: stock };
//     fetch('https://localhost:5001/api/film', {
//         headers: {
//             'Content-Type': 'application/json',
//             method: 'POST',
//             body: JSON.stringify(
//                 data),
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('sucsess:', data);
//         })
// }


})
