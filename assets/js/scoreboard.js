document.addEventListener("DOMContentLoaded", function() {


let userScoreboard = document.getElementById("user-scoreboard");
let userScores = JSON.parse(localStorage.getItem("data")) || [];

userScoreboard.innerHTML = userScores.map(data => {
    return `<tr>
                <td> </td>
                <td>${data.username}</td>
                <td>${data.time_completed}</td>
                <td>${data.incorrect_tiles_matched}</td>
                <td>${data.overall_score}</td>
            </tr>`
    })
    .join("");

});