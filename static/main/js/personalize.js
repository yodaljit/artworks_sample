$('.faces_check').hide();
    $('.faces_check').eq(0).show();
    $('.faces_check2').hide();
    $('.faces_check2').eq(0).show();

    $('input[name=size]').on('change', function () {

        if (this.checked) {
            $('.faces_check').hide();

            $("#" + $('input[name=size]:checked').attr('data-id')).show()
            console.log('checked')
            if ($('#' + $('input[name=size]:checked').attr('data-id') + ' input[name=faces]:checked').parent().find('.price').text() == 0) {
                console.log('0')
                    /*$('.new__price span').html(thousands_separators(1 * parseFloat($('input[name=size]:checked').parent().parent().find('.price').text().replace(/,/g, ''))))*/
                $('.non_change_price span').html(1 * parseFloat($('input[name=size]:checked').parent().find('.price').text().replace(/,/g, '')))
                calculate(currency, currencySign);

            } else {
                /*$('.new__price span').html(thousands_separators(parseFloat($(this).parent().find('.price').text()) + parseFloat($('.new__price span').html().replace(/,/g, ''))))*/
                $('.non_change_price span').html((parseFloat($('#' + $('input[name=size]:checked').attr('data-id') + ' input[name=faces]:checked').parent().find('.price').text()) * parseFloat($('#' + $('input[name=size]:checked').attr('data-id') + ' input[name=faces]:checked').attr('id')) - parseFloat($('#' + $('input[name=size]:checked').attr('data-id') + ' input[name=faces]:checked').parent().find('.price').text())) + parseFloat($('input[name=size]:checked').parent().find('.price').text().replace(/,/g, '')))
                calculate(currency, currencySign);
            }
            /*$('.new__price span').html(thousands_separators($(this).parent().parent().find('.price').text()))*/
            //$('.non_change_price span').html(thousands_separators($('input[name=size]:checked').parent().find('.price').text()))
            console.log($('input[name=size]:checked').attr('data-id'))

            calculate(currency, currencySign);
        }
    })

    $('input[name=faces]').on('change', function () {

        if (this.checked) {
            console.log('checked')
            if ($('input[name=faces]:checked').parent().find('.price').text() == 0) {
                console.log('0')
                    /*$('.new__price span').html(thousands_separators(1 * parseFloat($('input[name=size]:checked').parent().parent().find('.price').text().replace(/,/g, ''))))*/
                $('.non_change_price span').html(1 * parseFloat($('input[name=size]:checked').parent().find('.price').text().replace(/,/g, '')))
                calculate(currency, currencySign);

            } else {
                /*$('.new__price span').html(thousands_separators(parseFloat($(this).parent().find('.price').text()) + parseFloat($('.new__price span').html().replace(/,/g, ''))))*/
                $('.non_change_price span').html((parseFloat($('input[name=faces]:checked').parent().find('.price').text()) * parseFloat($('input[name=faces]:checked').attr('id')) - parseFloat($('input[name=faces]:checked').parent().find('.price').text())) + parseFloat($('input[name=size]:checked').parent().find('.price').text().replace(/,/g, '')))

                calculate(currency, currencySign);
            }
        }
    })

    $('input[name=size2]').on('change', function () {

        if (this.checked) {
            $('.faces_check2').hide();

            $("#" + $('input[name=size2]:checked').attr('data-id') + "2").show()
            console.log('checked')
            if ($('#' + $('input[name=size2]:checked').attr('data-id') + "2" + ' input[name=faces2]:checked').parent().find('.price').text() == 0) {
                console.log('0')
                    /*$('.new__price span').html(thousands_separators(1 * parseFloat($('input[name=size]:checked').parent().parent().find('.price').text().replace(/,/g, ''))))*/
                $('.non_change_price span').html(1 * parseFloat($('input[name=size2]:checked').parent().find('.price').text().replace(/,/g, '')))
                calculate(currency, currencySign);

            } else {
                /*$('.new__price span').html(thousands_separators(parseFloat($(this).parent().find('.price').text()) + parseFloat($('.new__price span').html().replace(/,/g, ''))))*/
                $('.non_change_price span').html((parseFloat($('#' + $('input[name=size2]:checked').attr('data-id') + "2" + ' input[name=faces2]:checked').parent().find('.price').text()) * parseFloat($('#' + $('input[name=size2]:checked').attr('data-id') + "2" + ' input[name=faces2]:checked').attr('id')) - parseFloat($('#' + $('input[name=size2]:checked').attr('data-id') + "2" + ' input[name=faces2]:checked').parent().find('.price').text())) + parseFloat($('input[name=size2]:checked').parent().find('.price').text().replace(/,/g, '')))
                calculate(currency, currencySign);
            }
            /*$('.new__price span').html(thousands_separators($(this).parent().parent().find('.price').text()))*/
            //$('.non_change_price span').html(thousands_separators($('input[name=size]:checked').parent().find('.price').text()))
            console.log($('input[name=size2]:checked').attr('data-id') + "2")

            calculate(currency, currencySign);
        }
    })

    $('input[name=faces2]').on('change', function () {

        if (this.checked) {
            console.log('checked')
            if ($('input[name=faces2]:checked').parent().find('.price').text() == 0) {
                console.log('0')
                    /*$('.new__price span').html(thousands_separators(1 * parseFloat($('input[name=size]:checked').parent().parent().find('.price').text().replace(/,/g, ''))))*/
                $('.non_change_price span').html(1 * parseFloat($('input[name=size2]:checked').parent().find('.price').text().replace(/,/g, '')))
                calculate(currency, currencySign);

            } else {
                /*$('.new__price span').html(thousands_separators(parseFloat($(this).parent().find('.price').text()) + parseFloat($('.new__price span').html().replace(/,/g, ''))))*/
                $('.non_change_price span').html((parseFloat($('input[name=faces2]:checked').parent().find('.price').text()) * parseFloat($('input[name=faces2]:checked').attr('id')) - parseFloat($('input[name=faces2]:checked').parent().find('.price').text())) + parseFloat($('input[name=size2]:checked').parent().find('.price').text().replace(/,/g, '')))

                calculate(currency, currencySign);
            }
        }
    })

