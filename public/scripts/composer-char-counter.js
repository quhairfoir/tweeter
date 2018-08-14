$(document).ready(function() {
  $("form > textarea").keyup(function() {
    let chars = $(this).val().length;
    let counter = $(this).siblings(".counter");
    if (chars > 140){
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "#244751")
    }
    $(counter).html(140-chars);
  });
});