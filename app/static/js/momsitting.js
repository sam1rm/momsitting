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

  $('#need-checkbox').change(function(){
    if (this.checked) {
      $('#need-childcare').show()
      $('#offer-checkbox').prop("checked", false);
      $('#signup-btn').text("Submit");
      $('#next-or-submit').text("'Submit'")
      $('#signup-btn').removeClass('signup-next-btn')
    } else {
      $('#offer-checkbox').prop("checked", true);
    }
  });

  $('#offer-checkbox').change(function(){
    if (this.checked) {
      $('#need-childcare').show()
      $('#need-checkbox').prop("checked", false);
      $('#signup-btn').text("Next");
      $('#next-or-submit').text("'Next'")
      $('#signup-btn').addClass('signup-next-btn')
    } else {
      $('#need-checkbox').prop("checked", true);
    }
  });

  $('#signup-btn').click(function() {
    //check validation
    var email_check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!$('#need-care-name').val() ||!$('#need-care-email').val() ||!$('#need-care-zip').val() ||
      !$('#need-care-password').val() ||!$('#need-care-password-confirm').val()) {
      $('#form-validation-alert').text('Please Fill in all fields');
      $('#form-validation-alert').show();
    } else if ($('#need-care-password').val() != $('#need-care-password-confirm').val() ){
      $('#form-validation-alert').text('Your passwords do not match');
      $('#form-validation-alert').show();
    } else if (!email_check.test($('#need-care-email').val())) {
      $('#form-validation-alert').text('Please enter a valid email');
      $('#form-validation-alert').show();
    } else {
      $('#form-validation-alert').hide();
      if ($('#signup-btn').hasClass('signup-next-btn')) {
        $('#need-childcare').hide()
        $('#offer-childcare-step-2').show();
      } else {
        alert("yay");
      }
    }
  });

});