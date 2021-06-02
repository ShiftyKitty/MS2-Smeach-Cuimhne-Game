$(document).ready(function(){

    $(".timer").click(function(){
        let allTiles = $(this).siblings().children();
        allTiles.children().removeClass("tile-back").removeClass(" done");
    
        let tilesWrong = document.querySelector(".incorrect-score").innerHTML;
            tilesWrong = 0;
            document.querySelector(".incorrect-score").innerHTML = tilesWrong;
    
        $(".inner-ring").html($(".inner-ring .tile").sort(function(){
        return Math.random()-0.5;
        }));
    
        $(".middle-ring").html($(".middle-ring .tile").sort(function(){
         return Math.random()-0.5;
        }));
    
        $(".outer-ring").html($(".outer-ring .tile").sort(function(){
        return Math.random()-0.5;
        }));
    
        $(this).addClass("null");
    }); 
    
    $(".timer").click(function(){
            let gameStartIn = 4;
            let countDown = setInterval(gameStartTimer, 1000);
    
            function gameStartTimer () {
                gameStartIn = gameStartIn - 1;
    
                if (gameStartIn <= 0) {
                    clearInterval(countDown);
                    let go = document.querySelector(".timer").innerHTML = `
                    GO!!`;          
                    return;
            }
                document.querySelector(".timer").innerHTML = gameStartIn;
                $(this).addClass("null");
        };
    }); 
    
    $(".timer").click(function() { setTimeout (() => {
                let allTiles = $(this).siblings().children();
                let gameSeconds = 0;
                let countUp = setInterval(countUpTimer, 1000);
    
                function countUpTimer () { 
                    gameSeconds = gameSeconds + 1;
    
                    if (gameSeconds === 0) {
                        
                        
                    } else if ($(".reset-button").click(function(){
                        gameSeconds = 0;
                        clearInterval(countUp);
                        return;
                    })
                    ); 
    
                    document.querySelector(".timer").innerHTML = gameSeconds;
                    $(this).addClass("null");
                    allTiles.children().removeClass(" done");
                };
                
                }, 4000);
            });
    
            $(".timer").click(function() { setTimeout (() => {
                let allTiles = $(this).siblings().children();
                    allTiles.children().addClass("tile-back");
                    allTiles.children().removeClass(" done");
                }, 4000);
            });
    
            $(".reset-button").click(function(){
                let timer = $(this).siblings(".game-board").children(".timer");
                let resetTimer = timer.addClass("timer").addClass("timer-icon-style").removeClass("null");
                    resetTimer = document.querySelector(".timer").innerHTML = `<i class="fas fa-play"></i>`;
                    $(this).siblings(".game-board").children(".timer").children().innerHTML = ` `;
                
                $(this).siblings(".game-board").children().children().children().addClass("tile-back");
    
                let tilesWrong = document.querySelector(".incorrect-score").innerHTML;
                tilesWrong = 0;
                document.querySelector(".incorrect-score").innerHTML = tilesWrong;
    
            });
        });
    
    
    let selectedTile = null;
    let stopSelect = false;
    let tilesMatched = 0;
    
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
    
        if (
            selectedTile.getAttribute("data-icon") !== 
            target.getAttribute("data-icon")
        ) {
            stopSelect = true;
            //Swap target tile with incorrect selected tile
            var TileA = target;
            var TileB = selectedTile;
    
            
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
    
            
            setTimeout(() => {
                selectedTile.className = selectedTile.className.replace("done", " ").trim() + " tile-back";
                target.className = target.className.replace("done", " ").trim() + " tile-back";
    
                selectedTile = null;
                stopSelect = false;
                
            }, 800);
        } else {
            tilesMatched++;
            selectedTile = null;
    
            let congratsMessage = document.querySelector(".congrats-score-message");
            let overlay = document.querySelector("#overlay");
    
            let finalIncorrectScore =  $(document).ready(function() {
                    $("#final-incorrect-score").html($(".incorrect-score").html());
                });
    
            let finalTime =  $(document).ready(function() {
                    $("#final-time").html($(".timer").html());
                });
    
            let overallScore =  $(document).ready(function() {
                    $("#final-overall-score").html(Number($(".timer").html()) + Number($(".incorrect-score").html()));
                });
    
            
            
            if (tilesMatched === 15) {
                setTimeout(() => 
                {
                congratsMessage.classList.add("active");
                overlay.classList.add("active");
                
                finalIncorrectScore;
                finalTime;
                overallScore;
                
    
                $(document).ready(function() {
                    $(".timer").siblings().children().children().removeClass("tile-back");
                });
                
                }, 250);
                
                return;
            }
        }
    }
    }
    
    function save() {
    let username = document.querySelector("#input").value;
    let timeCompleted = document.querySelector("#final-time").innerHTML;
    let totalIncorrects = document.querySelector("#final-incorrect-score").innerHTML;
    let overallScore = document.querySelector("#final-overall-score").innerHTML;
    
    let new_data = {"username":username, "time_completed":timeCompleted, "incorrect_tiles_matched":totalIncorrects, "overall_score":overallScore};
    
    // if nothing saved at start then save empty array
    if(localStorage.getItem("data") == null){
    localStorage.setItem("data", "[]");
    }
    
    let old_data = JSON.parse(localStorage.getItem("data"));
    old_data.push(new_data);
    old_data.sort( (a,b) => a.overall_score - b.overall_score)
    
    localStorage.setItem("data", JSON.stringify(old_data));
    }
    