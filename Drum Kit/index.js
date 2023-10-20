const drum = document.querySelectorAll(".drum");
for (var i = 0; i < drum.length; i++) {
    drum[i].addEventListener("click", function () {
        var className = this.classList[0];
        new Audio(`./sounds/${className}.mp3`).play();
        this.classList.toggle("pressed");
        }
    );
}

document.addEventListener("keydown", function(event) {
    var keyword = event.key;
    var className = document.querySelector(`.${keyword}`).classList[0];
    document.querySelector(`.${keyword}`).classList.toggle("pressed");
    new Audio(`./sounds/${className}.mp3`).play();
    }
);