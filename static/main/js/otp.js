 
    function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
      $('.input-group-text').css('background-color', '#f8f9fa')
      $('.input-group-text i').css('color', '#141413')
    x.type = "text";
  } else {
    $('.input-group-text').css('background-color', '#141413')
    $('.input-group-text i').css('color', '#f8f9fa')
    x.type = "password";
  }
}
function myFunction2() {
  var x = document.getElementById("password2");
  if (x.type === "password") {
      $('.input-group-text').css('background-color', '#f8f9fa')
      $('.input-group-text i').css('color', '#141413')
    x.type = "text";
  } else {
    $('.input-group-text').css('background-color', '#141413')
    $('.input-group-text i').css('color', '#f8f9fa')
    x.type = "password";
  }
}


var input = document.querySelector("#phone2");
  window.intlTelInput(input, {
    separateDialCode:false,
    initialCountry: "IN"
  });
var iti = intlTelInput(input)
/*var number = iti.getNumber();
$('.iti__dial-code').click(function() { 
      var countryCode = $('.iti__dial-code').attr('title');
      var countryCode = countryCode.replace(/[^0-9]/g,'')
      $('#phone').val("");
      $('#phone').val("+"+countryCode+" "+ $('#phone').val());
   });*/
iti.setCountry("IN");
$('#phone2').on('input', function() {
 $('#phone').val(iti.getNumber())
})

