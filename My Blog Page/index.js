function myFunction() {
    var x = document.querySelector(".nav");
    if (x.className === "nav") {
      x.className += " responsive";
    } else {
      x.className = "nav";
    }
  }

$("body>div").on("click",
  ()=>{
    $(".responsive").removeClass("responsive");
  }
);

$("body>footer").on("click",
  ()=>{
    $(".responsive").removeClass("responsive");
  }
);