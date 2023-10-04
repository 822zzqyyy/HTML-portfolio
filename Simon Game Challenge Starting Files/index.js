$(document).keypress(() => {
    if (($("#level-title").text() === "Press A Key to Start") | ($("#level-title").text() === "Game Over, Press A Key to Start")) {
        $("#level-title").text("LEVEL 1 1");
        var i = 0;
        gameQueue = [];
        Challenge();                                       //first animation

        $(".btn").click(function(evt) {
            var $this = $(this)
            $this.addClass("pressed");
            setTimeout(function() {
                    $this.removeClass("pressed");
                    }, 
                200
                );                                        //animation
            var sounds = evt.target.id;
            if (sounds !== gameQueue[i]) {
                $("#level-title").text("Game Over, Press A Key to Start");
                new Audio(src = "./sounds/wrong.mp3").play();
                $(".btn").unbind("click");  
                }
            else {
                new Audio(src = `./sounds/${sounds}.mp3`).play();
                i ++;// sounds;
                if (i === gameQueue.length) {
                    i = 0;
                    setTimeout(Challenge(),5000);
                    console.log(gameQueue);
                    $("#level-title").text(`LEVEL 1 ${gameQueue.length}`);
                }
                }
            }        
        )
        }
    else {
        $(document).unbind("keypress");                       //remove eventlistener
        }
    }
)



let gameQueue = [];
function Selector() {  
    switch (Math.round(Math.random() * 3)) {
        case 0:
            var selector = "green";
            break;
        case 1:
            selector = "red";
            break;
        case 2:
            selector = "yellow";
            break;
        case 3:
            selector = "blue";
            break;
        default:
            break;
        }
    gameQueue.push(selector);
    return selector;
}

function Challenge() {
    var sounds = Selector();
    var $this = $(`.${sounds}`);
    new Audio(src = `./sounds/${sounds}.mp3`).play(); 
    $this.fadeOut();
    setTimeout(
        () => {
            $this.fadeIn();
            }, 200
        ); 
}