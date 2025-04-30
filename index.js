/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for (let i = 0; i < games.length; i++) {
        let gameCardDiv = document.createElement('div');
        gameCardDiv.className="game-card";

        let imgEl = document.createElement('img');
        imgEl.src = games[i].img;
        imgEl.className = "game-img";

        let h2El = document.createElement('h2');
        h2El.className = "game-name";
        h2El.textContent = games[i].name;

        let p1El = document.createElement('p')
        p1El.className = "game-description";
        p1El.textContent = games[i].description;

        let p2El = document.createElement('p')
        p2El.className = "game-backers";
        p2El.textContent = "Backers: " + games[i].backers;
        // <div class="game-card">

        //     <img src="${games[i].img}" class="game-img">
        //     <h2 class="game-name">${games[i].name}</h2>
        //     <p class="game-description">${games[i].description}</p>
        //     <p class="game-backers">&{games[i].backers}</p>

        
        // </div>
        gameCardDiv.appendChild(imgEl);
        gameCardDiv.appendChild(h2El);
        gameCardDiv.appendChild(p1El);
        gameCardDiv.appendChild(p2El);

        gamesContainer.appendChild(gameCardDiv);
    }
}

addGamesToPage(GAMES_JSON);


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
let totalContributions = GAMES_JSON.reduce((acc, contribution) => {
    return acc + contribution.backers;
}, 0);
// contributionsCard.textContent = totalContributions.toLocaleString('en-US');
contributionsCard.innerHTML = `${totalContributions.toLocaleString('en-US')}`;




// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalRaised = GAMES_JSON.reduce((acc, funds) => {
    return acc + funds.pledged;
}, 0);

raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`;



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
let totalGames = GAMES_JSON.reduce((acc) => {
    return acc + 1;
}, 0);

gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter((game) => {
        return game.goal > game.pledged;
    }, 0);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter((game) => {
        return game.pledged > game.goal;
    }, 0);


    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedTotal = GAMES_JSON.reduce((acc, game) => {
    return acc + (game.goal > game.pledged ? 1 : 0);
}, 0);


// create a string that explains the number of unfunded games using the ternary operator
let unfundedStr = `A total of $${totalRaised} has been raised for ${totalGames} games. Currently, ${unfundedTotal == 1 ? unfundedTotal + " game remains" : unfundedTotal + " games remain"}
 unfunded. We need your help to fund these remaining games!`;

// create a new DOM element containing the template string and append it to the description container
let descriptionElement = document.createElement('p');
descriptionElement.textContent = unfundedStr;
descriptionContainer.appendChild(descriptionElement);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstFunded, secondFunded, ...rest] = sortedGames;


// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstEl = document.createElement('p');
firstEl.textContent = firstFunded.name;
firstGameContainer.appendChild(firstEl);

// do the same for the runner up item
let secondEl = document.createElement('p');
secondEl.textContent = secondFunded.name;
secondGameContainer.appendChild(secondEl);
