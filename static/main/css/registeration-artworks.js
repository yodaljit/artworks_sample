$('#add_2').hide()
    $('#add_3').hide()
    $('#add_4').hide()
    $('#add_5').hide()

    $('#edit_modal1').hide()
    $('#edit_modal2').hide()
    $('#edit_modal3').hide()
    $('#edit_modal4').hide()
    $('#edit_modal5').hide()
    $('#reg_img1').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img1').click()
    });

    $('#reg_art_img1').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        img = window.URL.createObjectURL($(this).prop('files')[0])
        $('#reg_modal1').modal('show')
        $('#reg_modal_img1').attr('src', img)
        $('#reg_img1').attr('src', img)
    });

    $('#change_reg_img1').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img1').click()
    });

    $('#modal_width1').on('keyup', function () {
        $('#modal_width_cm1').text('In cm(Centimeters): ' + (parseFloat($('#modal_width1').val()) * 2.54) + "cm")
    });
    $('#modal_height1').on('keyup', function () {
        $('#modal_height_cm1').text('In cm(Centimeters): ' + (parseFloat($('#modal_height1').val()) * 2.54) + "cm")
    });
    $('#modal_length1').on('keyup', function () {
        $('#modal_length_cm1').text('In cm(Centimeters): ' + (parseFloat($('#modal_length1').val()) * 2.54) + "cm")
    });
    $('#save1').on('click', function () {
        var form = $("#reg_form1");
        form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4,
                },
                description: {
                    required: true,
                    minlength: 15,
                },
                height: {
                    required: true,
                },
                length: {
                    required: true,
                },
                price: {
                    required: true,
                },
                medium: {
                    required: true,
                },

            },
            messages: {
                name: {
                    required: "Artwork name is required",
                },
                description: {
                    required: "Artwork description is required",
                },
                height: {
                    required: "Height required",
                },
                length: {
                    required: "Length required",
                },
                orientation: {
                    required: "Orientation required",
                },
                medium: {
                    required: "Medium required",
                },
                price: {
                    required: "Artwork price required",
                },


            }
        });
        if (form.valid() === true) {
            $('#inputname1').val($('#modal_name1').val())
            $('#name1 span').text($('#modal_name1').val())

            $('#inputwidth1').val($('#modal_width1').val())
            $('#width1 span').text($('#modal_width1').val())

            $('#inputheight1').val($('#modal_height1').val())
            $('#height1 span').text($('#modal_height1').val())

            $('#inputdescription1').val($('#modal_description1').val())
            $('#description1 span').text($('#modal_description1').val())

            $('#inputmedium1').val($('#modal_medium1').val())
            $('#medium1 span').text($('#modal_medium1').val())

            $('#inputprice1').val($('#modal_price1').val())
            $('#price1 span').text($('#modal_price1').val())

            $('#reg_modal1').modal('toggle')
            $('#add_2').show()
            $('#edit_modal1').show()
        }
    })

    $('#reg_img2').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img2').click()
    });

    $('#reg_art_img2').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        img = window.URL.createObjectURL($(this).prop('files')[0])
        $('#reg_modal2').modal('toggle')
        $('#reg_modal_img2').attr('src', img)
        $('#reg_img2').attr('src', img)
    });

    $('#change_reg_img2').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img2').click()
    });
    $('#modal_width2').on('keyup', function () {
        $('#modal_width_cm2').text('In cm(Centimeters): ' + (parseFloat($('#modal_width2').val()) * 2.54) + "cm")
    });
    $('#modal_height2').on('keyup', function () {
        $('#modal_height_cm2').text('In cm(Centimeters): ' + (parseFloat($('#modal_height2').val()) * 2.54) + "cm")
    });
    $('#modal_length2').on('keyup', function () {
        $('#modal_length_cm2').text('In cm(Centimeters): ' + (parseFloat($('#modal_length2').val()) * 2.54) + "cm")
    });
    $('#save2').on('click', function () {
        var form = $("#reg_form2");
        form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4,
                },
                description: {
                    required: true,
                    minlength: 15,
                },
                height: {
                    required: true,
                },
                length: {
                    required: true,
                },
                price: {
                    required: true,
                },
                medium: {
                    required: true,
                },

            },
            messages: {
                name: {
                    required: "Artwork name is required",
                },
                description: {
                    required: "Artwork description is required",
                },
                height: {
                    required: "Height required",
                },
                length: {
                    required: "Length required",
                },
                orientation: {
                    required: "Orientation required",
                },
                medium: {
                    required: "Medium required",
                },
                price: {
                    required: "Artwork price required",
                },


            }
        })
        if (form.valid() == true) {
            $('#inputname2').val($('#modal_name2').val())
            $('#name2 span').text($('#modal_name2').val())

            $('#inputwidth2').val($('#modal_width2').val())
            $('#width2 span').text($('#modal_width2').val())

            $('#inputheight2').val($('#modal_height2').val())
            $('#height2 span').text($('#modal_height2').val())

            $('#inputdescription2').val($('#modal_description2').val())
            $('#description2 span').text($('#modal_description2').val())

            $('#inputmedium2').val($('#modal_medium2').val())
            $('#medium2 span').text($('#modal_medium2').val())

            $('#inputprice2').val($('#modal_price2').val())
            $('#price2 span').text($('#modal_price2').val())

            $('#reg_modal2').modal('toggle')
            $('#add_3').show()
            $('#edit_modal2').show()
        }
    })


    $('#reg_img3').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img3').click()
    });

    $('#reg_art_img3').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        img = window.URL.createObjectURL($(this).prop('files')[0])
        $('#reg_modal3').modal('toggle')
        $('#reg_modal_img3').attr('src', img)
        $('#reg_img3').attr('src', img)
    });

    $('#change_reg_img3').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img3').click()
    });
    $('#modal_width3').on('keyup', function () {
        $('#modal_width_cm3').text('In cm(Centimeters): ' + (parseFloat($('#modal_width3').val()) * 2.54) + "cm")
    });
    $('#modal_height3').on('keyup', function () {
        $('#modal_height_cm3').text('In cm(Centimeters): ' + (parseFloat($('#modal_height3').val()) * 2.54) + "cm")
    });
    $('#modal_length3').on('keyup', function () {
        $('#modal_length_cm3').text('In cm(Centimeters): ' + (parseFloat($('#modal_length3').val()) * 2.54) + "cm")
    });
    $('#save3').on('click', function () {
        var form = $("#reg_form3");
        form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4,
                },
                description: {
                    required: true,
                    minlength: 15,
                },
                height: {
                    required: true,
                },
                length: {
                    required: true,
                },
                price: {
                    required: true,
                },
                medium: {
                    required: true,
                },

            },
            messages: {
                name: {
                    required: "Artwork name is required",
                },
                description: {
                    required: "Artwork description is required",
                },
                height: {
                    required: "Height required",
                },
                length: {
                    required: "Length required",
                },
                orientation: {
                    required: "Orientation required",
                },
                medium: {
                    required: "Medium required",
                },
                price: {
                    required: "Artwork price required",
                },


            }
        })
        if (form.valid() == true) {
            $('#inputname3').val($('#modal_name3').val())
            $('#name3 span').text($('#modal_name3').val())

            $('#inputwidth3').val($('#modal_width3').val())
            $('#width3 span').text($('#modal_width3').val())

            $('#inputheight3').val($('#modal_height13').val())
            $('#height3 span').text($('#modal_height3').val())

            $('#inputdescription3').val($('#modal_description3').val())
            $('#description3 span').text($('#modal_description3').val())

            $('#inputmedium3').val($('#modal_medium3').val())
            $('#medium3 span').text($('#modal_medium3').val())

            $('#inputprice3').val($('#modal_price3').val())
            $('#price3 span').text($('#modal_price3').val())

            $('#reg_modal3').modal('toggle')
            $('#add_4').show()
            $('#edit_modal3').show()
        }
    })

    $('#reg_img4').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img4').click()
    });

    $('#reg_art_img4').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        img = window.URL.createObjectURL($(this).prop('files')[0])
        $('#reg_modal4').modal('toggle')
        $('#reg_modal_img4').attr('src', img)
        $('#reg_img4').attr('src', img)
    });
    $('#change_reg_img4').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img4').click()
    });

    $('#modal_width4').on('keyup', function () {
        $('#modal_width_cm4').text('In cm(Centimeters): ' + (parseFloat($('#modal_width4').val()) * 2.54) + "cm")
    });
    $('#modal_height4').on('keyup', function () {
        $('#modal_height_cm4').text('In cm(Centimeters): ' + (parseFloat($('#modal_height4').val()) * 2.54) + "cm")
    });
    $('#modal_length4').on('keyup', function () {
        $('#modal_length_cm4').text('In cm(Centimeters): ' + (parseFloat($('#modal_length4').val()) * 2.54) + "cm")
    });
    $('#save4').on('click', function () {
        var form = $("#reg_form4");
        form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4,
                },
                description: {
                    required: true,
                    minlength: 15,
                },
                height: {
                    required: true,
                },
                length: {
                    required: true,
                },
                price: {
                    required: true,
                },
                medium: {
                    required: true,
                },

            },
            messages: {
                name: {
                    required: "Artwork name is required",
                },
                description: {
                    required: "Artwork description is required",
                },
                height: {
                    required: "Height required",
                },
                length: {
                    required: "Length required",
                },
                orientation: {
                    required: "Orientation required",
                },
                medium: {
                    required: "Medium required",
                },
                price: {
                    required: "Artwork price required",
                },


            }
        })
        if (form.valid() == true) {
            $('#inputname4').val($('#modal_name4').val())
            $('#name4 span').text($('#modal_name4').val())

            $('#inputwidth4').val($('#modal_width4').val())
            $('#width4 span').text($('#modal_width4').val())

            $('#inputheight4').val($('#modal_height4').val())
            $('#height4 span').text($('#modal_height4').val())

            $('#inputdescription4').val($('#modal_description4').val())
            $('#description4 span').text($('#modal_description4').val())

            $('#inputmedium4').val($('#modal_medium4').val())
            $('#medium4 span').text($('#modal_medium4').val())

            $('#inputprice4').val($('#modal_price4').val())
            $('#price4 span').text($('#modal_price4').val())

            $('#reg_modal4').modal('toggle')
            $('#add_5').show()
            $('#edit_modal4').show()
        }
    })

    $('#reg_img5').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img5').click()
    });

    $('#reg_art_img5').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        img = window.URL.createObjectURL($(this).prop('files')[0])
        $('#reg_modal5').modal('toggle')
        $('#reg_modal_img5').attr('src', img)
        $('#reg_img5').attr('src', img)
    });
    $('#change_reg_img5').on('click', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        $('#reg_art_img5').click()
    });

    $('#modal_width5').on('keyup', function () {
        $('#modal_width_cm5').text('In cm(Centimeters): ' + (parseFloat($('#modal_width5').val()) * 2.54) + "cm")
    });
    $('#modal_height5').on('keyup', function () {
        $('#modal_height_cm5').text('In cm(Centimeters): ' + (parseFloat($('#modal_height5').val()) * 2.54) + "cm")
    });
    $('#modal_length5').on('keyup', function () {
        $('#modal_length_cm5').text('In cm(Centimeters): ' + (parseFloat($('#modal_length5').val()) * 2.54) + "cm")
    });
    $('#save5').on('click', function () {
        var form = $("#reg_form5");
        form.validate({
            rules: {
                name: {
                    required: true,
                    minlength: 4,
                },
                description: {
                    required: true,
                    minlength: 15,
                },
                height: {
                    required: true,
                },
                length: {
                    required: true,
                },
                price: {
                    required: true,
                },
                medium: {
                    required: true,
                },

            },
            messages: {
                name: {
                    required: "Artwork name is required",
                },
                description: {
                    required: "Artwork description is required",
                },
                height: {
                    required: "Height required",
                },
                length: {
                    required: "Length required",
                },
                orientation: {
                    required: "Orientation required",
                },
                medium: {
                    required: "Medium required",
                },
                price: {
                    required: "Artwork price required",
                },


            }
        })
        if (form.valid() == true) {
            $('#inputname5').val($('#modal_name5').val())
            $('#name1 span').text($('#modal_name5').val())

            $('#inputwidth5').val($('#modal_width5').val())
            $('#width5 span').text($('#modal_width5').val())

            $('#inputheight5').val($('#modal_height5').val())
            $('#height5 span').text($('#modal_height5').val())

            $('#inputdescription5').val($('#modal_description5').val())
            $('#description5 span').text($('#modal_description5').val())

            $('#inputmedium5').val($('#modal_medium5').val())
            $('#medium5 span').text($('#modal_medium5').val())

            $('#inputprice5').val($('#modal_price5').val())
            $('#price5 span').text($('#modal_price5').val())

            $('#reg_modal5').modal('toggle')
            $('#edit_modal5').show()
        }
    })