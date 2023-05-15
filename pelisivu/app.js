// First we make an empty array for our games into browser cache. This is not the same as localStorage.
let games = [];

// Then we read all the game data from localStorage and save it into the games array
function loadData() {
    games = JSON.parse(localStorage.getItem("games"));
    console.log(games);
}

// This function renders new elements into the HTML based on what data is in "games"
function displayGames() {
    // This for loop prints the items from our games list to the page
    // for-luuppi käy läpi games-listan, ja tulostaa HTML-sivulle joka pelistä sen ominaisuudet
    for (let index = 0; index < games.length; index++) {
        // nimitetään jokaista läpi luupattavaa peliä sanalla "game"
        let game = games[index];
        // luodaan pelille oma div-elementti nimellä "gamebox"
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

        // luodaan p-elementti, jossa lukee pelin genre, ja liitetään se gameboxiin
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

        // tehdään pelille oma poistonappula
        let buttons = document.createElement("div");
        buttons.innerHTML =
        `<input type="button" value="Delete" onclick="deleteGame(${index})" class="ctrlBtn">
         <input type="button" value="Edit" onclick="editGame(${index})" class="ctrlBtn">`;
        gamebox.appendChild(buttons);

        // sijoitetaan pelin oma "gamebox" elementti HTML-sivun "container"-elementtiin
        document.getElementById("container").appendChild(gamebox);
    }
}

// Testataan syötetyn JSON-datan tulostusta sivulle tallennusta varten
// console.log(`<hr/><h2>Data JSON</h2><p style="color:#fff"><strong>Copy paste this into an external file to store or hardcode new games data:</strong></p><p style="color:#fff">${JSON.stringify(games)}</p>`);

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
    console.log(newGame);
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

// poistetaan peli halutulla indeksinumerolla
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

function resetGameData() {
    // clear ei pakollinen - varo käyttöä, jos localStoragessa on muutakin dataa!
    localStorage.clear();   
    // aseta "games"-avaimella tallennetun datan arvoksi stringifioitu gamesData, eli yllä näkyvä taulukko, jossa on peliobjektit 
    localStorage.setItem("games", JSON.stringify(gamesData));
    // lataa sivu uudelleen
    location.reload();
}
// Suoritetaan halutut funktiot heti kun sivu ladataan / Run functions immediately on page load
loadData();
displayGames();