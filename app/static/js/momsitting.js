$(document).ready(function() {
  $('#try-it-now-button').click(function() {
    $('#signupModal').modal();
  });
  $('#login, #contact-now').click(function(){
    $(".module-background, .module-unit").addClass("module-active");
  });
  $(".module-background").click(function(){
    $(".module-background, .module-unit").removeClass("module-active");
  });
  $(".menu-trigger").click(function(){
    $(".general-nav").toggleClass("active");
  });

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

});