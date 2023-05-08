// 0. Luo uusi tiedosto! (tämä tiedosto)
// 1. Luo pelidata, eli JSON-objektit (voi copy pastettaa)
// 2. Luo lista pelidatasta (voi copy pastettaa) ("kovakoodattu")

let gamesData = [
    {
        name: "Skyrim",
        genre: "RPG",
        releaseYear: 2011,
        url: "https://elderscrolls.bethesda.net/en/skyrim",
        image: "https://h3susatredu.github.io/The_Elder_Scrolls_V_Skyrim_cover.png",
        score: 78
    },
    {
        name: "Witcher 3",
        genre: "RPG",
        releaseYear: 2015,
        url: "https://www.thewitcher.com/us/en/witcher3",
        image: "https://fingerguns.net/wp-content/uploads/2022/12/witcherheader.jpg",
        score: 960
    },
    {
        name: "Kingdom Come: Deliverance",
        genre: "RPG",
        releaseYear: 2018,
        url: "https://www.kingdomcomerpg.com/",
        image: "https://muropaketti.com/wp-content/uploads/2018/02/kingdom-come-deliverance-002-784x441.jpg",
        score: 98
    }
];


// 3. vaihtoehtoinen toteutustapa, joka toimii paremmin poisto-toiminnon kanssa:
// - tallennetaan koko games-array yhteen localStoragen key-value-pariin
function resetGameData() {
    localStorage.clear();
    localStorage.setItem("games", JSON.stringify(gamesData));
    location.reload();
}

// 3. Luo luuppi, joka käy läpi pelien listan
//    (foreach, for tai while)

// function populateLocalStorage() {

//     // first clear all previous data
//     localStorage.clear();

//     for (let index = 0; index < gamesData.length; index++) {
//         // executed code 
//         // save the game at current index in the games list into a variable called "peli"
//         const peli = gamesData[index];
//         // create the key for the game that will be saved, with a "sequential number"
//         let avain = "game" + index;
//         // convert the "peli" JSON object into a string, that we can save
//         let data = JSON.stringify(peli);
//         // save the data into localstore with the key 
//         localStorage.setItem(avain, data);

//         // you can also combine three last rows into one:
//         // localStorage.setItem(("game" + index), JSON.stringify(peli));
//     }
// }

// 4. Luupin sisällä tallenna listan kukin peli locastorageen:
//    4.0.  luo joka pelille oma avain (esim "peli1", "peli2", jne)
//    4.1.  muunna peli JSON.stringify:llä stringiksi
//    4.2.  tallenna muunnettu peli luomallasi avaimella