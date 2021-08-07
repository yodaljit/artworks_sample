$(".results").hide()
    $(window).scroll(function () {
        if ($(window).width() > 992) {
            if ($(window).scrollTop() > 155) {
                $('#desk-nav').hide();
                $('#links').hide();
                $('#desk-sticky-nav').show();
            } else {
                $('#desk-nav').show();
                $('#links').show();
                $('#desk-sticky-nav').hide();
            }
        } else {
            if ($(window).scrollTop() > 60) {
                $('.nav').css('background-color', '#212120')
            } else {
                $('.nav').css('background-color', '#141413')
            }
        }
    });



    $('#desk-sticky-nav .header-icons #search').hide();

    $('#search-icon').on('click', function () {
        $('#desk-sticky-nav .header-icons #search').show();
        $(this).hide();
        $('#desk-sticky-nav .header-icons .wish__menu').hide()
        $('#desk-sticky-nav .header-icons .cart__menu').hide()
        $('#desk-sticky-nav .header-icons .user__menu').hide()
        $('#desk-sticky-nav .header-icons #user').hide()
    })

    $('#desk-sticky-nav .input-group-text').on('click', function () {
        console.log('click')
        $('#search-icon').show();
        $('#desk-sticky-nav .header-icons #search').hide();
        $('#desk-sticky-nav .header-icons .wish__menu').show()
        $('#desk-sticky-nav .header-icons .cart__menu').show()
        $('#desk-sticky-nav .header-icons .user__menu').show()
        $('#desk-sticky-nav .header-icons #user').show()
    })

$('.mob-search .input-group-text').on('click', function () {
        $('.mob-search').hide();
        
    })

