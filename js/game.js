(function () {
  $(
    "#load,#startUser,#startFish,#byebye,#eatFish,#gameOver,#sizeUp,#die,#win"
  ).on("playSound", function () {
    $(this).get(0).play();
  });
  fishObject.c1S1 = 0;
  fishObject.c2S2 = 0;
  fishObject.c3S3 = 0;
  fishObject.c4S4 = 0;
  fishObject.c5S5 = 0;
  var enemy1Speed = 5000;
  var enemy2Speed = 7000;
  var enemy3Speed = 9000;
  var enemy4Speed = 11000;
  var scale = 1;
  var enemy1Scale = "scale(0.6)";
  $('#player').css('transform', enemy1Scale)
  var enemy2Scale = "scale(1.2)";
  var enemy3Scale = "scale(1.7)";
  var enemy4Scale = "scale(3)";
  var score = 0;
  var level1 = 150;
  var level2 = 400;
  var level3 = 500;
  var level4 = 900; // game won
  var flagL1 = true;
  var flagL2 = true;
  var flagL3 = true;
  var flagL4 = true;
  var playerImgLeft = "";
  var playerImgRight = "";
  if (getCookie("userData").split(",")[1] == "main1") {
    playerImgLeft = "url('../assets/images/Characters/player1-left.gif')";
    playerImgRight = "url('../assets/images/Characters/player1-right.gif')";
  } else {
    playerImgLeft = "url('../assets/images/Characters/player3-left.gif')";
    playerImgRight = "url('../assets/images/Characters/player3-right.gif')";
  }
  // getCookie("userData");
  $("#playerScore").html(score);
  $("#playGamePage").css("display", "flex");

  var oldx = 0;
  $("body").on("mousemove", function (e) {
    if (e.clientX < oldx) {
      $("#player").get(0).style.backgroundImage = playerImgLeft;
    } else {
      $("#player").get(0).style.backgroundImage = playerImgRight;
    }
    oldx = e.clientX;
    if (e.clientY < 100) {
      $("#player").css("display", "none");
    } else {
      $("#player").css("display", "flex");
      $("#player").css({ left: e.screenX - 45, top: e.screenY - 218 });
    }
    //#region repeat
    for (var i = 0; i < $(".ene").length; i++) {
      var topCheck1 =
        parseInt($(".ene").eq(i).css("top")) >
          parseInt($("#player").css("top")) &&
        parseInt($(".ene").eq(i).css("top")) <
          parseInt($("#player").css("top")) +
            parseInt($("#player").css("height")) * scale;
      var topCheck2 =
        parseInt($("#player").eq(i).css("top")) >
          parseInt($(".ene").css("top")) &&
        parseInt($("#player").eq(i).css("top")) <
          parseInt($(".ene").css("top")) +
            parseInt($(".ene").css("height")) * scale;
      var rightCheck1 =
        parseInt($(".ene").eq(i).css("right")) >
          parseInt($("#player").css("right")) &&
        parseInt($(".ene").eq(i).css("right")) <
          parseInt($("#player").css("right")) +
            parseInt($("#player").css("width")) * scale;
      var rightCheck2 =
        parseInt($("#player").eq(i).css("right")) >
          parseInt($(".ene").css("right")) &&
        parseInt($("#player").eq(i).css("right")) <
          parseInt($(".ene").css("right")) +
            parseInt($(".ene").css("width")) * scale;
      var bottomCheck1 =
        parseInt($(".ene").eq(i).css("bottom")) >
          parseInt($("#player").css("bottom")) &&
        parseInt($(".ene").eq(i).css("bottom")) <
          parseInt($("#player").css("bottom")) +
            parseInt($("#player").css("height")) * scale;
      var bottomCheck2 =
        parseInt($("#player").eq(i).css("bottom")) >
          parseInt($(".ene").css("bottom")) &&
        parseInt($("#player").eq(i).css("bottom")) <
          parseInt($(".ene").css("bottom")) +
            parseInt($(".ene").css("height")) * scale;
      var leftCheck1 =
        parseInt($(".ene").eq(i).css("left")) >
          parseInt($("#player").css("left")) &&
        parseInt($(".ene").eq(i).css("left")) <
          parseInt($("#player").css("left")) +
            parseInt($("#player").css("width")) * scale;
      var leftCheck2 =
        parseInt($("#player").eq(i).css("left")) >
          parseInt($(".ene").css("left")) &&
        parseInt($("#player").eq(i).css("left")) <
          parseInt($(".ene").css("left")) +
            parseInt($(".ene").css("width")) * scale;

      if (
        ((topCheck1 || topCheck2) && (rightCheck1 || rightCheck2)) ||
        ((bottomCheck1 || bottomCheck2) && (leftCheck1 || leftCheck2))
      ) {
        if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy1")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c1S1--;
          score += 10;
        } else if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy2")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c2S2--;
          score += 20;
        } else if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy3")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c3S3--;
          score += 40;
        } else if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy4")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c5S5--;
          score += 50;
        } else {
          $("body").off("mousemove");
          $("#gameOver").trigger("playSound");
          var x = getCookie("userData").split(",");
          if (x[2] < score) {
            setCookie("userData", x[0] + "," + x[1] + "," + score);
          }
          setTimeout(function () {
            $("#playGamePage").css("display", "none");
            page7();
          }, 1000);
        }
      }
    }
    //#endregion
  });

  var updateInterval = setInterval(function () {
    //detect collision
    //#region  collision
    for (var i = 0; i < $(".ene").length; i++) {
      var topCheck1 =
        parseInt($(".ene").eq(i).css("top")) >
          parseInt($("#player").css("top")) &&
        parseInt($(".ene").eq(i).css("top")) <
          parseInt($("#player").css("top")) +
            parseInt($("#player").css("height")) * scale;
      var topCheck2 =
        parseInt($("#player").eq(i).css("top")) >
          parseInt($(".ene").css("top")) &&
        parseInt($("#player").eq(i).css("top")) <
          parseInt($(".ene").css("top")) +
            parseInt($(".ene").css("height")) * scale;
      var rightCheck1 =
        parseInt($(".ene").eq(i).css("right")) >
          parseInt($("#player").css("right")) &&
        parseInt($(".ene").eq(i).css("right")) <
          parseInt($("#player").css("right")) +
            parseInt($("#player").css("width")) * scale;
      var rightCheck2 =
        parseInt($("#player").eq(i).css("right")) >
          parseInt($(".ene").css("right")) &&
        parseInt($("#player").eq(i).css("right")) <
          parseInt($(".ene").css("right")) +
            parseInt($(".ene").css("width")) * scale;
      var bottomCheck1 =
        parseInt($(".ene").eq(i).css("bottom")) >
          parseInt($("#player").css("bottom")) &&
        parseInt($(".ene").eq(i).css("bottom")) <
          parseInt($("#player").css("bottom")) +
            parseInt($("#player").css("height")) * scale;
      var bottomCheck2 =
        parseInt($("#player").eq(i).css("bottom")) >
          parseInt($(".ene").css("bottom")) &&
        parseInt($("#player").eq(i).css("bottom")) <
          parseInt($(".ene").css("bottom")) +
            parseInt($(".ene").css("height")) * scale;
      var leftCheck1 =
        parseInt($(".ene").eq(i).css("left")) >
          parseInt($("#player").css("left")) &&
        parseInt($(".ene").eq(i).css("left")) <
          parseInt($("#player").css("left")) +
            parseInt($("#player").css("width")) * scale;
      var leftCheck2 =
        parseInt($("#player").eq(i).css("left")) >
          parseInt($(".ene").css("left")) &&
        parseInt($("#player").eq(i).css("left")) <
          parseInt($(".ene").css("left")) +
            parseInt($(".ene").css("width")) * scale;

      if (
        ((topCheck1 || topCheck2) && (rightCheck1 || rightCheck2)) ||
        ((bottomCheck1 || bottomCheck2) && (leftCheck1 || leftCheck2))
      ) {
        if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy1")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c1S1--;
          score += 10;
        } else if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy2")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c2S2--;
          score += 20;
        } else if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy3")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c3S3--;
          score += 40;
        } else if (
          $(".ene").eq(i).hasClass("eat") &&
          $(".ene").eq(i).hasClass("enemy4")
        ) {
          $("#eatFish").trigger("playSound");
          $(".ene").get(i).remove();
          fishObject.c5S5--;
          score += 50;
        } else {
          $("body").off("mousemove");
          $("#gameOver").trigger("playSound");
          var x = getCookie("userData").split(",");
          if (x[2] < score) {
            setCookie("userData", x[0] + "," + x[1] + "," + score);
          }
          setTimeout(function () {
            $("#playGamePage").css("display", "none");
            page7();
          }, 500);
        }
      }
    }
    //#endregion
    $("#playerScore").html(score);
    $("#movingScoreBar").css("width", score + "px");
    if (score >= level1 && score < level2) {
      scale = parseFloat(enemy2Scale.split("(")[1].split(")")[0])
      $("#player").css("transform", enemy2Scale);
      if (flagL1) {
        $("#sizeUp").trigger("playSound");
        enemy1Speed *= 0.8;
        enemy2Speed *= 0.8;
        enemy3Speed *= 0.8;
        enemy4Speed *= 0.8;
        flagL1 = false;
      }
      for (var i = 0; i < $(".enemy2").length; i++) {
        $(".enemy2").eq(i).addClass("eat");
      }
    } else if (score >= level2 && score < level3) {
      scale = parseFloat(enemy3Scale.split("(")[1].split(")")[0])
      $("#player").css("transform", enemy3Scale);
      if (flagL2) {
        $("#sizeUp").trigger("playSound");
        enemy1Speed *= 0.6;
        enemy2Speed *= 0.6;
        enemy3Speed *= 0.6;
        enemy4Speed *= 0.6;
        flagL2 = false;
      }
      for (var i = 0; i < $(".enemy2").length; i++) {
        $(".enemy2").eq(i).addClass("eat");
      }
      for (var i = 0; i < $(".enemy3").length; i++) {
        $(".enemy3").eq(i).addClass("eat");
      }
    } else if (score >= level3 && score < level4) {
      scale = parseFloat(enemy4Scale.split("(")[1].split(")")[0])
      $("#player").css("transform", enemy4Scale);
      if (flagL3) {
        $("#sizeUp").trigger("playSound");
        enemy3Speed *= 0.5;
        enemy4Speed *= 0.5;
        flagL3 = false;
      }
      for (var i = 0; i < $(".enemy4").length; i++) {
        $(".enemy4").eq(i).addClass("eat");
      }
      for (var i = 0; i < $(".enemy3").length; i++) {
        $(".enemy3").eq(i).addClass("eat");
      }
      for (var i = 0; i < $(".enemy2").length; i++) {
        $(".enemy2").eq(i).addClass("eat");
      }
    } else if (score >= level4) {
      if (flagL4) {
        $(".ene").remove()
        clearInterval(fishGenInterval)
        $("body").off("mousemove");
        $("#win").trigger("playSound");
        var x = getCookie("userData").split(",");
        setCookie("userData", x[0] + "," + x[1] + "," + score);
        setTimeout(function () {
          window.close();
        }, 1500);
        flagL4 = false;
      }
    }
  }, 50);

  var fishMotionInterval = setInterval(function () {
    for (var i = 0; i < $(".enemy1").length; i++) {
      if (parseInt($(".enemy1").eq(i).css("right")) >= window.innerWidth) {
        $(".enemy1").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/right/blueFish.gif')";
        $(".enemy1")
          .eq(i)
          .animate(
            { right: "0", top: between(100, window.innerHeight - 200) + "px" },
            enemy1Speed
          );
      } else if (parseInt($(".enemy1").eq(i).css("right")) <= 0) {
        $(".enemy1").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/left/blueFish.gif')";
        $(".enemy1")
          .eq(i)
          .animate(
            {
              right: "100%",
              top: between(100, window.innerHeight - 200) + "px",
            },
            enemy1Speed
          );
      }
    }
    for (var i = 0; i < $(".enemy2").length; i++) {
      if (parseInt($(".enemy2").eq(i).css("right")) >= window.innerWidth) {
        $(".enemy2").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/right/tuna.gif')";
        $(".enemy2")
          .eq(i)
          .animate(
            { right: "0", top: between(100, window.innerHeight - 200) + "px" },
            enemy2Speed
          );
      } else if (parseInt($(".enemy2").eq(i).css("right")) <= 0) {
        $(".enemy2").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/left/tuna.gif')";
        $(".enemy2")
          .eq(i)
          .animate(
            {
              right: "100%",
              top: between(100, window.innerHeight - 200) + "px",
            },
            enemy2Speed
          );
      }
    }
    for (var i = 0; i < $(".enemy3").length; i++) {
      if (parseInt($(".enemy3").eq(i).css("right")) >= window.innerWidth) {
        $(".enemy3").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/right/yellowFish.gif')";
        $(".enemy3")
          .eq(i)
          .animate(
            { right: "0", top: between(100, window.innerHeight - 200) + "px" },
            enemy3Speed
          );
      } else if (parseInt($(".enemy3").eq(i).css("right")) <= 0) {
        $(".enemy3").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/left/yellowFish.gif')";
        $(".enemy3")
          .eq(i)
          .animate(
            {
              right: "100%",
              top: between(100, window.innerHeight - 200) + "px",
            },
            enemy3Speed
          );
      }
    }

    for (var i = 0; i < $(".enemy4").length; i++) {
      if (parseInt($(".enemy4").eq(i).css("right")) >= window.innerWidth) {
        $(".enemy4").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/right/shark.gif')";
        $(".enemy4")
          .eq(i)
          .animate(
            { right: "0", top: between(100, window.innerHeight - 200) + "px" },
            enemy4Speed
          );
      } else if (parseInt($(".enemy4").eq(i).css("right")) <= 0) {
        $(".enemy4").get(i).style.backgroundImage =
          "url('../assets/images/Enemies/left/shark.gif')";
        $(".enemy4")
          .eq(i)
          .animate(
            {
              right: "100%",
              top: between(100, window.innerHeight - 200) + "px",
            },
            enemy4Speed
          );
      }
    }
  }, 500);

  var fishGenInterval = setInterval(function () {
    if (fishObject.c1S1 < 5) {
      var x = new fishObject(1);
      $("#gameDiv").append(
        `<div size=${fishObject.c1S1} class="ene enemy1 eat"></div>`
      );
      $(".enemy1:last-child").get(
        0
      ).style.backgroundImage = `url(${x.imgRight})`;

      $(".enemy1:last-child").css(
        "top",
        between(100, window.innerHeight - 200) + "px"
      );
      $(".enemy1:last-child").css("right", "100%");
      $(".enemy1:last-child").css("transform", enemy1Scale);
      $(".enemy1:last-child").animate(
        { right: "0px", top: between(100, window.innerHeight - 200) + "px" },
        enemy1Speed
      );
    }
    if (fishObject.c2S2 < 3) {
      var x = new fishObject(2);
      $("#gameDiv").append(
        `<div size=${fishObject.c2S2} class="ene enemy2"></div>`
      );

      $(".enemy2:last-child").get(
        0
      ).style.backgroundImage = `url(${x.imgRight})`;

      $(".enemy2:last-child").css(
        "top",
        between(100, window.innerHeight - 200) + "px"
      );
      $(".enemy2:last-child").css("right", "100%");
      $(".enemy2:last-child").css("transform", enemy2Scale);
      $(".enemy2:last-child").animate(
        { right: "0px", top: between(100, window.innerHeight - 200) + "px" },
        enemy2Speed
      );
    }
    if (fishObject.c3S3 < 2) {
      var x = new fishObject(3);
      $("#gameDiv").append(
        `<div size=${fishObject.c3S3} class="ene enemy3"></div>`
      );

      $(".enemy3:last-child").get(
        0
      ).style.backgroundImage = `url(${x.imgLeft})`;

      $(".enemy3:last-child").css(
        "top",
        between(100, window.innerHeight - 200) + "px"
      );
      $(".enemy3:last-child").css("right", "0px");
      $(".enemy3:last-child").css("transform", enemy3Scale);
      $(".enemy3:last-child").animate(
        { right: "100%", top: between(100, window.innerHeight - 200) + "px" },
        enemy3Speed
      );
    }
    if (fishObject.c5S5 < 2) {
      var x = new fishObject(5);
      $("#gameDiv").append(
        `<div size=${fishObject.c2S2} class="ene enemy4"></div>`
      );

      $(".enemy4:last-child").get(
        0
      ).style.backgroundImage = `url(${x.imgLeft})`;
      $(".enemy4:last-child").css(
        "top",
        between(100, window.innerHeight - 200) + "px"
      );
      $(".enemy4:last-child").css("right", "0px");
      $(".enemy4:last-child").css("transform", enemy4Scale);
      $(".enemy4:last-child").animate(
        { right: "100%", top: between(100, window.innerHeight - 200) + "px" },
        enemy4Speed
      );
    }
  }, 1000);
})();
var page7 = function () {
  $("#GameOverPage").css("display", "flex");
  setTimeout(function () {
    $("#GameOverPage").css("display", "none");
    window.close();
  }, 3000);
};
function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
