var randomNumber1 = Math.ceil(Math.random() * 6);
var randomNumber2 = Math.ceil(Math.random() * 6);
var diceImage1 = "./images/dice" + randomNumber1 + ".png";
var diceImage2 = "./images/dice" + randomNumber2 + ".png";
var title = document.querySelector("h1");

document.querySelector(".img1").setAttribute("src", diceImage1);
document.querySelector(".img2").setAttribute("src", diceImage2);

if (randomNumber1 === randomNumber2) {
    title.innerHTML = "Refresh Again";
}
else if (randomNumber1 > randomNumber2) {
    title.innerHTML = "Player 1 Wins";
}
else {
    title.innerHTML = "Player 2 Wins";
}