$.fn.rmvwish = function () {
        var rmvWish = document.getElementsByClassName('remove-wish')
        for (i = 0; i < rmvWish.length; i++) {
            rmvWish[i].addEventListener('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                productId = this.dataset.product
                action = this.dataset.action
                parent = $(this)
                shp = $('.product__details').siblings()
                if (user == "AnonymousUser") {
                    delete wishlist[productId]
                    document.cookie = 'wishlist=' + JSON.stringify(wishlist) + ";domain=;path=/"
                    $('.wish__single__product').each(function (index) {
                        if (window.location.pathname == '/wishlist/') {
                            console.log($(parent).parent().siblings().find('h2 a').html())
                            if ($(parent).parent().siblings().find('h2 a').html() == $('.art-name h4').eq(index).html()) {
                                console.log($('table tbody').find('tr').eq(index))
                                console.log($('.art-name h4').eq(index).text())
                                $('table tbody').find('tr').eq(index).remove()
                            }
                            if ($('table tbody tr').length < 1) {
                                $('.wishlist-table').remove();
                                $('.wishlist-content').append(`<p class="text-center"><strong>There's no item in your wishlist.</strong></p>`)
                            }
                        }
                    })
                    $('.wishlist-cart').each(function (index) {
                        if ($(this).attr('data-product') === productId && $(this).attr('data-action') === 'remove-wishlist') {

                            $(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + productId + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`).insertAfter($('.wishlist-cart').eq(index))
                            $('.wishlist-cart').eq(index).remove();
                            $.fn.wishlist();
                            $.fn.updateCart();
                            $.fn.rmvwish();
                        }

                    });
                    $('.wish-count').html(parseFloat($('.wish-count').html()) - 1);
                    $(parent).parent().parent().remove()
                    if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                        $('.wish__btn').remove();
                        $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                    }

                    $('.total__price span').text(thousands_separators(parseFloat($('.total__price span').text().replace(/,/g, '')) - parseFloat(parent.parent().parent().find('.shp__pro__details').find('span span').text().replace(/,/g, ''))))
                    $.fn.rmvwish();
                    $.fn.wishlist();
                    $.fn.updateCart();
                } else {
                    $.ajax({
                        type: 'POST',
                        url: window.location.href,
                        headers: {
                            'X-CSRFToken': csrftoken
                        },
                        data: {
                            productId: productId,
                            product: productId,
                            action: action
                        },
                        success: function () {
                            $('.wish__single__product').each(function (index) {
                                if (window.location.pathname == '/wishlist/') {
                                    console.log($(parent).parent().siblings().find('h2 a').html())
                                    if ($(parent).parent().siblings().find('h2 a').html() == $('.art-name h4').eq(index).html()) {
                                        console.log($('table tbody').find('tr').eq(index))
                                        console.log($('.art-name h4').eq(index).text())
                                        $('table tbody').find('tr').eq(index).remove()
                                    }
                                    if ($('table tbody tr').length < 1) {
                                        $('.wishlist-table').remove();
                                        $('.wishlist-content').append(`<p class="text-center"><strong>There's no item in your wishlist.</strong></p>`)
                                    }
                                }
                            })
                            $('.wishlist-cart').each(function (index) {

                                if ($(this).attr('data-product') === productId && $(this).attr('data-action') === 'remove-wishlist') {
                                    $(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + productId + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`).insertAfter($('.wishlist-cart').eq(index))
                                    $('.wishlist-cart').eq(index).remove();

                                }

                            });
                            $('.wish-count').html(parseFloat($('.wish-count').html()) - 1);
                            $(parent).parent().parent().remove()
                            if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                                $('.wish__btn').remove();
                                $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                            }
                            $('.total__price span').text(thousands_separators(parseFloat($('.total__price span').text().replace(/,/g, '')) - parseFloat(parent.parent().parent().find('.shp__pro__details').find('span span').text().replace(/,/g, ''))))

                            $.fn.wishlist();
                            $.fn.updateCart();
                            $.fn.rmvwish();

                        }
                    })
                }
            })
        }
    }
    $.fn.rmvorder = function () {
        var rmvOrder = document.getElementsByClassName('remove-cart')

        for (i = 0; i < rmvOrder.length; i++) {
            rmvOrder[i].addEventListener('click', function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                productId = this.dataset.product
                action = this.dataset.action
                parent = $(this)
                shp = $('.product__details').siblings()
                if (user == "AnonymousUser") {
                    delete cart[productId]
                    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
                    $('.update-cart').each(function (index) {
                        if ($(this).attr('data-product') === productId && $(this).hasClass('art-more') && $(this).attr('data-action') === 'remove') {
                            console.log('has')
                            $(`<a href="javascript:void(0)" class="update-cart art-more" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($('.update-cart').eq(index))
                            $('.update-cart').eq(index).remove();
                            console.log('done')
                        }
                        if ($(this).attr('data-product') === productId && !$(this).hasClass('art-more') && $(this).attr('data-action') === 'remove') {
                            if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                                $(`<div data-tooltip="Add to Cart">
                <img src="` + window.location.origin + `/static/main/images/cart.svg" class="update-cart" data-product="` + productId + `" data-action="add" id="add-img" alt="" width="100%" height="100%">
                </div>
                `).insertAfter($('.update-cart').eq(index).parent())
                                $('.update-cart').eq(index).parent().remove();
                                $.fn.updateCart();
                                $.fn.rmvorder();
                            } else {

                                $(`<a href="javascript:void(0)" class="update-cart" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($('.update-cart').eq(index))
                                console.log('done')
                                $('.update-cart').eq(index).remove();
                            }

                        }


                    })

                    $('.cart-count').html(parseFloat($('.cart-count').html()) - 1);
                    $(parent).parent().parent().remove()
                    if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                        $('.shopping__btn').remove();
                        $('.shoping__total').remove();
                        $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                    }

                    $('.total__price span').text(thousands_separators((parseFloat($('.total__price span:last').text().replace(/,/g, '')) - parseFloat(parent.parent().parent().find('.shp__pro__details').find('span span').text().replace(/,/g, ''))).toFixed(2)))

                    $.fn.wishlist();
                    $.fn.updateCart();
                } else {
                    $.ajax({
                        type: 'POST',
                        url: window.location.href,
                        headers: {
                            'X-CSRFToken': csrftoken
                        },
                        data: {
                            productId: productId,
                            product: productId,
                            action: action
                        },
                        success: function () {
                            $('.update-cart').each(function (index) {
                                if ($(this).attr('data-product') === productId && $(this).hasClass('art-more') && $(this).attr('data-action') === 'remove') {
                                    console.log('has')
                                    $(`<a href="javascript:void(0)" class="update-cart art-more" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($('.update-cart').eq(index))
                                    $('.update-cart').eq(index).remove();
                                    console.log('done')
                                }
                                if ($(this).attr('data-product') === productId && !$(this).hasClass('art-more') && $(this).attr('data-action') === 'remove') {
                                    if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                                        $(`<div data-tooltip="Add to Cart">
                      <img src="` + window.location.origin + `/static/main/images/cart.svg" class="update-cart" data-product="` + productId + `" data-action="add" id="add-img" alt="" width="100%" height="100%">
                      </div>
                      `).insertAfter($('.update-cart').eq(index).parent())
                                        $('.update-cart').eq(index).parent().remove();
                                        $.fn.updateCart();
                                        $.fn.rmvorder();
                                    } else {

                                        $(`<a href="javascript:void(0)" class="update-cart" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($('.update-cart').eq(index))
                                        console.log('done')
                                        $('.update-cart').eq(index).remove();
                                    }

                                }


                            })

                            $('.cart-count').html(parseFloat($('.cart-count').html()) - 1);
                            $(parent).parent().parent().remove()
                            if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                                $('.shopping__btn').remove();
                                $('.shoping__total').remove();
                                $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                            }

                            $('.total__price span').text(thousands_separators((parseFloat($('.total__price span').text().replace(/,/g, '')) - parseFloat($(parent).parent().parent().find('.shp__pro__details').find('.shp__price span').text().replace(/,/g, '')).toFixed(2))))
                            console.log($('.total__price span').text())

                            $.fn.wishlist();
                            $.fn.updateCart();

                        }
                    })
                }
            })
        }

    }

    $.fn.rmvorder();
    $.fn.rmvwish();
    $('#mobile-nav .language-selector').on('click', function (e) {
        $(this).find('.iconify').toggleClass('active')
        $('#lang-select').toggle();
    })


    $('#mobile-nav .currency-selector').on('click', function (e) {
        $(this).find('.iconify').toggleClass('active')
        $('#curr-select').toggle();
    })

    $('#desk-nav .language-selector').on('click', function (e) {
        $(this).find('.iconify').toggleClass('active')
        $('#desk-nav #lang-select').toggle();
    })

    $('#desk-nav .currency-selector').on('click', function (e) {
        $(this).find('.iconify').toggleClass('active')
        $('#desk-nav #curr-select').toggle();
    })

    $('#desk-sticky-nav .currency-selector').on('click', function (e) {
        $(this).find('.iconify').toggleClass('active')
        $('#desk-sticky-nav #curr-select').toggle();
    });
    


    function thousands_separators(num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }



    $('#mobile-filter-show').on('click', function (e) {
        $('#mobile-filter-options').toggleClass('mobile-filter-show')
        $('#mobile-filter-options').toggleClass('mobile-filter-hide')
    });

    $('.settings').parent().on('click', function () {
        $('#advance-filters').toggleClass('hide-advance-filters');
        $('#advance-filters').toggleClass('show-advance-filters');
    });

    $('.artist-filters > #artist-filter-show').on('click', function (e) {
        $('#artist-filter-options').toggleClass('artist-filter-show')
        $('#artist-filter-options').toggleClass('artist-filter-hide')
    });
    $(document).on('show', '.accordion', function (e) {
        //$('.accordion-heading i').toggleClass(' ');
        $(e.target).prev('.accordion-heading').addClass('accordion-opened');
    });

    $(document).on('hide', '.accordion', function (e) {
        $(this).find('.accordion-heading').not($(e.target)).removeClass('accordion-opened');
        //$('.accordion-heading i').toggleClass('fa-chevron-right fa-chevron-down');
    });

    $('.nav-item a').filter(function () {
        return this.href == window.location.href
    }).addClass('active').siblings().removeClass('active')

$('.toggle__menu').on('click', function () {
        $('.offsetmenu').addClass('offsetmenu__on');
        $('.body__overlay').addClass('is-visible');

    });

    $('.offsetmenu__close__btn').on('click', function () {
        $('.offsetmenu').removeClass('offsetmenu__on');
        $('.body__overlay').removeClass('is-visible');
    });
    $('.cart__menu').on('click', function () {
        $('.shopping__cart').addClass('shopping__cart__on');
        $('.body__overlay').addClass('is-visible');

    });

    $('.offsetmenu__close__btn').on('click', function () {
        $('.shopping__cart').removeClass('shopping__cart__on');
        $('.body__overlay').removeClass('is-visible');
    });

    $('.wish__menu').on('click', function () {
        $('.wishlist__cart').addClass('wishlist__cart__on');
        $('.body__overlay').addClass('is-visible');

    });



    $('.offsetmenu__close__btn').on('click', function () {
        $('.wishlist__cart').removeClass('wishlist__cart__on');
        $('.body__overlay').removeClass('is-visible');
    });

    $('.mobile__menuu').on('click', function () {
        $('.mobile__menu').addClass('mobile__menu__on');
        $('.body__overlay2').addClass('is-visible');

    });

    $('.offsetmenu__close__btn').on('click', function () {
        $('.mobile__menu').removeClass('mobile__menu__on');
        $('.body__overlay2').removeClass('is-visible');
    });

    $('.user__menu').on('click', function () {
        $('.user__cart').addClass('user__cart__on');
        $('.body__overlay').addClass('is-visible');

    });
    $('.offsetmenu__close__btn').on('click', function () {
        $('.user__cart').removeClass('user__cart__on');
        $('.body__overlay').removeClass('is-visible');
    });
    $('.filter__menu').on('click', function () {
        $('.filter__wrap').addClass('filter__menu__on');
        $('.body__overlay').addClass('is-visible');

    });

    $('.filter__menu__close__btn').on('click', function () {
        $('.filter__wrap').removeClass('filter__menu__on');
        $('.body__overlay').removeClass('is-visible');
    });

    $('.body__overlay').on('click', function () {
        $(this).removeClass('is-visible');
        $('.offsetmenu').removeClass('offsetmenu__on');
        $('.shopping__cart').removeClass('shopping__cart__on');
        $('.wishlist__cart').removeClass('wishlist__cart__on');
        $('.filter__wrap').removeClass('filter__menu__on');
        $('.user__cart').removeClass('user__cart__on');
    });



    function getToken(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    const csrftoken = getToken('csrftoken');

    function getCookie(name) {
        var cookieArr = document.cookie.split(';')
        for (i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split('=');

            if (name == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1])
            }
        }
        return null;
    }

    var cart = JSON.parse(getCookie('cart'));

    if (cart == undefined) {
        cart = {}
        document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
    }

    var wishlist = JSON.parse(getCookie('wishlist'));

    if (wishlist == undefined) {
        wishlist = {}
        document.cookie = 'wishlist=' + JSON.stringify(wishlist) + ";domain=;path=/"
    }

    var currency = JSON.parse(getCookie('currency'))
    var currencySign = JSON.parse(getCookie('currencySign'))
    if (currency == undefined) {
        currency = 'INR'
        currencySign = '₹'
        document.cookie = 'currency=' + JSON.stringify(currency) + ";domain=;path=/"
        document.cookie = 'currencySign=' + JSON.stringify(currencySign) + ";domain=;path=/"
    }

    $('.currency-selector p').text(currency)
    $('.total__price')
        .contents() // get all child nodes including text and comment nodes
        .each(function () { // iterate over nodes
            if (this.nodeType == 3) // check node is text node
                $(this).replaceWith(currencySign) // update the content and replace node with html content
        });



    var initialSalePrice = []
    var initialOldPrice = []
    var salePrice = []
    var basePrice = []
    var pricePrice = []
    var shp_price = []
    var taxes = []
    var price = $('.sale_price span')
    var oldPrice = $('.old_price span')
    var nPrice = $('.new__price span')
    var bPrice = $('.base_price')
    var pPrice = $('.price')
    var shp_prce = []

    var wish_price = []
    $('.sale_price').each(function (index) {
        initialSalePrice.push($('.sale_price span').eq(index).text())
    })
    for (var i = 0; i < nPrice.length; i++) {
        salePrice.push($('.new__price span').eq(i).text())
    }
    for (var i = 0; i < bPrice.length; i++) {
        basePrice.push($('.base_price').eq(i).text())
    }
    for (var i = 0; i < pPrice.length; i++) {
        pricePrice.push($('.price').eq(i).text())
    }
    console.log(initialSalePrice)
    for (var i = 0; i < oldPrice.length; i++) {
        initialOldPrice.push($('.old_price span').eq(i).text())
    }
    $('.shp__price').each(function (index) {
        shp_price.push($('.non_change_shp_price span').eq(index).text())
    })

    function calculate(currency, currencySign) {
        const from_currency = 'INR';
        const to_currency = currency;

        fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
            .then(res => res.json())
            .then(res => {
                const rate = res.rates[to_currency];




                $('.wish__price span').each(function () {
                    wish_price.push($(this).text())
                })


                url = window.location.href.split("/")
                if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + url[4] + '/') {
                    var alterPrice = []
                    $('.non_change_price span').each(function () {
                        alterPrice.push($(this).text())
                    })

                    for (var i = 0; i < nPrice.length; i++) {

                        console.log(alterPrice)
                        $('.new__price span').eq(i).text(thousands_separators((parseFloat($(alterPrice)[i]) * rate).toFixed(2)))

                        $('.new__price')
                            .contents() // get all child nodes including text and comment nodes
                            .each(function () { // iterate over nodes
                                if (this.nodeType == 3) // check node is text node
                                    $(this).replaceWith(currencySign) // update the content and replace node with html content
                            });
                    }
                }

                $('.sale_price').each(function (i) {
                    $('.sale_price span').eq(i).html(thousands_separators((parseFloat($(initialSalePrice)[i].replace(/,/g, '')) * rate).toFixed(2)));
                    $('.sale_price')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                })

                for (var i = 0; i < oldPrice.length; i++) {
                    $('.old_price span').eq(i).text(thousands_separators((parseFloat($(initialOldPrice)[i].replace(/,/g, '')) * rate).toFixed(2)));
                    $('.old_price')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                }
                console.log(rate)
                $('.non_change_shp_price span').each(function (i) {
                    console.log($('.non_change_shp_price span').text())
                    $('.shp__price span').eq(i).text((parseFloat($('.non_change_shp_price span').eq(i).text().replace(/,/g, '')) * rate).toFixed(2))
                    console.log($('.shp__price span').eq(i).text())

                    $('.shp__price')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        })

                })


                /*$('.total__price span').text(thousands_separators((parseFloat(($total_price).replace(/,/g, '')) / rate).toFixed(2)));
                $total_final_price = $('.total__price span').text()
                console.log($total_final_price)*/
                $total_price = 0
                $('.shp__price span').each(function (i) {
                    $total_price += parseFloat($('.non_change_shp_price span').eq(i).text().replace(/,/g, ''))
                })
                console.log($total_price)
                $('.total__price span').text(thousands_separators((($total_price) * rate).toFixed(2)))
                console.log($('.total__price span').text())
                $('.total__price')
                    .contents() // get all child nodes including text and comment nodes
                    .each(function () { // iterate over nodes
                        if (this.nodeType == 3) // check node is text node
                            $(this).replaceWith(currencySign) // update the content and replace node with html content
                    });


                for (var i = 0; i < wish_price.length; i++) {
                    $('.wish__price span').eq(i).text(thousands_separators((parseFloat($(wish_price)[i].replace(/,/g, '')) * rate).toFixed(2)));
                    $('.wish__price')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                }

                if (window.location.pathname === '/cart/') {
                    var totaltaxes = 0
                    var total = 0
                    var totalpr = 0

                    $('.amount').each(function (index) {
                        initialSalePrice.push($(this).html())
                        taxes.push($('.amount1 span').eq(index).html())
                        totaltaxes = parseFloat(totaltaxes) + (parseFloat($(taxes)[index].replace(/,/g, '')))
                        console.log(taxes)
                        total = parseFloat(total) + (parseFloat($(initialSalePrice)[index].replace(/,/g, ''))) + (parseFloat($(taxes)[index].replace(/,/g, '')))
                        totalpr = parseFloat(totalpr) + (parseFloat($(initialSalePrice)[index].replace(/,/g, '')))
                        console.log(total)
                        $(this).html(thousands_separators((parseFloat($(initialSalePrice)[index].replace(/,/g, '')) * rate).toFixed(2)));
                        $('.total')
                            .contents() // get all child nodes including text and comment nodes
                            .each(function () { // iterate over nodes
                                if (this.nodeType == 3) // check node is text node
                                    $(this).replaceWith(currencySign) // update the content and replace node with html content
                            });
                    });
                    $('#amount span').html(thousands_separators((parseFloat(total) * rate).toFixed(2)))
                        //$('#discount span').html(thousands_separators((parseFloat($('#discount span').html()) * rate).toFixed(2)))
                    $('.amount1 span').each(function (index) {

                        $(this).html(thousands_separators((parseFloat($(taxes)[index].replace(/,/g, '')) * rate).toFixed(2)))
                        console.log(this)
                    })
                    $('.tax span').each(function (index) {
                        $(this).html(thousands_separators((parseFloat(totaltaxes) * rate).toFixed(2)))
                    })
                    $('#amount1 span').html(thousands_separators((parseFloat(totalpr) * rate).toFixed(2)))
                    $('#amount2 span').html(thousands_separators((parseFloat(total) * rate).toFixed(2)))
                    $('#amount')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                    $('#amount1')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                    $('#amount2')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                    $('#discount')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });

                    $('.amount1')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                    $('.tax')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });
                }

                if (window.location.pathname === '/confirm-order/' || window.location.pathname === '/thank-you/') {
                    var totali = 0

                    initialOldPrice.push($('#amount span').html().replace(/,/g, ''))
                    console.log(initialOldPrice)
                    $('#ctax span').each(function (index) {
                        taxes.push($(this).html().replace(/,/g, ''))
                        $(this).html(thousands_separators((parseFloat(taxes[index]) * rate).toFixed(2)))
                    })
                    $('.amount span').each(function (index) {
                        initialSalePrice.push($(this).html())
                        totali = parseFloat(totali) + (parseFloat($(initialSalePrice)[index].replace(/,/g, '')))

                        console.log(initialSalePrice)
                        console.log(taxes)
                        $(this).text(thousands_separators((parseFloat($(initialSalePrice)[index].replace(/,/g, '')) * rate).toFixed(2)));
                        $('.amount')
                            .contents() // get all child nodes including text and comment nodes
                            .each(function () { // iterate over nodes
                                if (this.nodeType == 3) // check node is text node
                                    $(this).replaceWith(currencySign) // update the content and replace node with html content
                            });
                    });
                    $('#amount span').html(thousands_separators((parseFloat($(initialOldPrice)[0]) * rate).toFixed(2)))

                    $('#amount')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });

                    $('#ctax')
                        .contents() // get all child nodes including text and comment nodes
                        .each(function () { // iterate over nodes
                            if (this.nodeType == 3) // check node is text node
                                $(this).replaceWith(currencySign) // update the content and replace node with html content
                        });

                    //$('#form').find('#script').attr('data-amount', (parseFloat(total) * rate).toFixed(2)+'00')
                    //$('#form').find('#script').attr('data-currency', currency)
                }

            })
    }

    console.log(window.location.pathname.split('/').pop())
    calculate(currency, currencySign);

    var curren = $('.currency')

    var timer = 0;
    for (i = 0; i < curren.length; i++) {
        curren[i].addEventListener('click', function (e) {
            clearInterval(timer);
            e.preventDefault();

            var currency = this.dataset.curr
            var currencySign = this.dataset.sign
            $('.currency-selector p').text(currency)
            document.cookie = 'currency=' + JSON.stringify(currency) + ";domain=;path=/"
            document.cookie = 'currencySign=' + JSON.stringify(currencySign) + ";domain=;path=/"

            timer = setInterval(function () {
                calculate(currency, currencySign);
            }, 1000)
        });
    }

$('.search-form').on('keyup', function (e) {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            $(this).parent().parent().submit();
        }
        if ($('.search-form').val() === '') {
            $('.results').html("");
            $('.results').hide();
        }
        if ($('.search-form').val().length >= 2 && $('.search-form').val() != '') {
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken,

                },
                data: {
                    q: $('.search-form').val(),
                    action: 'search'
                },
                success: function (data) {
                    console.log(data)
                    $('.results').html("");
                    var searchfield = $('.search-form').val();
                    var expression = new RegExp(searchfield, "i")
                    $.each(data, function (key, value) {
                        if (value.fields.search(expression) != -1) {
                            $('.results').append(
                                `<a href="/artwork-details/` + data[key]['pk'] + `" style="text-decoration: none"><p class="text-dark">` + data[key]['fields']['name'] + `</p></a>`
                            )
                        }
                    })
                    $('.results').show();
                }
            })
        }
    });

    $('.mobile-search-form').on('keyup', function (e) {
        if (e.keyCode === 13) {
            // Cancel the default action, if needed
            e.preventDefault();
            // Trigger the button element with a click
            $(this).parent().parent().submit();
        }
        if ($('.mobile-search-form').val() === '') {
            $('.results').html("");
            $('.results').hide();
        }
        if ($('.mobile-search-form').val().length >= 2 && $('.mobile-search-form').val() != '') {
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken,

                },
                data: {
                    q: $('.mobile-search-form').val(),
                    action: 'search'
                },
                success: function (data) {
                    console.log(data)
                    $('.results').html("");
                    var searchfield = $('.mobile-search-form').val();
                    var expression = new RegExp(searchfield, "i")
                    $.each(data, function (key, value) {
                        if (value.fields.search(expression) != -1) {
                            $('.results').append(
                                `<a href="/artwork-details/` + data[key]['pk'] + `" style="text-decoration: none"><p class="text-dark">` + data[key]['fields']['name'] + `</p></a>`
                            )
                        }
                    })
                    $('.results').show();
                }
            })
        }
    });

    $('body').on('click', function () {
        $('.results').children().remove();
        $('.results').hide();
    });
var $ul   =   $('.sidebar-navigation > ul');
  
  $ul.find('li a').click(function(e){
    var $li = $(this).parent();
    
    if($li.find('ul').length > 0){
      e.preventDefault();
      
      if($li.hasClass('selected')){
        $li.removeClass('selected').find('li').removeClass('selected');
        $li.find('ul').slideUp(400);
        $li.find('a em').removeClass('mdi-flip-v');
      }else{
        
        if($li.parents('li.selected').length == 0){
          $ul.find('li').removeClass('selected');
          $ul.find('ul').slideUp(400);
          $ul.find('li a em').removeClass('mdi-flip-v');
        }else{
          $li.parent().find('li').removeClass('selected');
          $li.parent().find('> li ul').slideUp(400);
          $li.parent().find('> li a em').removeClass('mdi-flip-v');
        }
        
        $li.addClass('selected');
        $li.find('>ul').slideDown(400);
        $li.find('>a>em').addClass('mdi-flip-v');
      }
    }
  });
  
  
  $('.sidebar-navigation > ul ul').each(function(i){
    if($(this).find('>li>ul').length > 0){
      var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
      var pIntPLeft   = parseInt(paddingLeft);
      var result      = pIntPLeft + 20;
      
      $(this).find('>li>a').css('padding-left',result);
    }else{
      var paddingLeft = $(this).parent().parent().find('>li>a').css('padding-left');
      var pIntPLeft   = parseInt(paddingLeft);
      var result      = pIntPLeft + 20;
      
      $(this).find('>li>a').css('padding-left',result).parent().addClass('selected--last');
    }
  });
  
  var t = ' li > ul ';
  for(var i=1;i<=10;i++){
    $('.sidebar-navigation > ul > ' + t.repeat(i)).addClass('subMenuColor' + i);
  }
  
  var activeLi = $('li.selected');
  if(activeLi.length){
    opener(activeLi);
  }
  
  function opener(li){
    var ul = li.closest('ul');
    if(ul.length){
      
        li.addClass('selected');
        ul.addClass('open');
        li.find('>a>em').addClass('mdi-flip-v');
      
      if(ul.closest('li').length){
        opener(ul.closest('li'));
      }else{
        return false;
      }
      
    }
  }