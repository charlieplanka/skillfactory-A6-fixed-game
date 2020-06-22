const numDivs = 36;
const maxHits = 10;

let hits = 0;
let missHits = 0;
let firstHitTime = 0;
let divSelector = "";

function round() {
  $(divSelector).text("");
  $(divSelector).removeClass("target");  

  divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);

  if (hits === maxHits) {
    endGame();
  };
};

function endGame() {
  $(".game-field").addClass("d-none");

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#miss-hits").text(missHits);
  $("#total-scores").text(10 - missHits);
  $("#win-message").removeClass("d-none");
};

function handleClick(event) {
  if ($(event.target).hasClass("target")) {
    hits += 1;
    round();
  } else {
      missHits += 1;
      $(event.target).addClass("miss");
      setTimeout(() => {
        $(event.target).removeClass("miss");
      }, 500);
  };
};

function init() {
  $("#button-start").click(function () {
    firstHitTime = $.now();
    $("#button-start").addClass("d-none");
    $("#button-reload").removeClass("d-none");
    round();

    $(".game-field").click(handleClick);
    $("#button-reload").click(function () {
      location.reload();
    });
  });
};

$(document).ready(init);
