/* This file keeps a "games" list in memory and contains functions that load,
display and edit the data in the list and it's copy in browser localStorage.*/

// When the page loads, we make an empty array for our games into browser cache.
// This is not the same as localStorage.
let games = [];

// Then we read all the game data from browser's localStorage and save it into the games array.
// This function is called in the end of this file.
function loadData() {
    games = JSON.parse(localStorage.getItem("games"));
    console.log(games);
}

// This function renders the web page.
// It builds new elements into the HTML based on what data is in "games" array.
// Called at the end of this file.
function displayGames() {
    // Tämä for-luuppi tulostaa sivulle games-listan pelien datan mukaisen sisällön
    for (let index = 0; index < games.length; index++) {
        // jokainen listan elementti vuorollaan tallennetaan muuttujaan "game"
        let game = games[index];

        // luodaan pelille oma div-elementti class-nimellä "gamebox"
        let gamebox = document.createElement("div");
        // asetetaan gamebox-elementin luokaksi "gamebox"
        gamebox.className = "gamebox";

        // luodaan pelille otsikko-elementti
        let gametitle = document.createElement("h2");
        // asetetaan otsikko-elementin tekstiksi pelin nimi, joka haetaan pistenotaatiolla
        gametitle.textContent = game.name;
        // Luodaan pelin linkki-elementti
        let gamelink = document.createElement("a");
        // asetetaan linkin osoite hakemalla se pelin datasta pistenotaatiolla
        gamelink.href = game.url;
        // lisätään pelin otsikko-elementti linkki-elementin sisään
        gamelink.appendChild(gametitle);
        // lisätään linkki-elementti pelin "gamebox" - elementin sisään
        gamebox.appendChild(gamelink);

        // luodaan pelille kuva-elementti
        let gamepic = document.createElement("img");
        // asetetaan kuvan lähteeksi se osoite, joka on pelin image-ominaisuuden arvona
        gamepic.src = game.image;
        // annetaan pelin kuvalle luokka "gamepic" myöhempää css-muotoilua varten
        gamepic.className = "gamepic";
        // liitetään kuva pelin "gamebox"-elementin sisään
        gamebox.appendChild(gamepic);

        // luodaan p- eli tekstikappale-elementti, jossa lukee pelin genre, ja liitetään se gameboxiin
        let gameGenre = document.createElement("p");
        gameGenre.textContent = "Genre: " + game.genre;
        gamebox.appendChild(gameGenre);

        // sama juttu pelin julkaisuvuodelle
        let releaseYear = document.createElement("p");
        releaseYear.textContent = "Release year: " + game.releaseYear;
        gamebox.appendChild(releaseYear);

        // ja vielä sama temppu pelin "metascorelle"
        let gameScore = document.createElement("p");
        gameScore.textContent = "Metascore: " + game.score;
        gamebox.appendChild(gameScore);

        // tehdään pelille oma poisto- ja muokkausnappula
        let buttons = document.createElement("div");
        buttons.innerHTML =
        `<input type="button" value="Delete" onclick="deleteGame(${index})" class="ctrlBtn">
         <input type="button" value="Edit" onclick="editGame(${index})" class="ctrlBtn">`;
        gamebox.appendChild(buttons);

        // sijoitetaan pelin oma "gamebox" elementti HTML-sivun "container"-elementtiin
        document.getElementById("container").appendChild(gamebox);
    }
}

// This function adds a new game to the games-array and saves the updated array to localStorage
// Called from the Add-button in the web page
function addGame() {
    // luodaan uusi pelidata JSON-objekti, jolle haetaan lomakkeen kentistä ominaisuudet (property)
    let newGame = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        image: document.getElementById("image").value,
        releaseYear: document.getElementById("year").value,
        score: document.getElementById("score").value,
        url: document.getElementById("url").value,
    };
    // console.log(newGame);
    // ennen tallennusta tarkistetaan, että newGame-objektin arvot eivät ole tyhjiä
    // tässä vain yksi tarkistus, jatka if-lauseketta lisäämällä vaihtoehtoisia tarkistuksia
    if (newGame.name == "") {
        // TODO: näytetään käyttäjälle esim. "alert" (googlaa), jossa sanotaan mikä meni pieleen
        // keskeytetään funktion suoritus
        return;
    }
    // jos tarkistukset meni läpi, lisätään uusi peli välimuistissa olevaan games-listaan,
    // ja lista tallennetaan uusi peli localStorageen
    games.push(newGame);
    localStorage.setItem("games", JSON.stringify(games));
    location.reload();
}

