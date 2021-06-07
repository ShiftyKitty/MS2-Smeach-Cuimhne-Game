document.addEventListener("DOMContentLoaded", function() {

// Targets where user score is to go
// Retrieves data stored in Local Storage 
// Code from StackOverflow and Youtube. Referenced in Credits section in ReadMe doc
let userScoreboard = document.getElementById("user-scoreboard");
let userScores = JSON.parse(localStorage.getItem("data")) || [];

// Retrieves data stored in Local Storage and exports this to Scoreboard
userScoreboard.innerHTML = userScores.map(data => {
    return `<tr>
                <td>${data.username}</td>
                <td>${data.time_completed}</td>
                <td>${data.incorrect_tiles_matched}</td>
                <td>${data.overall_score}</td>
            </tr>`;
    })
    .join("");

});