$('#submit_offer').hide();
    $('.further-data').hide();
    $('#submit_signup').hide();
    $('#email_otp').hide();
    $('#verify').hide();
    $('#price2').on('input', function () {
        console.log($(this).val())
        offer = parseFloat($('.new__price span:last').text().replace(/,/g, '')) - parseFloat($('.new__price span:last').text().replace(/,/g, '')) * 20 / 100
        console.log(offer)
        if ($(this).val() < offer) {
            $('#priceHelp').html('The offer price should only be 20% less of the sale price. (Suggested price: ' + currencySign + offer + ')')
            $('#priceHelp').removeClass('text-muted')
            $('#priceHelp').css('color', 'red')
        } else {
            $('#priceHelp').html('Enter your price to make an offer.')
            $('#priceHelp').css('color', '#777777')
        }
    })


    $('#otp').on('click', function () {
        if (window.location.pathname === '/profile/artist-login/' || window.location.pathname === '/profile/customer-login/') {
           if (window.location.pathname === '/profile/artist-login/'){
			url = window.location.origin + '/profile/signup/'
           }
        else{
        url = window.location.origin + '/profile/customer-signup/'
        }
            $('#otp').attr('disabled', 'disabled');
            $.ajax({
                type: 'POST',
                url: url,
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                data: {
                    action: 'otp',
                    email: $('#email').val(),
                    fname: $('#fname').val(),
                    lname: $('#lname').val(),
                    phone: $('#phone2').val(),

                },
                success: function (data) {
                    console.log(data)
                    $('<p style="color: #ffc77e;font-size:14px;margin-top:0" id="otp_success">An OTP as been sent to your E-mail Id. Please enter the OTP below. If you do not recieve OTP in your "primary inbox" please check your "spam" folder.</p>').insertBefore($('#email_otp'))
                    $('#otp').remove();
                    $('#verify').show();
                    $('#email_otp').show();
                    var timer2 = "1:00";
                    var interval = setInterval(function () {


                        var timer = timer2.split(':');
                        //by parsing integer, I avoid all extra string processing
                        var minutes = parseInt(timer[0], 10);
                        var seconds = parseInt(timer[1], 10);
                        --seconds;
                        minutes = (seconds < 0) ? --minutes : minutes;
                        seconds = (seconds < 0) ? 59 : seconds;
                        seconds = (seconds < 10) ? '0' + seconds : seconds;
                        //minutes = (minutes < 10) ?  minutes : minutes;
                        $('#otp-timer').html(minutes + ':' + seconds);
                        if (minutes < 0) {
                            clearInterval(interval);
                            $('#otp-timer').html(`<a href="javascript:void(0)" id="resend_otp">Resend OTP</a>`);
                            $('#resend_otp').on('click', function () {
                                $.ajax({
                                    type: 'POST',
                                    url: window.location.origin + '/profile/signup/',
                                    headers: {
                                        'X-CSRFToken': csrftoken,
                                    },
                                    data: {
                                        action: 'otp',
                                        email: $('#email').val()
                                    },
                                    success: function (data) {
                                        console.log(data)
                                        $("#otp_success").html('An OTP as been resent to your E-mail Id. If you not see the OTP in your "primary inbox" then check your "spam" folder. Please enter the OTP below.')
                                        $('#resend_otp').remove();
                                        $('#otp-timer').html('OTP resent')
                                        $('#verify').show();
                                        $('#email_otp').show();

                                    }
                                });

                            });
                        }
                        //check if both minutes and seconds are 0
                        if ((seconds <= 0) && (minutes <= 0)) {
                            clearInterval(interval);
                            $('#otp-timer').html(`<a href="javascript:void(0)" id="resend_otp">Resend OTP</a>`);
                            $('#resend_otp').on('click', function () {
                                $.ajax({
                                    type: 'POST',
                                    url: window.location.origin + '/profile/signup/',
                                    headers: {
                                        'X-CSRFToken': csrftoken,
                                    },
                                    data: {
                                        action: 'otp',
                                        email: $('#email').val()
                                    },
                                    success: function (data) {
                                        console.log(data)
                                        $("#otp_success").html('An OTP as been resent to your E-mail Id. If you not see the OTP in your "primary inbox" then check your "spam" folder. Please enter the OTP below.')
                                        $('#resend_otp').remove();
                                        $('#otp-timer').html('OTP resent')
                                        $('#verify').show();
                                        $('#email_otp').show();

                                    }
                                });

                            });
                        }
                        timer2 = minutes + ':' + seconds;
                    }, 1000);
                }
            });
        } else {
            offer = parseFloat($('.new__price span:last').text().replace(/,/g, '')) - parseFloat($('.new__price span:last').text().replace(/,/g, '')) * 20 / 100
            console.log(offer)
            if ($('#price2').val() < offer) {
                $('#priceHelp').html('The offer price should only be 20% less of the sale price. Please Enter a valid offer price. (Suggested price: ' + currencySign + offer + ')')
                $('#priceHelp').css('color', 'red')
            } else {
                $(this).attr('disabled', 'disabled');
                $.ajax({
                    type: 'POST',
                    url: window.location.href,
                    headers: {
                        'X-CSRFToken': csrftoken,
                    },
                    data: {
                        action: 'otp',
                        email: $('input[type="email"]').val()
                    },
                    success: function (data) {
                        console.log(data)
                        $('<p style="color: #ffc77e;font-size:14px;margin-top:0" id="otp_success">An OTP as been sent to your E-mail Id. Please enter the OTP below.</p>').insertBefore($('#email_otp'))
                        $('#otp').remove();
                        $('#verify').show();
                        $('#email_otp').show();

                    }
                });
            }
        }
    });




    $('#verify').on('click', function (e) {
        $(this).attr('disabled', 'disabled');
        $(this).html('Verifying OTP');
        if (window.location.pathname === '/profile/artist-login/' || window.location.pathname === '/profile/customer-login/') {
         if (window.location.pathname === '/profile/artist-login/'){
			url = window.location.origin + '/profile/signup/'
           }
        else{
        url = window.location.origin + '/profile/customer-signup/'
        }
        console.log($('#eotp').val())
            $.ajax({
                type: 'POST',
                url: url,
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                data: {
                    eotp: $('#eotp').val(),
                    action: 'verify'
                },
                success: function (data) {
                    console.log(data)
                    if (data == "otp verified") {
                        $('#verify').hide();
                        $('#submit_signup').show();
                        $('#email_otp').hide();
                        $('#otp_success').text("OTP Verified. Fill the remaining details to create an account.");
                        $('.further-data').show();
                        $('#email').css('pointer-events', 'none')
                    } else {
                        $('#email_otp').val('')

                        $('#verify').removeAttr('disabled');
                        $('#verify').html('Verify');
                        $('#email_otp small').text('invalid OTP. Please try again.')
                        $('.further-data').hide();
                        $('#email_otp small').css('color', 'red');

                    }
                }
            });
        } else {
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                data: {
                    eotp: $('#eotp').val()
                },
                success: function (data) {
                    console.log(data)
                    if (data == "otp verified") {
                        $('#verify').hide();
                        $('#submit_offer').show();

                        $('#email_otp').hide();
                        $('#otp_success').text("OTP Verified. Fill the remaining details to create an account.");
                        $('#email').css('pointer-events', 'none')
                    } else {
                        $('#email_otp').val('')

                        $('#verify').removeAttr('disabled');
                        $('#verify').html('Verify');
                        $('#email_otp small').text('invalid OTP. Please try again.')
                        $('#email_otp small').css('color', 'red');

                    }
                }
            });
        }
    });

    $('.mail_otp').hide();
    $('#email_otp2').hide();
    $('#verify2').hide();
    $('#log_otp').on('click', function () {
        $('.mail_otp').show();
        $('.user_log').hide()
    })

    $('#log_username').on('click', function () {
        $('.mail_otp').hide();
        $('.user_log').show()
    })

    $('#otp2').on('click', function () {
        if (window.location.pathname === '/profile/artist-login/' || window.location.pathname === '/profile/customer-login/') {
            $('#otp2').attr('disabled', 'disabled');
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                data: {
                    action: 'otp',
                    email: $('#email2').val()
                },
                success: function (data) {
                    console.log(data)
                    $('<p style="color: #ffc77e;font-size:14px;margin-top:0" id="otp_success">An OTP as been sent to your E-mail Id. If you not see the OTP in your "primary inbox" then checck your "spam" folder. Please enter the OTP below.</p>').insertBefore($('#email_otp'))
                    $('#otp2').remove();
                    $('#verify2').show();
                    $('#email_otp2').show();
                    var timer2 = "1:00";
                    var interval = setInterval(function () {


                        var timer = timer2.split(':');
                        //by parsing integer, I avoid all extra string processing
                        var minutes = parseInt(timer[0], 10);
                        var seconds = parseInt(timer[1], 10);
                        --seconds;
                        minutes = (seconds < 0) ? --minutes : minutes;
                        seconds = (seconds < 0) ? 59 : seconds;
                        seconds = (seconds < 10) ? '0' + seconds : seconds;
                        //minutes = (minutes < 10) ?  minutes : minutes;
                        $('#otp-timer2').html(minutes + ':' + seconds);
                        if (minutes < 0) {
                            clearInterval(interval);
                            $('#otp-timer2').html(`<a href="javascript:void(0)" id="resend_otp2">Resend OTP</a>`);
                            $('#resend_otp2').on('click', function () {
                                $.ajax({
                                    type: 'POST',
                                    url: window.location.href,
                                    headers: {
                                        'X-CSRFToken': csrftoken,
                                    },
                                    data: {
                                        action: 'otp',
                                        email: $('#email2').val()
                                    },
                                    success: function (data) {
                                        console.log(data)
                                        $("#otp_success2").html("An OTP as been resent to your E-mail Id. If you not see the OTP in your 'primary inbox' then checck your 'spam' folder. Please enter the OTP below.")
                                        $('#resend_otp2').remove();
                                        $('#otp-timer2').html('OTP resent')
                                        $('#verify2').show();
                                        $('#email_otp2').show();

                                    }
                                });

                            });
                        }
                        //check if both minutes and seconds are 0
                        if ((seconds <= 0) && (minutes <= 0)) {
                            clearInterval(interval);
                            $('#otp-timer2').html(`<a href="javascript:void(0)" id="resend_otp2">Resend OTP</a>`);
                            $('#resend_otp2').on('click', function () {
                                $.ajax({
                                    type: 'POST',
                                    url: window.location.href,
                                    headers: {
                                        'X-CSRFToken': csrftoken,
                                    },
                                    data: {
                                        action: 'otp',
                                        email: $('#email2').val()
                                    },
                                    success: function (data) {
                                        console.log(data)
                                        $("#otp_success2").html("An OTP as been resent to your E-mail Id. If you not see the OTP in your 'primary inbox' then checck your 'spam' folder. Please enter the OTP below.")
                                        $('#resend_otp2').remove();
                                        $('#otp-timer2').html('OTP resent')
                                        $('#verify2').show();
                                        $('#email_otp2').show();

                                    }
                                });

                            });
                        }
                        timer2 = minutes + ':' + seconds;
                    }, 1000);
                }
            });
        }
    });




    $('#verify2').on('click', function (e) {
        $(this).attr('disabled', 'disabled');
        $.ajax({
            type: 'POST',
            url: window.location.href,
            headers: {
                'X-CSRFToken': csrftoken,
            },
            data: {
                eotp: $('#eotp2').val(),
                action: 'verify'
            },
            success: function (data, status) {
                console.log(status)
                if (status == "success") {
                    $('#verify2').hide();
                    $('#email_otp2').hide();
                    $('#otp_success2').text("OTP Verified. Fill the remaining details to create an account.");
                    $('#email2').css('pointer-events', 'none')
                    window.location.href = window.location.origin + data
                } else {
                    $('#email_otp2').val('')
                    $('#verify2').removeAttr('disabled');
                    $('#verify2').html('Login');
                    $('#email_otp2 small').text('invalid OTP. Please try again.')
                    $('#email_otp2 small').css('color', 'red');

                }
            }
        });
    });

    $('#submit_offer').on('click', function (e) {
        offer = parseFloat($('.new__price span:last').text().replace(/,/g, '')) - parseFloat($('.new__price span:last').text().replace(/,/g, '')) * 20 / 100
        console.log(offer)

        if ($('#price2').val() < offer) {
            $('#priceHelp').html('The offer price should only be 20% less of the sale price. Please enter a valid offer price.')
            $('#priceHelp').css('color', 'red')
        } else {
            $(this).attr('disabled', 'disabled');
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken,
                },
                data: {
                    name: $('#name').val(),
                    price: $('#price2').val(),
                    email: $('#email').val(),
                    phone: $('#phone').val(),
                },
                success: function (data) {
                    $('#make_offer').remove();
                    $('.modal-body').append(`<h2 class="text-center">Thank you for your offer.</h3><p class="text-center"> We'll soon get in touch with you.</p>`)
                }
            });
        }
    });

