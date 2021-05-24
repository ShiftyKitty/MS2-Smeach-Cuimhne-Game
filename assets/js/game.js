
//ensure tiles have clicked functionality in place
function showTile(e) {
    const target = e.currentTarget;
    target.className = target.className
        .replace("tile-back", "")
        .trim();
}






//shuffles all tiles on board on game start and game reset
const icons = [
    "fas fa-female",
    "fas fa-burn",
    "fas fa-cannabis",
    "fas fa-carrot",
    "fas fa-glass-martini-alt",
    "fas fa-cookie",
    "fas fa-crown",
    "fas fa-frog",
    "fas fa-gem",
    "fas fa-hippo",
    "fas fa-seedling",
    "fas fa-snowboarding",
    "fas fa-tree",
    "fas fa-horse",
    "fas fa-female",
];

let shuffleTiles = function (arr) {
    let newPos,
        temp;

    for(let i = arr.length - 1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i+1));
        temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return arr;
};

let newOrder = shuffleTiles(icons)

//ensures correctly selected tiles are matched correctly
//incorrect tile match leads to selected tiles changing places
function tileMatch () {

}

//starts the game
//all tiles shuffled
//by starting game all tiles appear for 5 sec
//after 5 sec tiles covered and timer starts
function startGame () {

}

//creates pop up when game is completed showing user score
function displayScore () {

}

//counts up all incorrect matches attempted
function incorrectScoreTally () {

}

//resets game and shuffles tiles
function resetGame () {

}

//turns off tile switching functionality for incorrect matches made
function switchOff () {

}

