$(document).ready(function() {
  $('#login, #contact-now').click(function(){
    $(".module-background, .module-unit").addClass("module-active");
  });
  $(".module-background").click(function(){
    console.log("here");
    $(".module-background, .module-unit").removeClass("module-active");
  });
});