$('#personalize-menu').hide()
    $('#personalize').on('click', function () {
        $('#personalize-menu').toggle()
    });

    $('#personalize-file').hide();

    $('#upload').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#personalize-file').hide();
        $('#personalize-file').click();
    });

    $('#personalize-file').on('change', function () {

        file = $(this).prop('files')[0]
        files = window.URL.createObjectURL(file);
        if (file != undefined) {
            $('.image-preview').html("")
            $('.image-preview').append(

                `
  <span aria-hidden="true" class="close-per text-right" id="cls-btn"><i class="fa fa-close"></i></span>

  <img src="` + files + `" width="250" height="200" style="object-fit:cover">
  `
            )
        }
    })


    $('#mpersonalize-file').hide();

    $('#upload2').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#mpersonalize-file').hide();
        $('#mpersonalize-file').click();
    });

    $('#mpersonalize-file').on('change', function () {

        file = $(this).prop('files')[0]
        files = window.URL.createObjectURL(file);
        if (file != undefined) {
            $('.image-preview').html("")
            $('.image-preview').append(
                `<button type="button" class="close close-per" id="cls-btn" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
              <img src="` + files + `" width="150" height="200" style="object-fit:cover">`
            )
        }
    })

$('#personalize_offer').on('click', function (e) {
        e.preventDefault();
        $('#make_offer').modal('toggle')

    });

    $('#personalize_offer2').on('click', function (e) {
        e.preventDefault();
        $('#make_offer').modal('toggle')

    });

    $('#note').on('click', function (e) {
        e.preventDefault();
        $('#note_modal').modal('toggle')

    });

    $('#note2').on('click', function (e) {
        e.preventDefault();
        $('#note_modal').modal('toggle')

    });
