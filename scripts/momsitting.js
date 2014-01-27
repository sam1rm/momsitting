$(document).ready(function() {
  $('#login, #contact-now').click(function(){
    $(".module-background, .module-unit").addClass("module-active");
  });
  $(".module-background").click(function(){
    $(".module-background, .module-unit").removeClass("module-active");
  });
  $(".menu-trigger").click(function(){
    $(".general-nav").toggleClass("active");
  });

  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 500,
    values: [ 75, 300 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );

});