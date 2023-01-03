// screen media
if (window.innerHeight > 700 )
  document.firstElementChild.firstElementChild.lastElementChild.href = window.location.href + 'css/style_big_screen.css'
//starting by moving bubbles and loading

$(
  "#load,#startUser,#startFish,#byebye,#eatFish,#gameOver,#sizeUp,#die,#win"
).on("playSound", function () {
  $(this).get(0).play();
});
$("#movingWidth").animate({ width: "100%" }, 3000, function () {
  $("#load").trigger("playSound");
  $("#loading").css("display", "none");
  page2();
});

var page2 = function (param) {
  $("#userPage").css("display", "flex");
  $("#acceptBtn").on("click", function () {
    $("#startFish").trigger("playSound");
    var cookie = $("#userName").val();
    if (cookie == "") {
      setCookie("userData", "default", "1.1.2030");
      $("#userPage").css("display", "none");
    } else {
      setCookie("userData", cookie, "1.1.2030");
      $("#userPage").css("display", "none");
    }
    page3();
  });
};
//fish page
var page3 = function () {
  $("#selectFish").css("display", "flex");
  $("#fish1").on("mouseover", function () {
    $("#char1").attr("src", "assets/Div/Character/main1hover.png");
  });
  $("#fish1").on("mouseout", function () {
    $("#char1").attr("src", "assets/Div/Character/main1.png");
  });
  $("#fish2").on("mouseover", function () {
    $("#char2").attr("src", "assets/Div/Character/main2hover.png");
  });
  $("#fish2").on("mouseout", function () {
    $("#char2").attr("src", "assets/Div/Character/main2.png");
  });
  $("#selectFishbtn").on("click", function () {
    var cookie = getCookie("userData");
    $("#startUser").trigger("playSound");

    if ($("#charSelect1").is(":checked")) {
      setCookie("userData", cookie + "," + "main1,0", "1.1.2030");
    } else if ($("#charSelect2").is(":checked")) {
      setCookie("userData", cookie + "," + "main2,0", "1.1.2030");
    } else {
      setCookie("userData", cookie + "," + "main1,0", "1.1.2030");
    }
    $("#selectFish").css("display", "none");
    page4();
  });
};

//page 4 Menu before play

var page4 = function () {
  $("#loading").css("display", "none");
  $("#gameOptions").css("display", "flex");

  var x = getCookie("userData").split(",")[0];
  $("#currentUser").text(x);
  $("#Exit").on("click", function () {
    $("#byebye").trigger("playSound");
    setTimeout(function () {
      window.close();
    }, 2000);
  });

  $("#showScore").on("click", function () {
    $("#startUser").trigger("playSound");
    $("#gameOptions").css("display", "none");
    page5();
  });

  $("#playGame").on("click", function () {
    window.open("play.html");
  });
};

//page 5  score board display fish userName and score
var page5 = function () {
  var cookie = getCookie("userData").split(",");
  $("#scorePage").css("display", "flex");
  $("#userCurrentTitle").text(cookie[0]);
  $("#userCurrentScore").text(cookie[2]);

  if (cookie[1] == "main1") {
    $("#showPlayerChar").get(0).src =
      "assets/images/Characters/player1-right.gif";
  } else if (cookie[1] == "main2") {
    $("#showPlayerChar").get(0).src =
      "assets/images/Characters/player3-right.gif";
  }
  $("#backFromScore").on("click", function () {
    $("#startUser").trigger("playSound");
    $("#scorePage").css("display", "none");
    page4();
  });
};
