// Char counter function 
$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on("keyup", function () {
    const input = $(this).val().length;
    let remainder = 140 - input;
    $('f .counter').text(remainder)
    if (remainder > 0) {
      $(this).parent().find(".counter").text(remainder).removeClass("red");
    } else {
      $(this).parent().find(".counter").text(remainder).addClass("red");
    }
  });
});