
$(function () {

    /*new Flickity( '.main-carousel', {
         prevNextButtons: false,
         wrapAround: true,
         imagesLoaded: true
        });*/
    $('.slidemenu a').filter(function () {
        return this.href == window.location.href
    }).addClass('active').siblings().removeClass('active')
    $('.profile img').on('click', function () {
        $('#profile').click()
    });

    
    
    var $temp = $("<input>");
    var $url = $(location).attr('href');

    $('#copy').on('click', function (e) {
        e.preventDefault();
        $("body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();
        $('#social_share').modal('toggle')

    })

    $('.results').hide();

    
    $('#bidding-parent').hide();
    $('#bid').on('click', function () {
        $('#bidding-parent').toggle();
    });

    $('#like .iconify').on('click', function () {
        $(this).css({
            'color': '#FFCC7E',
            'border': '1px solid #FFCC7E'
        })
    });
    $('#follow .iconify').on('click', function () {
        $.ajax({
            type: 'POST',
            url: window.location.href,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                id: $('#id').val()
            },
            success: function (data) {
                if (data == "Followed") {
                    $('#follow .iconify').attr('data-icon', 'carbon:user-follow')
                    $('#follow .iconify').css({
                        'background-color': '#FFCC7E',
                        'color': '#000000',
                        'border': '1px solid #FFCC7E'
                    })
                } else {
                    $('#follow .iconify').attr('data-icon', 'carbon:user-follow')
                    $('#follow .iconify').css({
                        'color': '#ffcc7e',
                        'background-color': 'transparent'
                    })
                }
            }
        })
        $(this).css({
            'color': '#FFCC7E',
            'border': '1px solid #FFCC7E'
        })
    });
    $('#share .iconify').on('click', function () {
        $(this).css({
            'color': '#FFCC7E',
            'border': '1px solid #FFCC7E'
        })
    });

    
    $('.lb-next').css('opacity', 1);
    $('.lb-prev').css('opacity', 1);

    

    
    $('#search-categories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#grid-view-overlay').show();
        $.ajax({
            type: 'POST',
            url: window.location.href,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                search_categories: value
            },
            success: function (data) {
                url = window.location.href.split("/")
                console.log(url)
                $('#grid-view-overlay').hide();
                console.log(data)
                $('#search-subcategories option:not(:first)').remove()

                for (i = 0; i < data[0].length; i++) {
                    $('#search-subcategories').append(`<option value=` + data[0][i]['pk'] + `>` + data[0][i]['fields']['name'] + `</option>`)


                }
                $("#search-subcategories option:selected").prop("selected", false);
                $("#search-subcategories option:first").prop("selected", "selected");
                $('#grid-view').children().remove()
                $('#grid-viewi').children().remove()

                if (window.location.pathname === '/artists/' || window.location.pathname === '/artists/' + url[4] + '/' + url[5] + '/' || window.location.pathname === '/artists/' + url[4] + '/') {
                    if (data[1].length === 0) {
                        $('grid-viewi').append(`
        <h3 class="text-center text-white">There are no artists in this category.</h3>
        `)
                    }
                    if (data.length > 1) {
                        for (j = 0; j < data[1].length; j++) {
                            $('#grid-viewi').append(
                                `<div class="col-md-4 col-sm-12 mt-3" id="single-artist">
            <a href="/artist/` + data[2][j]['pk'] + `">
            <img src="` + window.location.origin + `/media/` + data[2][j]['fields']['image'] + `/" alt="">
            </a>
            <div class="row">
                <div class="col">
                    <a href="/artists/` + data[1][j]['pk'] + `"><h4>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h4></a>
                    <a href="/artists/` + data[2][j]['pk'] + `"><p>` + data[3][j]['fields']['name'] + `</p></a>
                </div>
            </div>
        </div>`

                            )
                        }
                    } else {
                        for (j = 0; j < data[0].length; j++) {
                            $('#grid-viewi').append(
                                ` <div class="col-md-4 col-sm-12 mt-3" id="single-artist">
                    <a href="/artist/` + data[1][j]['pk'] + `">
                    <img src="` + window.location.origin + `/media/` + data[2][0]['fields']['image'] + `/" alt="">
                    </a>
                    <div class="row">
                        <div class="col">
                        <a href="{% url 'artist_details' a.id %}"><h4>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h4></a>
                        <a href="{% url 'artist_details' a.id %}"><p>` + data[3][j]['fields']['name'] + `</p></a>
                        </div>
                       
                    </div>
                </div>`

                            )

                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                    }
                } else {
                    if (data[1].length === 0) {
                        $('#grid-view').append(
                            `<h3 class="text-center text-white">There are no products in this category.</h3>`
                        )
                    }
                    if (data.length > 1) {
                        for (j = 0; j < data[1].length; j++) {
                            $('#grid-view').append(
                                `<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
          
          <a href="/artwork-details/` + data[1][j]['pk'] + `"><img src="` + window.location.origin + `/media/` + data[1][j]['fields']['image'] + `" alt=""></a>
          <div class="row">
              <div class="col-4 prices">
              ` + ((data[1][j]['fields']['sale_price']) ? `<p class="old_price">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `</span></p>
              <p class="sale_price">₹<span>` + thousands_separators(data[1][j]['fields']['sale_price']) + `</span></p>` : `<p></p><p class="sale_price">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `</span></p>`) + `

                  <br>
                    <a href="javascript:void(0)" class="update-cart" data-product="` + data[1][j]['pk'] + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>
                    <a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + data[1][j]['pk'] + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>
              </div>
              <div class="col-8 text-right">
                  <a href="/artwork-details/` + data[1][j]['pk'] + `"><h4>` + data[1][j]['fields']['name'] + `</h4></a>
                  <h5>` + data[2][j]['fields']['first_name'] + ` ` + data[2][j]['fields']['last_name'] + `</h5>
                  <h6>` + data[1][j]['fields']['width'] + ` X ` + data[1][j]['fields']['height'] + `</h6>
                  <p class="medium">` + data[1][j]['fields']['material'] + `</p>
              </div>
          </div>
      </div>`

                            )

                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                        $('#grid-view').masonry('destroy');
                        var gird = $('#grid-view').masonry({
                            itemSelector: '.grid-item'
                        });
                        $(grid).imagesLoaded().progress(function () {
                            $(grid).masonry('layout');
                        });
                    } else {
                        for (j = 0; j < data[0].length; j++) {
                            $('#grid-view').append(
                                ` <div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
          
                    <a href="{% url 'artwork_details' a.id %}"><img src="` + window.location.origin + `/media/` + data[1][j]['fields']['image'] + `" alt=""></a>
                    <div class="row">
                        <div class="col-4 prices">
                        ` + (data[1][j]['fields']['sale_price']) ? `<p class="old_price">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `</span></p>
                        <p class="sale_price">₹<span>` + thousands_separators(data[1][j]['fields']['sale_price']) + `</span></p>` : `<p></p><p class="sale_price">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `</span></p>` + `
                            <p></p>

                            <br>
                              <a href="javascript:void(0)" class="update-cart" data-product="` + data[1][j]['pk'] + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>
                              <a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + data[1][j]['pk'] + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>
                        </div>
                        <div class="col-8 text-right">
                            <a href="{% url 'artwork_details' a.id %}"><h4>` + data[1][j]['fields']['name'] + `</h4></a>
                            <h5>` + data[2][j]['fields']['first_name'] + ` ` + data[2][j]['fields']['last_name'] + `</h5>
                            <h6>` + data[1][j]['fields']['dimensions'] + `</h6>
                            <p class="medium">` + data[1][j]['fields']['material'] + `</p>
                        </div>
                    </div>
                </div>`

                            )

                        }
                        $('#grid-view').masonry('destroy');
                        var grid = $('#grid-view').masonry({
                            itemSelector: '.grid-item'
                        });

                        $(grid).imagesLoaded().progress(function () {
                            $(grid).masonry('layout');
                        });
                        $.fn.updateCart()
                        $.fn.wishlist()
                    }

                    console.log('done')
                }
            }
        })
    })

    
    $('#search-subcategories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#grid-view-overlay').show();
        var value = $(this).find('option:selected').val();
        $.ajax({
            type: 'POST',
            url: window.location.href,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                subcategories: value,
                cat: $('#search-categories').val()
            },
            success: function (data) {
                $('#grid-view-overlay').hide();
                console.log(data)
                url = window.location.href.split("/")
                    /*for(i=0; i<data.length; i++){
            //$('#subcategories').append(`<option value=`+data[0][i]['pk']+`>`+data[0][i]['fields']['name']+`</option>`)
            //$('#subs').remove()
        
    }*/
                $('#grid-view').children().remove()
                $('#grid-viewi').children().remove()
                if (window.location.pathname === '/artists/' || window.location.pathname === '/artists/' + url[4] + '/' + url[5] + '/' || window.location.pathname === '/artists/' + url[4] + '/') {
                    if (data[0].length === 0) {
                        $('#grid-viewi').append(
                            `<h3 class="text-center text-white">There are no artists in this category.</h3>`
                        )
                    }

                    if (data.length > 1) {
                        for (j = 0; j < data[1].length; j++) {
                            $('#grid-viewi').append(
                                `<div class="col-md-4 col-sm-12 mt-3" id="single-artist">
                <a href="/artist/` + data[0][j]['fields']['username'] + `">
                <img src="` + window.location.origin + `/media/` + data[1][j]['fields']['image'] + `/" alt="">
                </a>
                <div class="row">
                    <div class="col">
                        <a href="/artists/` + data[0][j]['fields']['username'] + `"><h4>` + data[0][j]['fields']['first_name'] + ` ` + data[0][j]['fields']['last_name'] + `</h4></a>
                        <a href="/artists/` + data[0][j]['fields']['username'] + `"><p>` + data[1][j]['fields']['name'] + `</p></a>
                    </div>
                </div>
            </div>`

                            )
                        }
                    } else {
                        for (j = 0; j < data[0].length; j++) {
                            $('#grid-viewi').append(
                                ` <div class="col-md-4 col-sm-12 mt-3" id="single-artist">
                        <a href="/artist/` + data[1][j]['pk'] + `">
                        <img src="` + window.location.origin + `/media/` + data[2][0]['fields']['image'] + `/" alt="">
                        </a>
                        <div class="row">
                            <div class="col">
                            <a href="{% url 'artist_details' a.id %}"><h4>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h4></a>
                            <a href="{% url 'artist_details' a.id %}"><p>` + data[3][j]['fields']['name'] + `</p></a>
                            </div>
                           
                        </div>
                    </div>`

                            )

                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                    }
                } else {
                    if (data[0].length === 0) {
                        $('#grid-view').append(
                            `<h3 class="text-center text-white">There are no products in this category.</h3>`
                        )
                    }
                    for (j = 0; j < data[0].length; j++) {
                        $('#grid-view').append(
                            ` <div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
            
                    <a href="{% url 'artwork_details' ` + data[0][j]['fields']['slug'] + ` %}"><img src="` + window.location.origin + `/media/` + data[0][j]['fields']['image'] + `" alt=""></a>
                    <div class="row">
                        <div class="col-4 prices">
                        ` + ((data[0][j]['fields']['sale_price']) ? `<p class="old_price">₹<span>` + thousands_separators(data[0][j]['fields']['price']) + `
                        <p class="sale_price">₹` + thousands_separators(data[0][j]['fields']['sale_price']) + `</p>` : `<p></p><p class="sale_price">₹` + thousands_separators(data[0][j]['fields']['price']) + `</p>`) + `

                            <br>
                              <a href="javascript:void(0)" class="update-cart" data-product="` + data[0][j]['pk'] + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>
                              <a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + data[0][j]['pk'] + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>
                        </div>
                        <div class="col-8 text-right">
                            <a href="{% url 'artwork_details' ` + data[0][j]['fields']['slug'] + ` %}"><h4>` + data[0][j]['fields']['name'] + `</h4></a>
                            <h5>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h5>
                            <h6>` + data[0][j]['fields']['dimensions'] + `</h6>
                            <p class="medium">` + data[0][j]['fields']['material'] + `</p>
                        </div>
                    </div>
                </div>`

                        )

                    }
                    $.fn.updateCart()
                    $.fn.wishlist()
                    console.log('done')
                    $('#grid-view').masonry('destroy');
                    var grid = $('#grid-view').masonry({
                        itemSelector: '.grid-item'
                    });

                    $(grid).imagesLoaded().progress(function () {
                        $(grid).masonry('layout');
                    });
                }
            }
        })
    });

    $('#mobile-categories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#grid-view-overlay').show();
        $.ajax({
            type: 'POST',
            url: window.location.href,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                categories: value
            },
            success: function (data) {
                $('#grid-view-overlay').hide();
                url = window.location.href.split("/")
                console.log(data)
                $('#mobile-subcategories option:not(:first)').remove()

                for (i = 0; i < data[0].length; i++) {
                    $('#mobile-subcategories').append(`<option value=` + data[0][i]['pk'] + `>` + data[0][i]['fields']['name'] + `</option>`)


                }
                $("#mobile-subcategories option:selected").prop("selected", false);
                $("#mobile-subcategories option:first").prop("selected", "selected");
                $('#grid-view').children('div').remove()
                if (window.location.pathname === '/artists/' || window.location.pathname === '/artists/' + url[4] + '/' + url[5] + '/' || window.location.pathname === '/artists/' + url[4] + '/') {
                    if (data.length > 1) {
                        for (j = 0; j < data[1].length; j++) {
                            $('#grid-view').append(
                                `<div class="col-md-4 col-sm-12 mt-3" id="single-artist">
            <a href="/artist/` + data[1][j]['fields']['username'] + `">
            <img src="` + window.location.origin + `/media/` + data[2][j]['fields']['image'] + `/" alt="">
            </a>
            <div class="row">
                <div class="col">
                    <a href="/artists/` + data[1][j]['fields']['username'] + `"><h4>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h4></a>
                    <a href="/artists/` + data[1][j]['fields']['username'] + `"><p>` + data[3][j]['fields']['name'] + `</p></a>
                </div>
            </div>
        </div>`

                            )
                        }
                    } else {
                        for (j = 0; j < data[0].length; j++) {
                            $('#grid-view').append(
                                ` <div class="col-md-4 col-sm-12 mt-3" id="single-artist">
                    <a href="/artist/` + data[1][j]['fields']['username'] + `">
                    <img src="` + window.location.origin + `/media/` + data[2][0]['fields']['image'] + `/" alt="">
                    </a>
                    <div class="row">
                        <div class="col">
                        <a href="{% url 'artist_details' ` + data[1][j]['fields']['username'] + ` %}"><h4>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h4></a>
                        <a href="{% url 'artist_details' ` + data[1][j]['fields']['username'] + ` %}"><p>` + data[3][j]['fields']['name'] + `</p></a>
                        </div>
                       
                    </div>
                </div>`

                            )

                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                    }
                } else {
                    if (data.length > 1) {
                        for (j = 0; j < data[1].length; j++) {
                            if (data[1][j]['fields']['sale_price'] !== '0.00') {
                                $('#grid-view').append(
                                    `<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
              
              <a href="/artwork-details/` + data[1][j]['fields']['slug'] + `"><img src="` + window.location.origin + `/media/` + data[1][j]['fields']['image'] + `" alt=""></a>
              <div class="row">
                  <div class="col-4 prices">
                  ` + ((data[1][j]['fields']['sale_price']) ? `<p class="old_price">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `</span></p>
                  <p class="sale_price" data-price="` + data[1][j]['fields']['sale_price'] + `">₹<span>` + thousands_separators(data[1][j]['fields']['sale_price']) + `</span></p>` : `<p></p><p class="sale_price" data-price="` + data[1][j]['fields']['price'] + `">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `</span></p>`) + `

                      <br>
                        <a href="javascript:void(0)" class="update-cart" data-product="` + data[1][j]['pk'] + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>
                        <a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + data[1][j]['pk'] + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>
                  </div>
                  <div class="col-8 text-right">
                      <a href="/artwork-details/` + data[1][j]['fields']['slug'] + `"><h4>` + data[1][j]['fields']['name'] + `</h4></a>
                      <h5>` + data[2][j]['fields']['first_name'] + ` ` + data[2][j]['fields']['last_name'] + `</h5>
                      <h6>` + data[1][j]['fields']['width'] + ` X ` + data[1][j]['fields']['height'] + `</h6>
                      <p class="medium">` + data[1][j]['fields']['material'] + `</p>
                  </div>
              </div>
          </div>`

                                )
                            }

                        }
                        $('#grid-view').masonry('destroy');
                        var grid = $('#grid-view').masonry({
                            itemSelector: '.grid-item'
                        });

                        $(grid).imagesLoaded().progress(function () {
                            $(grid).masonry('layout');
                        });
                        if ($('.sort-art option:checked').val() != "" || $('.sort-art option:checked').val() != "default") {
                            if ($('.sort-art option:checked').val() == "l2h") {
                                sortProductsPriceAscending();
                            }
                            if ($('.sort-art option:checked').val() == "h2l") {
                                sortProductsPriceDescending();
                            }
                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                            /*$.fn.rmvOrder()
                            $.fn.rmvWish()*/
                    } else {
                        for (j = 0; j < data[0].length; j++) {
                            $('#grid-view').append(
                                ` <div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
          
                    <a href="/artwork-details/` + data[1][j]['fields']['slug'] + `"><img src="` + window.location.origin + `/media/` + data[1][j]['fields']['image'] + `" alt=""></a>
                    <div class="row">
                        <div class="col-4 prices">
                        ` + ((data[1][j]['fields']['sale_price']) ? `<p class="old_price">₹<span>` + thousands_separators(data[1][j]['fields']['price']) + `
                        <p class="sale_price">₹` + thousands_separators(data[1][j]['fields']['sale_price'] + `</p>`) : `<p></p><p class="sale_price">₹` + thousands_separators(data[1][j]['fields']['price']) + `</p>`) + `

                            <br>
                              <a href="javascript:void(0)" class="update-cart" data-product="` + data[1][j]['pk'] + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>
                              <a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + data[1][j]['pk'] + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>
                        </div>
                        <div class="col-8 text-right">
                            <a href="/artwork-details/` + data[1][j]['fields']['slug'] + `"><h4>` + data[1][j]['fields']['name'] + `</h4></a>
                            <h5>` + data[2][j]['fields']['first_name'] + ` ` + data[2][j]['fields']['last_name'] + `</h5>
                            <h6>` + data[1][j]['fields']['dimensions'] + `</h6>
                            <p class="medium">` + data[1][j]['fields']['material'] + `</p>
                        </div>
                    </div>
                </div>`

                            )

                        }
                        $('#grid-view').masonry('destroy');
                        var grid = $('#grid-view').masonry({
                            itemSelector: '.grid-item'
                        });

                        $(grid).imagesLoaded().progress(function () {
                            $(grid).masonry('layout');
                        });
                        if ($('.sort-art option:checked').val() != "" || $('.sort-art option:checked').val() != "default") {
                            if ($('.sort-art option:checked').val() == "l2h") {
                                sortProductsPriceAscending();
                            }
                            if ($('.sort-art option:checked').val() == "h2l") {
                                sortProductsPriceDescending();
                            }
                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                        $.fn.rmvOrder()
                        $.fn.rmvWish()
                    }
                    console.log('done')
                }
            }
        })
    })

    $('#mobile-subcategories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#grid-view-overlay').show();
        var value = $(this).find('option:selected').val();
        $.ajax({
            type: 'POST',
            url: window.location.href,
            headers: {
                'X-CSRFToken': csrftoken
            },
            data: {
                subcategories: value,
                cat: $('#mobile-categories').val()
            },
            success: function (data) {
                $('#grid-view-overlay').hide();
                url = window.location.href.split("/")
                console.log(data)
                    /*for(i=0; i<data.length; i++){
          //$('#subcategories').append(`<option value=`+data[0][i]['pk']+`>`+data[0][i]['fields']['name']+`</option>`)
          //$('#subs').remove()
      
  }*/
                $('#grid-view').children('div').remove()
                if (window.location.pathname === '/artists/' || window.location.pathname === '/artists/' + url[4] + '/' + url[5] + '/' || window.location.pathname === '/artists/' + url[4] + '/') {
                    if (data.length > 1) {
                        for (j = 0; j < data[1].length; j++) {
                            $('#grid-view').append(
                                `<div class="col-md-4 col-sm-12 mt-3" id="single-artist">
              <a href="/artist/` + data[0][j]['fields']['username'] + `">
              <img src="` + window.location.origin + `/media/` + data[1][j]['fields']['image'] + `/" alt="">
              </a>
              <div class="row">
                  <div class="col">
                      <a href="/artists/` + data[0][j]['fields']['username'] + `"><h4>` + data[0][j]['fields']['first_name'] + ` ` + data[0][j]['fields']['last_name'] + `</h4></a>
                      <a href="/artists/` + data[0][j]['fields']['username'] + `"><p>` + data[1][j]['fields']['name'] + `</p></a>
                  </div>
              </div>
          </div>`

                            )
                        }
                    } else {
                        for (j = 0; j < data[0].length; j++) {
                            $('#grid-view').append(
                                ` <div class="col-md-4 col-sm-12 mt-3" id="single-artist">
                      <a href="/artist/` + data[1][j]['fields']['username'] + `">
                      <img src="` + window.location.origin + `/media/` + data[2][0]['fields']['image'] + `/" alt="">
                      </a>
                      <div class="row">
                          <div class="col">
                          <a href="{% url 'artist_details' ` + data[1][j]['fields']['username'] + ` %}"><h4>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h4></a>
                          <a href="{% url 'artist_details' ` + data[1][j]['fields']['username'] + ` %}"><p>` + data[3][j]['fields']['name'] + `</p></a>
                          </div>
                         
                      </div>
                  </div>`

                            )

                        }
                        $.fn.updateCart()
                        $.fn.wishlist()
                    }
                } else {
                    for (j = 0; j < data[0].length; j++) {
                        if (data[1][j]['fields']['sale_price'] !== '0.00') {
                            $('#grid-view').append(
                                `<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
              
              <a href="/artwork-details/` + data[0][j]['fields']['slug'] + `"><img src="` + window.location.origin + `/media/` + data[0][j]['fields']['image'] + `" alt=""></a>
              <div class="row">
                  <div class="col-4 prices">
                  ` + ((data[0][j]['fields']['sale_price']) ? `<p class="old_price">₹<span>` + thousands_separators(data[0][j]['fields']['price']) + `</span></p>
                  <p class="sale_price" data-price="` + data[0][j]['fields']['sale_price'] + `">₹<span>` + thousands_separators(data[0][j]['fields']['sale_price']) + `</span></p>` : `<p></p><p class="sale_price" data-price="` + data[0][j]['fields']['price'] + `">₹<span>` + thousands_separators(data[0][j]['fields']['price']) + `</span></p>`) + `

                      <br>
                        <a href="javascript:void(0)" class="update-cart" data-product="` + data[1][j]['pk'] + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>
                        <a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + data[1][j]['pk'] + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>
                  </div>
                  <div class="col-8 text-right">
                      <a href="/artwork-details/` + data[0][j]['fields']['slug'] + `"><h4>` + data[0][j]['fields']['name'] + `</h4></a>
                      <h5>` + data[1][j]['fields']['first_name'] + ` ` + data[1][j]['fields']['last_name'] + `</h5>
                      <h6>` + data[0][j]['fields']['width'] + ` X ` + data[0][j]['fields']['height'] + `</h6>
                      <p class="medium">` + data[0][j]['fields']['material'] + `</p>
                  </div>
              </div>
          </div>`

                            )
                        }
                    }
                    $('#grid-view').masonry('destroy');
                    var grid = $('#grid-view').masonry({
                        itemSelector: '.grid-item'
                    });

                    $(grid).imagesLoaded().progress(function () {
                        $(grid).masonry('layout');
                    });
                    if ($('.sort-art option:checked').val() != "" || $('.sort-art option:checked').val() != "default") {
                        if ($('.sort-art option:checked').val() == "l2h") {
                            sortProductsPriceAscending();
                        }
                        if ($('.sort-art option:checked').val() == "h2l") {
                            sortProductsPriceDescending();
                        }
                    }
                    $.fn.updateCart()
                    $.fn.wishlist()
                    $.fn.rmvOrder()
                    $.fn.rmvWish()
                    console.log('done')
                }
            }
        })
    });



    var addBtns = document.getElementsByClassName('add-cart')

    for (i = 0; i < addBtns.length; i++) {
        addBtns[i].addEventListener('click', function () {
            var productId = this.dataset.product
            var wishId = this.dataset.wish
            var action = this.dataset.action
            var parent = $(this)
            var image = $(parent).parent().siblings().find('img').attr('src')
            var names = $(parent).parent().siblings().find('.art-name').text()
            console.log('product Id:', productId)

            addWish(productId, wishId, parent, names, image, action)
        })
    }

    function addWish(productId, wishId, parent, names, image, action) {
        if (user === "AnonymousUser") {
            if (cart[productId] == undefined) {
                $('.shp__cart__wrap').append(`
            
                <div class="shp__single__product">
                        <div class="shp__pro__thumb">
                            <a href="javascript:void(0)">
                                <img src="` + window.location.origin + image + `" alt="product images">
                            </a>
                        </div>
                        <div class="shp__pro__details">
                            <h2><a href="product-details.html">` + names + `</a></h2>
                            <span class="shp__price">` + currencySign + `<span>` + $(parent).parent().parent().find('.total span:last').text() + `</span></span>
                        </div>
                        <div class="remove__btn">
                            <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                        </div>
                    </div>
      
                    `)

                if ($('.empty-cart-text').length > 0) {
                    $(`
                    <ul class="shoping__total">
                        <li class="subtotal">Subtotal:</li>
                        <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $(parent).parent().parent().find('.total span:last').text() + `</span></li>
                    </ul>
                    <ul class="shopping__btn" id="shp__btn">
                    <li><a href="/cart/">View Cart</a></li>
                    <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
                </ul>`).insertAfter($('.shp__cart__wrap'))
                    $('.empty-cart-text').remove()
                } else {
                    $('.total__price span').text(thousands_separators(parseFloat($(parent).parent().parent().find('.total span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span').text().replace(/,/g, ''))))
                }

                $(parent).parent().parent().remove()
                $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                if ($('tbody tr').length < 1) {
                    $('.wishlist-table').remove();
                    $('.wishlist-content').append(`<p class="text-center"><strong>There's no item in your wishlist.</strong></p>`)
                }
                $('.wish__single__product').each(function (index) {
                    if ($('.wish__pro__details h2 a').eq(index).html() == $(parent).parent().siblings().find('.art-name').text()) {
                        $('.wish__single__product').eq(index).remove();
                        if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                            $('.wish__btn').remove();
                            $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                        }
                        $('.wish-count').html(parseFloat($('.wish-count').html()) - 1);
                    }

                    console.log('done')
                })
                $.fn.updateCart();
                $.fn.rmvorder();
                $.fn.rmvwish();
                cart[productId] = {
                    'quantity': 1
                }
                document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
                delete wishlist[productId]
                document.cookie = 'wishlist=' + JSON.stringify(wishlist) + ";domain=;path=/"
            }
        } else {
            $(parent).hide();
            $(parent).parent().find('.loader1').show();
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: {
                    productId: productId,
                    wishId: wishId,
                    action: action
                },
                success: function (data) {
                    console.log(data)
                    $(parent).parent().find('.loader').hide();
                    $('#items-count').html(data)
                    $('.shp__cart__wrap').append(`
          
          <div class="shp__single__product">
                  <div class="shp__pro__thumb">
                      <a href="javascript:void(0)">
                          <img src="` + window.location.origin + `/media/` + data[1][0]['fields']['image'] + `/" alt="product images">
                      </a>
                  </div>
                  <div class="shp__pro__details">
                      <h2><a href="product-details.html">` + data[1][0]['fields']['name'] + `</a></h2>
                      <span class="shp__price">` + currencySign + `<span>` + $(parent).parent().parent().find('.total span:last').text() + `</span></span>
                  </div>
                  <div class="remove__btn">
                      <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                  </div>
              </div>

              `)
                    if ($('.empty-cart-text').length > 0) {
                        $(`
              <ul class="shoping__total">
                  <li class="subtotal">Subtotal:</li>
                  <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $(parent).parent().parent().find('.total span:last').text() + `</span></li>
              </ul>
              <ul class="shopping__btn" id="shp__btn">
              <li><a href="/cart/">View Cart</a></li>
              <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
          </ul>`).insertAfter($('.shp__cart__wrap'))
                        $('.empty-cart-text').remove()
                    } else {
                        $('.total__price span').text(thousands_separators(parseFloat($(parent).parent().parent().find('.total span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span').text().replace(/,/g, ''))))
                    }

                    $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                    $.fn.updateCart();
                    $.fn.rmvorder();
                    $.fn.rmvwish();

                    $(parent).parent().parent().remove()
                    if ($('tbody tr').length < 1) {
                        $('.wishlist-table').remove();
                        $('.wishlist-content').append(`<p class="text-center"><strong>There's no item in your wishlist.</strong></p>`)
                    }
                    $('.wish__single__product').each(function (index) {
                        if ($('.wish__pro__details h2 a').eq(index).html() == $(parent).parent().siblings().find('a h4').text()) {
                            $('.wish__single__product').eq(index).remove();
                            if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                                $('.wish__btn').remove();
                                $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                            }
                            $('.wish-count').html(parseFloat($('.wish-count').html()) - 1);
                        }

                        console.log('done')
                    })
                }
            })
        }
    }
    $('#save').on('click', function () {
        $('#note').text($('#notes').val())
        $('#note2').text($('#notes').val())
    });

    /*$('.note-head').click(function(){
        $('.modal').modal('toggle')
    });*/

    



    
    

    var current = new Date();
    day = current.getDate()
    if (start_day > day) {
        setInterval(function () {
            startTimer();
        }, 1000);
    } else {
        $('#time-head').text('Time to End')
        setInterval(function () {
            endTimer();
        }, 1000);
    }

    function endTimer() {
        var endTime = new Date(end_date * 1000);
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var edays = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (edays * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (edays * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (edays * 86400) - (hours * 3600) - (minutes * 60)));

        if (edays < "10") {
            edays = "0" + edays;
        }
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#days h4").html(edays);
        $("#time h f").html(hours.toString()[0]);
        $("#time h p").html(hours.toString()[1]);
        $("#time m f").html(minutes.toString()[0]);
        $("#time m p").html(minutes.toString()[1]);
        $("#time secs f").html(seconds.toString()[0]);
        $("#time secs p").html(seconds.toString()[1]);

    }

    function startTimer() {
        var startTime = new Date(start_date * 1000);
        startTime = (Date.parse(startTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = startTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (days < "10") {
            days = "0" + days;
        }
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }

        $("#days h4").html(days);
        $("#time h f").html(hours.toString()[0]);
        $("#time h p").html(hours.toString()[1]);
        $("#time m f").html(minutes.toString()[0]);
        $("#time m p").html(minutes.toString()[1]);
        $("#time secs f").html(seconds.toString()[0]);
        $("#time secs p").html(seconds.toString()[1]);

    }


    

    function showProducts(minPrice, maxPrice) {
        $("#grid-view .grid-item").hide().filter(function () {
            var price = parseInt($(this).children('.prices .sale_price').data("price"), 10);
            return price >= minPrice && price <= maxPrice;
        }).show();
    }
    // Requires jQuery

    // Initialize slider:


    

    $('#myCarousel').carousel({
        interval: 4000
    })
    $('.carousel .item').each(function () {
        var next = $(this).next();
        if (!next.length) {
            next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));
        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
        } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    });

    
   
    $(".image-preview").on('click', '.close-per', function (e) {
        console.log('click')
        $("#personalize-file").val("");
        $('.image-preview').html("")
    })
    $('#art-menu').hide()
    $('#art-menu').css('background-color', '#bd8c54')
    $('.subcat').css('background-color', '#a77a47')
    $('#art').on('click', function () {
        $(this).children('.arrow').css({
            'transform': 'rotate(0deg)'
        })
        $(this).children('.arrow').css({
            'transform': 'rotate(90deg)'
        });

        $('#art-menu').toggle();

    });
    $('#artist-menu').hide()
    $('#artist-menu').css('background-color', '#bd8c54')
    $('#artist').on('click', function () {
        $('#artist-menu').toggle();
        $(this).children().find('.iconify').css({
            'transform': 'rotate(0deg)'
        })
        $(this).children().find('.iconify').css({
            'transform': 'rotate(-90deg)'
        });

    });
    $('#auctions-menu').hide()
    $('#auctions').on('click', function () {
        $('#auctions-menu').toggle()
    });
    

    /*function defer(method) {
        if (window.jQuery)
            method();
        else
            setTimeout(function () {
                defer(method)
            }, 50);
    }
    defer(function () {
        (function ($) {

            function doneResizing() {
                var totalScroll = $('.resource-slider-frame').scrollLeft();
                var itemWidth = $('.resource-slider-item').width();
                var difference = totalScroll % itemWidth;
                if (difference !== 0) {
                    $('.resource-slider-frame').animate({
                        scrollLeft: '-=' + difference
                    }, 500, function () {
                        // check arrows
                        checkArrows();
                    });
                }
            }

            function checkArrows() {
                var totalWidth = $('#resource-slider .resource-slider-item').length * $('.resource-slider-item').width();
                var frameWidth = $('.resource-slider-frame').width();
                var itemWidth = $('.resource-slider-item').width();
                var totalScroll = $('.resource-slider-frame').scrollLeft();

                if (((totalWidth - frameWidth) - totalScroll) < itemWidth) {
                    $(".next").css("visibility", "hidden");
                } else {
                    $(".next").css("visibility", "visible");
                }
                if (totalScroll < itemWidth) {
                    $(".prev").css("visibility", "hidden");
                } else {
                    $(".prev").css("visibility", "visible");
                }
            }

            $(window).on('load', function () {
                var $this = $(this),
                    width = $('.resource-slider-item').width(),
                    speed = 500;
                if ($this.hasClass('prev')) {
                    $('.resource-slider-frame').animate({
                        scrollLeft: '-=' + width
                    }, speed, function () {
                        // check arrows
                        checkArrows();
                    });
                } else if ($this.hasClass('next')) {
                    $('.resource-slider-frame').animate({
                        scrollLeft: '+=' + width
                    }, speed, function () {
                        // check arrows
                        checkArrows();
                    });
                }
            })
            $('.arrow').on('click', function () {
                var $this = $(this),
                    width = $('.resource-slider-item').width(),
                    speed = 500;
                if ($this.hasClass('prev')) {
                    $('.resource-slider-frame').animate({
                        scrollLeft: '-=' + width
                    }, speed, function () {
                        // check arrows
                        checkArrows();
                    });
                } else if ($this.hasClass('next')) {
                    $('.resource-slider-frame').animate({
                        scrollLeft: '+=' + width
                    }, speed, function () {
                        // check arrows
                        checkArrows();
                    });
                }
            }); // end on arrow click

            $(window).on("load resize", function () {
                checkArrows();
                $('#resource-slider .resource-slider-item').each(function (i) {
                    var $this = $(this),
                        left = $this.width() * i;
                    $this.css({
                        left: left
                    })
                }); // end each
            }); // end window resize/load

            var resizeId;
            $(window).resize(function () {
                clearTimeout(resizeId);
                resizeId = setTimeout(doneResizing, 500);
            });

        })(jQuery); // end function
    });*/




    



    

    var endTime = new Date(end_date * 1000);
    endTime = (Date.parse(endTime) / 1000);

    var now = new Date();
    now = (Date.parse(now) / 1000);

    if (now > endTime) {
        $('#auction-time').hide();
        $('#time-head').text('Auction ended');
        $('#auction-actions').hide();
    }

    $('.toggle-menu').click(function () {
        $('.exo-menu').toggleClass('display');

    });

    $('.flyout-right').each(function () {
            if ($(this).find('ul li').length == 0) {
                $(this).find('ul').css({
                    'border': 0
                })
            }
        })


    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $('#img').on('click', function () {
        $('#profile-pic').click();
    });

    $('#profile-pic').on('change', function () {
        var img = $(this).prop('files')[0]
        $('#img').attr('src', window.URL.createObjectURL(img))
    });

    $('.img img').each(function (index) {

        $(this).on('click', function () {
            $('.art').eq(index).click();
        });
    });

    $('.art').each(function (index) {
        $(this).on('change', function () {
            var img = $(this).prop('files')[0]
            $('.img img').eq(index).attr('src', window.URL.createObjectURL(img))
        });
    });

    $(".next").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'position': 'absolute'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".previous").click(function () {
        if (animating) return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    });

    $(".submit").click(function () {
        return false;
    })




    $('.subcat').hide();
    $('.art-menu .menu').each(function (index) {
        $('.art-menu .menu').eq(index).on('click', function () {
            $('.subcat').eq(index).toggle()
        })

    });


    

    var section = $('li');

    function toggleAccordion() {
        section.removeClass('active');
        $(this).addClass('active');
    }

    section.on('click', toggleAccordion);
    


    /*$('#msg').keydown(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var msg = $('#msg').val()
            $('#text-msg').append(`
      <div class="col-12 text-right" id="reciever">
              <p>` + $('#msg').val() + `</p>
          </div>
      `)
            $('#text-msg').animate({
                scrollTop: $('#text-msg').get(0).scrollHeight
            }, 500);
            $('#msg').val('')
            $.ajax({
                type: 'POST',
                url: window.location.href,
                headers: {
                    'X-CSRFToken': csrftoken
                },
                data: {
                    msg: msg
                },
                success: function (data) {
                    $('#msg').val('')
                    $('#text-msg').append(`
      <div class="col-12" id="sender">
              <p>` + data + `</p>
          </div>
      `)
                    $('#text-msg').animate({
                        scrollTop: $('#text-msg').get(0).scrollHeight
                    }, 500);
                }
            });
        }
    });*/



    /*$('#subscribe').on('click', function(e){
      e.preventDefault();
      e.stopImmediatePropagation();
      $('#subscribe').html(`Subscribed!!!`)
      $('#subscribe').css('pointer-events', 'none')
      $.ajax({
        type: 'POST',
        url: window.location.href,
        headers:{
          'X-CSRFToken':csrftoken
        },
        data:{newsletter: $('#newsletter').val(), action: 'newsletter'},
        sucess:function(data){
          console.log(data)
          //$('#subscribe').find('.loader1').hide()
          //$('#subscribe').children("div").remove()
        }
      })
    });*/
    
    

    var show_checkbox = $('.parent')
    for (var i = 0; i < show_checkbox.length; i++) {

        show_checkbox[i].addEventListener('change', function () {
            var id = this.dataset.id
            if ($(this).find('input:checked').val() == id) {
                $(this).find(".children").slideDown("fast");
            } else {
                $(this).find(".children").slideUp("fast");
            }


        })
    }

    let mouseMoved = false;
    const button = document.querySelector('.infoButton');

    const mouseMoveHandler = event => {
        
        document.onmousemove = null;
        button.classList.remove('infoButton_isActive');
    };

    const toggleHandler = event => {
        const classes = button.classList;
        if (classes.contains('infoButton_isActive')) {
            classes.remove('infoButton_isActive');
        } else {
            classes.add('infoButton_isActive');
        }
    }

    document.onmousemove = mouseMoveHandler;

    /*const loop = setInterval(toggleHandler, 1000);
  document.querySelector('video').defaultPlaybackRate = 1.0;
  document.querySelector('video').playbackRate = 0.5;*/



    $('.img-sl .desc-overlay').css({
        'width': $('.img-sl img').css('width'),
        'height': $('.img-sl img').css('height')
    })
});

$('.img-sl .desc-overlay').mouseover(function () {
    $('.img-sl .desc-overlay').css('opacity', 0.8)
});
$('.img-sl .desc-overlay').mouseout(function () {
    $('.img-sl .desc-overlay').css('opacity', 0)
});



$(window).on('load', function () {
    $('.preloader').fadeOut(2000)

});