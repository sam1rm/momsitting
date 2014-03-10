$(document).ready(function() {
  $('#upload-photo-link').on('click', function(e) {
      e.preventDefault();
      $("#upload-photo:hidden").trigger('click');
    });

  $('#how-it-works-signup').mouseover(function() {
    $('#signupModal').modal();
  })

    $("#upload-photo:hidden").change(function(){
        var file = this.files[0]
        name = file.name; 
        size = file.size;
        type = file.type;
        // if (file.size > 100000) {
        //   alert("File is too big")
        // } else
        if (file.type != 'image/png' && file.type != 'image/jpg' && !file.type != 'image/gif' && file.type != 'image/jpeg' ) {
          alert("File doesnt match png, jpg, or gif");
        } else {
          readURL(this);
          var formData = new FormData()
          formData.append('file', file)
          $.ajax({
            url:'/create-user/',
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false 
          });
        }
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#default-photo').hide()
                $('#image-preview').show()
                $('#saved-photo').show();
                $('#saved-photo').delay(1250).fadeOut('slow');
                $('#image-preview').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

  $('#profile-tab').click(function (e) {
    $(this).tab('show')
  })

$('#general-tab').click(function (e) {
    $(this).tab('show')
  })

  $('#view-profile-signup').click(function() {
    $('#signupModal').modal();
    $('#further-proceed-alert').delay(1250).fadeOut('slow');
  });

  $('#user-save-changes-btn').click(function() {
    var data = {
      'make-changes': true, 
      'name': $('#need-care-name').val(),
      'email': $('#need-care-email').val(),
      'zip':$('#need-care-zip').val(),
    }
    $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/create-user/' ,
            data: JSON.stringify(data),
            dataType: "json",
    });  
    $('#form-validation-alert').text('Changes saved')
    $('#form-validation-alert').show() 
  })

  $('#momsitter-save-changes-btn').click(function() {
      var data = {
        'make-changes-momsitter': true,
        'licensed': ($('#attr-1').attr('checked')?true:false),
        'bg_check': ($('#attr-3').attr('checked')?true:false),
        'cpr': ($('#attr-4').attr('checked')?true:false),
        'part_time': ($('#attr-5').attr('checked')?true:false),
        'full_time': ($('#attr-6').attr('checked')?true:false),
        'age-0-2': ($('#pref-age-1').attr('checked')?true:false),
        'age-3-5': ($('#pref-age-2').attr('checked')?true:false),
        'age-6-8': ($('#pref-age-3').attr('checked')?true:false),
        'age-9-11': ($('#pref-age-4').attr('checked')?true:false),
        'age-12': ($('#pref-age-5').attr('checked')?true:false),
        'address': $('#address').val(),
        'introduction': $('#profile-intro').val(),
        'childhood-years': $('#momsitter-child-experience').val(),
        'full-time-rate': $('#full-time-rate').val(),
        'momsitter-languages': $('#momsitter-languages').val()
    }
    $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/create-user/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {
              window.location.replace('/profile/');  
            }
    });  
    $('#form-validation-alert').text('Changes saved')
    $('#form-validation-alert').show() 
  })

  $('.noUiSlider').noUiSlider({
           range: [100, 300]
          ,start: [150, 250]
          ,handles: 2
          ,step: 10
          ,margin: 20
          ,connect: true
          ,behaviour: 'tap-drag'
          ,serialization: {
             mark: ','
            ,resolution: 1
            ,to: [
              [ $('#value-min'), 
                'html' ],
              [ $('#value-max'),
               'html' ]
            ],
          }
  });

  $('#login-btn').click(function(){
    if (!$('#login-email').val() || !$('#login-password').val()) {
      $('#form-validation-login-alert').text('Please fill in all fields')
      $('#form-validation-login-alert').show()
    } else {
      $('#form-validation-login-alert').hide()
        var data = {
          'email': $('#login-email').val(),
          'password': $('#login-password').val()
        }
        $.ajax({
          type: "POST",
          contentType: 'application/json;charset=UTF-8',
          url: '/login/',
          data: JSON.stringify(data),
          dataType: "json",        
          success: function(result) {        
              if (result.json['success']) {
                  if (result.json['momsitter']) {
                    window.location.replace('/profile/');  
                  } else {
                    window.location.replace('/search/');
                  }
              } else {
                  $('#form-validation-login-alert').text('Incorrect username or password.');     
                  $('#form-validation-login-alert').show();     
              }
            }
        });
    }
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
      var data = {
          'name': $('#need-care-name').val(),
          'email': $('#need-care-email').val(),
          'password': $('#need-care-password').val(),
          'zip': $('#need-care-zip').val()
      }
      if ($('#signup-btn').hasClass('signup-next-btn')) {
        $('#need-childcare').hide()
        $('#offer-childcare-step-2').show();
      } else {
        data['create-user'] = true
        $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/create-user/' ,
            data: JSON.stringify(data),
            dataType: "json",
            success: function(result) {         
                window.location.replace('/search/');
            }
        });  
      }
    }
  });

  $('#momsitting-signup-btn').click(function(){
    if (!$('#address').val() || !$('#momsitter-child-experience').val() || !$('#momsitter-languages').val()
      ||!$('#full-time-rate')) {
      $('#form-validation-alert').show();
    } else {
      $('#form-validation-alert').hide();
      var new_data = {
        'create-momsitter': true,
        'name': $('#need-care-name').val(),
        'email': $('#need-care-email').val(),
        'password': $('#need-care-password').val(),
        'zip': $('#need-care-zip').val(),
        'licensed': ($('#attr-1').attr('checked')?true:false),
        'bg_check': ($('#attr-3').attr('checked')?true:false),
        'cpr': ($('#attr-4').attr('checked')?true:false),
        'part_time': ($('#attr-5').attr('checked')?true:false),
        'full_time': ($('#attr-6').attr('checked')?true:false),
        'age-0-2': ($('#pref-age-1').attr('checked')?true:false),
        'age-3-5': ($('#pref-age-2').attr('checked')?true:false),
        'age-6-8': ($('#pref-age-3').attr('checked')?true:false),
        'age-9-11': ($('#pref-age-4').attr('checked')?true:false),
        'age-12': ($('#pref-age-5').attr('checked')?true:false),
        'address': $('#address').val(),
        'childhood-years': $('#momsitter-child-experience').val(),
        'full-time-rate': $('#full-time-rate').val(),
        'momsitter-languages': $('#momsitter-languages').val()
      }
      $.ajax({
            type: "POST",
            contentType: 'application/json;charset=UTF-8',
            url: '/create-user/',
            data: JSON.stringify(new_data),
            dataType: "json",
            success: function(result) {         
                $('#signupModal').modal('hide');
                window.location.replace('/profile/');  
            }
      });  
    }
  })



});