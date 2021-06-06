$(document).ready(function(){
    
    // Game start by click on timer
    // once pressed all tiles appear
    $(".timer").click(function(){
        let allTiles = $(this).siblings().children();
        allTiles.children().removeClass("tile-back").removeClass(" done");

        // incorrect tile counter goes to 0
        let tilesWrong = document.querySelector(".incorrect-score").innerHTML;
            tilesWrong = 0;
            document.querySelector(".incorrect-score").innerHTML = tilesWrong;

        // all tiles shuffled
        $(".inner-ring").html($(".inner-ring .tile").sort(function(){
        return Math.random()-0.5;
        }));
    
        $(".middle-ring").html($(".middle-ring .tile").sort(function(){
         return Math.random()-0.5;
        }));
    
        $(".outer-ring").html($(".outer-ring .tile").sort(function(){
        return Math.random()-0.5;
        }));

        // class of null also added to timer prevent game to start again 
        $(this).addClass("null");
    }); 
    
    // Initiate countdown timer for the user to get ready to play
    $(".timer").click(function(){
            let gameStartIn = 4;
            let countDown = setInterval(gameStartTimer, 1000);
    
            function gameStartTimer () {
                gameStartIn = gameStartIn - 1;
                
                //condition in place to stop countdown going passed 0
                //once 0 is hit, "GO" shows up indicating start of game
                if (gameStartIn <= 0) {
                    clearInterval(countDown);
                    document.querySelector(".timer").innerHTML = `<p>GO</p>`;          
                    return;
            }   
                // to show countdown within timer
                document.querySelector(".timer").innerHTML = `<p>${gameStartIn}</p>`
                $(this).addClass("null");
        };
    }); 
    
    // Start countup timer after countdown timer to track the users playing time
    $(".timer").click(function() { setTimeout (() => {
                let allTiles = $(this).siblings().children();
                let gameSeconds = 0;
                let countUp = setInterval(countUpTimer, 1000);
    
                function countUpTimer () { 
                    gameSeconds = gameSeconds + 1;
    
                    if (gameSeconds === 0) {
                        
                    // Condition in place so that when user clicks on Reset button, timer reverts back to 0 
                    } else if ($(".reset-button").click(function(){
                        gameSeconds = 0;
                        clearInterval(countUp);
                        return;
                    })
                    ); 

                    // to show countup 1 sec increments within timer
                    document.querySelector(".timer").innerHTML = `<p>${gameSeconds}</p>`;
                    $(this).addClass("null");

                    // done class used to mark correctly matched divs
                    // to get rid of done class on divs that have been correctly matched prior to game start
                    allTiles.children().removeClass(" done");
                };
                
                }, 4000);
            });
            
            // Covers all tiles again after countdown is finished
            // Get rid of done class on divs that have been correctly matched prior to game start
            $(".timer").click(function() { setTimeout (() => {
                let allTiles = $(this).siblings().children();
                    allTiles.children("div").addClass("tile-back");
                    allTiles.children().removeClass(" done");
                }, 4000);
            });
            
            // To reset timer and all tile pieces when clicked
            $(".reset-button").click(function(){
                window.setTimeout(() => {
                    window.location.reload(true);
                }, 200);
                });
            });
    
    
    let selectedTile = null;
    let stopSelect = false;
    let tilesMatched = 0;
    
    // Tile matching functionality
    function showTile(e) {
        const target = e.currentTarget;
    
        if (
            stopSelect ||
            target === selectedTile || 
            target.className.includes(" done")
        ) {
        return;
        }
    
        target.className = target.className.replace("tile-back", " ").trim();
        target.className += " done";
    
    if (!selectedTile) {
        
        selectedTile = target;
    
    } else if (selectedTile) {
        // On condition that selected tile does not match targeted tile
        if (
            selectedTile.getAttribute("data-icon") !== 
            target.getAttribute("data-icon")
        ) {
            //select is to stop
            stopSelect = true;

            //Swap target tile with incorrect selected tile
            var TileA = target;
            var TileB = selectedTile;
            
            //Div swap function
            // Function received from Stack Overflow
            $.fn.swap = function (elem) 
            {
            elem = elem.jquery ? elem : $(elem);
            return this.each(function () 
            {
            $('<span></span>').insertBefore(this).before(elem.before(this)).remove();
            });
            };
    
            $(TileA).swap(TileB);
            
    
            //Increments incorrect matches and adds to scoreboard
            let tilesWrong = document.querySelector(".incorrect-score").innerHTML;
            tilesWrong++;
            document.querySelector(".incorrect-score").innerHTML = tilesWrong;
    
            // If incorrect tiles are selected, the tiles are covered
            // Class of done is removed/replaced with empty string
            setTimeout(() => {
                selectedTile.className = selectedTile.className.replace("done", " ").trim() + " tile-back";
                target.className = target.className.replace("done", " ").trim() + " tile-back";
    
                selectedTile = null;
                stopSelect = false;
                
            }, 800);
        } else {
            //increments tiles matched
            tilesMatched++;
            selectedTile = null;
            
            //To target to Congrats message to user
            let congratsMessage = document.querySelector(".congrats-score-message");
            let overlay = document.querySelector("#overlay");
            
            // Content in html for class incorrect-score taken and showing in id final-incorrect-score in congrats message
            let finalIncorrectScore =  $(document).ready(function() {
                    $("#final-incorrect-score").html($(".incorrect-score").html());
                });

            // Content in html for timer taken and showing in id final-time in congrats message
            let finalTime =  $(document).ready(function() {
                    $("#final-time").html($(".timer p").html());
                });

            // Content in html for timer and incorrect-score taken and added together showing in id final-overall-score in congrats message
            let overallScore =  $(document).ready(function() {
                    $("#final-overall-score").html(Number($(".timer p").html()) + Number($(".incorrect-score").html()));
                });
    
            
            // Game is beaten once 15 matches have been made
            if (tilesMatched === 15) {
                setTimeout(() => 
                {
                // Active class then applied to congrats message and overlay to show game is over
                congratsMessage.classList.add("active");
                overlay.classList.add("active");
                
                // To fix bug that caused div of class score-tally to be covered with class tile-back
                $(document).ready(function() {
                    $(".timer").siblings().children().children().removeClass("tile-back");
                });
                
                }, 250);
                
                return;
            }
        }
    }
    }

    //save users score to local storage to display on scoreboard
    function save() {
    let username = document.querySelector("#input").value;
    let timeCompleted = document.querySelector("#final-time").innerHTML;
    let totalIncorrects = document.querySelector("#final-incorrect-score").innerHTML;
    let overallScore = document.querySelector("#final-overall-score").innerHTML;
    
    // to store all users data
    let new_data = {"username":username, "time_completed":timeCompleted, "incorrect_tiles_matched":totalIncorrects, "overall_score":overallScore};
    
    // to prevent user submitting more than one score at a time to local storage
    $(document).ready(function() {
        window.setTimeout(() => {
            window.location.reload(true);
        }, 200);
        });
    
    // if nothing saved at start then save empty array
    if(localStorage.getItem("data") == null){
    localStorage.setItem("data", "[]");
    }
    
    //Takes data from local storage and store to old data variable
    let old_data = JSON.parse(localStorage.getItem("data"));

    //Adds users score old_data variable
    //Sorts overall score so that user with lowest overall score appears on top
    old_data.push(new_data);
    old_data.sort( (a,b) => a.overall_score - b.overall_score)
    
    //Stores data to local storage
    localStorage.setItem("data", JSON.stringify(old_data));
    }