// This function enables "edit mode" for a selected game.
// It loads the web page input form with selected game's data and changes the form title and button texts.
// Called when user clicks an Edit button.
function editGame(gameIndex) {
    // haetaan pelilistasta index-numerolla muokattava peli välimuistiin, muuttujaan nimeltä "editedGame"
    const editedGame = games[gameIndex];
    // haetaan lomakkeen kenttiin muokattavan pelin tiedot
    document.getElementById("name").value = editedGame.name;
    document.getElementById("genre").value = editedGame.genre;
    document.getElementById("year").value = editedGame.releaseYear;
    document.getElementById("url").value = editedGame.url;
    document.getElementById("image").value = editedGame.image;
    document.getElementById("score").value = editedGame.score;
    // vaihdetaan Add-napin teksti muotoon "Save", ja
    document.getElementById("editBtn").value = "Save";
    // asetetaan napin onclick-kutsuksi saveEditedGame-funktio (kääritään nimettömän funktion sisään)
    document.getElementById("editBtn").onclick = function (){saveEditedGame(gameIndex)};
    // vaihdetaan Add a new game -otsikko muotoon "Edit game"
    document.getElementById("formTitle").innerHTML = "Edit game";
}

// This function completes an edit made for a game.
// It creates a new game object from the input form field values,
// saves the object to games-array, and then saves that array to localStorage.
// Called from the Save-button when in edit mode.
function saveEditedGame(gameIndex) {
    // luodaan uusi peli-objekti, jolle annetaan lomakkeen kentistä löytyvät arvot
    let editedGame = {
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value, 
        releaseYear: document.getElementById("year").value,
        url: document.getElementById("url").value, 
        image: document.getElementById("image").value, 
        score: document.getElementById("score").value 
    }
    // korvataan vanha peli games-listassa uudella
    games.splice(gameIndex, 1, editedGame);
    // tallennetaan muokattu games-lista localStorageen
    localStorage.setItem("games", JSON.stringify(games));
    location.reload();
}

// Removes a selected game.
// Called from Delete button.
function deleteGame(gameIndex) {
    // poistetaan haluttu peli välimuistissa olevasta games-listasta
    games.splice(gameIndex, 1);
    // tyhjennetään koko localStorage ennen uuden games-listan tallennusta (ei pakollinen - poistaa kaikki avain-arvo-parit, älä käytä jos haluat säilyttää muun datan!)
    localStorage.clear();
    // tallennetaan välimuistissa oleva games-lista localStorageen avaimella "games"
    localStorage.setItem("games", JSON.stringify(games));
    // ladataan sivu uudestaan
    location.reload();
}

// Overwrites the value of localStorage "games" key with hardcoded data array from data.js.
// Called from Reset data button.
function resetGameData() {
    // clear ei pakollinen - varo käyttöä, jos localStoragessa on muutakin dataa!
    localStorage.clear();   
    // aseta "games"-avaimella tallennetun datan arvoksi stringifioitu gamesData, eli yllä näkyvä taulukko, jossa on peliobjektit 
    localStorage.setItem("games", JSON.stringify(gamesData));
    // lataa sivu uudelleen
    location.reload();
}

// Suoritetaan halutut funktiot heti kun sivu ladataan
// Run functions immediately on page load
loadData();
displayGames();

// Testataan syötetyn JSON-datan tulostusta sivulle tallennusta varten
// Testing to print all the JSON data into console for easy saving to an external file.
console.log("Copy paste to save all game data:" + JSON.stringify(games));
