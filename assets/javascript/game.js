var ticketCounter = 0;
var moneyInBank = 100;
var audioElement = document.createElement("audio");
var carOptions = ["family", "sports"];
var locationOptions = ["winter", "farm", "mountains"];
var locationImage = "";
var backgroundImage = "";
var speedLimit = "";
var carSpeed = "";
var carImage = "";
var locationSelected = false;
var timesInJail = 0;

function initializeGame() {
  ticketCounter = 0;
  moneyInBank = 100;
  locationImage = "";
  backgroundImage = "";
  speedLimit = "";
  carSpeed = "";
  carImage = "";
  locationSelected = false;
  $("#car-options").empty();
  $(".car-title").text("Car Choice:");
  $(".car-title").css("color", "black");
  $(".location-title").css("color", "black");
  $("#driving-result").empty();
  $("#speed-limit").empty();
  $("#ticket-counter").empty();
  $("#bank-money").empty();
  audioElement.pause();
  $("#bodyid").css({
    "background-image": "none"
  });
  $("#reset-game").css("visibility", "hidden");

  for (var i = 0; i < carOptions.length; i++) {
    carImage = $("<img>");
    switch (i) {
      case 0:
        carImage.attr({
          src: "assets/images/car1.png",
          class: "car-image1",
          "car-value": carOptions[i]
        });
        break;

      case 1:
        carImage.attr({
          src: "assets/images/car2.jpg",
          class: "car-image2",
          "car-value": carOptions[i]
        });
        break;
    }
    carImage.css({ height: "160px", width: "220px" });
    $("#car-options").append(carImage);
  }

  $(".car-image1").on("click", function() {
    $(".car-image2").css("position", "relative");
    $(".car-image2").animate({ left: "+=400px" }, "normal");
    $(".car-image2").fadeOut("slow");
    $(this).css({
      position: "relative",
      border: "5px solid"
    });
    $(".car-title").text("You are driving:");
    $(".car-title").css("color", "white");
    showLocations();
  });

  $(".car-image2").on("click", function() {
    $(".car-image1").css("position", "relative");
    $(".car-image1").animate({ left: "+=620px" }, "normal");
    $(".car-image1").fadeOut("slow");
    $(this).css({
      position: "relative",
      border: "5px solid"
    });
    showLocations();
  });
}

initializeGame();

function showLocations() {
  $("#car-optionsdiv").fadeOut("slow"); // css("visibility", "hidden");
  $(".location-card").css("visibility", "visible");
  if (locationSelected === false) {
    for (var i = 0; i < locationOptions.length; i++) {
      locationImage = $("<img>");
      switch (i) {
        case 0:
          locationImage.attr({
            src: "assets/images/winter.jpg",
            class: "location-image",
            "location-value": locationOptions[i]
          });
          break;

        case 1:
          locationImage.attr({
            src: "assets/images/farm.jpg",
            class: "location-image",
            "location-value": locationOptions[i]
          });
          break;

        case 2:
          locationImage.attr({
            src: "assets/images/mountains.jpg",
            class: "location-image",
            "location-value": locationOptions[i]
          });
          break;
      }
      locationImage.css({ height: "160px", width: "220px" });
      $("#location-options").append(locationImage);
    }

    $(".location-image").on("click", function() {
      backgroundImage = $(this).attr("src");
      $("#bodyid").css({
        "background-image": "url(" + backgroundImage + ")",
        "background-repeat": "no-repeat",
        width: "100%",
        height: "auto"
      });
      $("div").css({ color: "white" });
      $("#location-options").empty();
      $(".location-card").css("visibility", "hidden");
      showDriveButton();
    });
  }
  locationSelected = true;
}

function showDriveButton() {
  $("#drive-me").css("visibility", "visible");
  $("#drive-me").on("click", function() {
    speedLimit = Math.floor(Math.random() * 60) + 45;
    carSpeed = Math.floor(Math.random() * 60) + 45;
    $("#driving-result").text("You are driving " + carSpeed + " mph.");
    $("#speed-limit").text("The speed limit is " + speedLimit + " mph.");
    if (carSpeed > speedLimit) {
      ticketCounter++;
      $("#ticket-counter").text(
        "Oops! You are over the speed limit. " +
          "You have " +
          ticketCounter +
          " ticket(s)."
      );
      audioElement.setAttribute("src", "assets/sounds/honk.wav");
      audioElement.play();
      moneyInBank = moneyInBank - 20;
      $("#bank-money").text(
        "You have $" + moneyInBank + " remaining in your bank."
      );
    }
    if (ticketCounter === 5) {
      audioElement.setAttribute("src", "assets/sounds/police.wav");
      audioElement.play();
      $("#bodyid").css({
        "background-image": 'url("assets/images/jailtime.jpg")',
        "background-repeat": "no-repeat",
        width: "100%",
        height: "auto"
      });
      timesInJail++;
      $("#jail-times").text("You have been in jail " + timesInJail + " times.");
      showResetButton();
    }
  });
}

function showResetButton() {
  $("#reset-game").css("visibility", "visible");
  $("#drive-me").css("visibility", "hidden");
  $("#reset-game").on("click", function() {
    initializeGame();
  });
}
