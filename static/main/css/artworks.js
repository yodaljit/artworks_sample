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
  
  const csrftoken = getToken('csrftoken')
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

function thousands_separators(num) {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
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
      .each(function() { // iterate over nodes
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
  $('.sale_price').each(function(index) {
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
  $('.shp__price').each(function(index) {
    shp_price.push($('.non_change_shp_price span').eq(index).text())
})
  
  function calculate(currency, currencySign) {
      const from_currency = 'INR';
      const to_currency = currency;

      fetch(`https://api.exchangerate-api.com/v4/latest/${from_currency}`)
          .then(res => res.json())
          .then(res => {
              const rate = res.rates[to_currency];

              

              

              $('.wish__price span').each(function(){
                wish_price.push($(this).text())
              })


              url = window.location.href.split("/")
              if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + url[4] + '/') {
                var alterPrice = []
                      $('.non_change_price span').each(function(){
                        alterPrice.push($(this).text())
                      })

                  for (var i = 0; i < nPrice.length; i++) {
                    
                      console.log(alterPrice)
                      $('.new__price span').eq(i).text(thousands_separators((parseFloat($(alterPrice)[i]) * rate).toFixed(2)))

                      $('.new__price')
                          .contents() // get all child nodes including text and comment nodes
                          .each(function() { // iterate over nodes
                              if (this.nodeType == 3) // check node is text node
                                  $(this).replaceWith(currencySign) // update the content and replace node with html content
                          });
                  }
              }

              $('.sale_price').each(function(i)  {
                  $('.sale_price span').eq(i).html(thousands_separators((parseFloat($(initialSalePrice)[i].replace(/,/g, '')) * rate).toFixed(2)));
                  $('.sale_price')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
              })

              for (var i = 0; i < oldPrice.length; i++) {
                  $('.old_price span').eq(i).text(thousands_separators((parseFloat($(initialOldPrice)[i].replace(/,/g, '')) * rate).toFixed(2)));
                  $('.old_price')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
              }
              console.log(rate)
              $('.non_change_shp_price span').each(function(i){
                  console.log($('.non_change_shp_price span').text())
                $('.shp__price span').eq(i).text((parseFloat($('.non_change_shp_price span').eq(i).text().replace(/,/g, '')) * rate).toFixed(2))
                console.log($('.shp__price span').eq(i).text())
            
                  $('.shp__price')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      })
                    
              })
            
          
                  /*$('.total__price span').text(thousands_separators((parseFloat(($total_price).replace(/,/g, '')) / rate).toFixed(2)));
                  $total_final_price = $('.total__price span').text()
                  console.log($total_final_price)*/
                  $total_price = 0
                  $('.shp__price span').each(function(i){
                      $total_price += parseFloat($('.non_change_shp_price span').eq(i).text().replace(/,/g, ''))
                    })
                    console.log($total_price)
                  $('.total__price span').text(thousands_separators((($total_price)*rate).toFixed(2)))
                  console.log($('.total__price span').text())
                  $('.total__price')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
                    

              for (var i = 0; i < wish_price.length; i++) {
                  $('.wish__price span').eq(i).text(thousands_separators((parseFloat($(wish_price)[i].replace(/,/g, '')) * rate).toFixed(2)));
                  $('.wish__price')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
              }

              if (window.location.pathname === '/cart/') {
                  var totaltaxes = 0
                  var total = 0
                  var totalpr = 0

                  $('.amount').each(function(index) {
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
                          .each(function() { // iterate over nodes
                              if (this.nodeType == 3) // check node is text node
                                  $(this).replaceWith(currencySign) // update the content and replace node with html content
                          });
                  });
                  $('#amount span').html(thousands_separators((parseFloat(total) * rate).toFixed(2)))
                  //$('#discount span').html(thousands_separators((parseFloat($('#discount span').html()) * rate).toFixed(2)))
                  $('.amount1 span').each(function(index) {

                      $(this).html(thousands_separators((parseFloat($(taxes)[index].replace(/,/g, '')) * rate).toFixed(2)))
                      console.log(this)
                  })
                  $('.tax span').each(function(index) {
                      $(this).html(thousands_separators((parseFloat(totaltaxes) * rate).toFixed(2)))
                  })
                  $('#amount1 span').html(thousands_separators((parseFloat(totalpr) * rate).toFixed(2)))
                  $('#amount2 span').html(thousands_separators((parseFloat(total) * rate).toFixed(2)))
                  $('#amount')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
                  $('#amount1')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
                  $('#amount2')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
                  $('#discount')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });

                  $('.amount1')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
                  $('.tax')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });
              }

              if (window.location.pathname === '/confirm-order/' || window.location.pathname === '/thank-you/') {
                  var totali = 0

                  initialOldPrice.push($('#amount span').html().replace(/,/g, ''))
                  console.log(initialOldPrice)
                  $('#ctax span').each(function(index) {
                      taxes.push($(this).html().replace(/,/g, ''))
                      $(this).html(thousands_separators((parseFloat(taxes[index]) * rate).toFixed(2)))
                  })
                  $('.amount span').each(function(index) {
                      initialSalePrice.push($(this).html())
                      totali = parseFloat(totali) + (parseFloat($(initialSalePrice)[index].replace(/,/g, '')))

                      console.log(initialSalePrice)
                      console.log(taxes)
                      $(this).text(thousands_separators((parseFloat($(initialSalePrice)[index].replace(/,/g, '')) * rate).toFixed(2)));
                      $('.amount')
                          .contents() // get all child nodes including text and comment nodes
                          .each(function() { // iterate over nodes
                              if (this.nodeType == 3) // check node is text node
                                  $(this).replaceWith(currencySign) // update the content and replace node with html content
                          });
                  });
                  $('#amount span').html(thousands_separators((parseFloat($(initialOldPrice)[0]) * rate).toFixed(2)))

                  $('#amount')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
                          if (this.nodeType == 3) // check node is text node
                              $(this).replaceWith(currencySign) // update the content and replace node with html content
                      });

                  $('#ctax')
                      .contents() // get all child nodes including text and comment nodes
                      .each(function() { // iterate over nodes
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
      curren[i].addEventListener('click', function(e) {
          clearInterval(timer);
          e.preventDefault();

          var currency = this.dataset.curr
          var currencySign = this.dataset.sign
          $('.currency-selector p').text(currency)
          document.cookie = 'currency=' + JSON.stringify(currency) + ";domain=;path=/"
          document.cookie = 'currencySign=' + JSON.stringify(currencySign) + ";domain=;path=/"

          timer = setInterval(function() {
              calculate(currency, currencySign);
          }, 1000)
      });
  }


$.fn.updateCart = function() {
      var updateBtns = document.getElementsByClassName('update-cart')

      for (i = 0; i < updateBtns.length; i++) {
          updateBtns[i].addEventListener('click', function(e) {
              e.preventDefault();
              e.stopImmediatePropagation();
              var productId = this.dataset.product
              var action = this.dataset.action
              var parent = $(this)

              console.log('product Id:', productId)



              if (user === "AnonymousUser") {
                  console.log('Anonymous user')
                  if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                      names = $('#solo-art').text()
                      price = $('.non_change_price span:last').text()
                      image = $('.bg-art').eq(0).attr('src')
                      console.log(names)
                      console.log(price)
                  } else {
                      names = $(parent).parent().siblings().find('a').find('h4').text()
                      price = $(parent).parent().find('.sale_price span:last').text()
                      image = $(parent).parent().parent().parent().find('img').attr('src')
                  }
                  if (parent.hasClass('art-more')) {
                      addMoreCookieCart(productId, action, names, price, image, parent)
                  }
                  addCookieCart(productId, action, names, price, image, parent)
              } else {
                  if (parent.hasClass('art-more')) {
                      addMoreCart(productId, action, parent)
                  } else {
                      updateCart(productId, action, parent)
                  }
              }
          })
      }
  }
  $.fn.updateCart();


  $('.loader1').hide();
  $('.loader2').hide();

  function updateCart(productId, action, parent) {
      if (action === 'add') {
          if (window.location.pathname === '/personalize-details/' + productId + '/') {
              if (navigator.userAgent.match(/Android/i) ||
                  navigator.userAgent.match(/webOS/i) ||
                  navigator.userAgent.match(/iPhone/i) ||
                  navigator.userAgent.match(/iPad/i) ||
                  navigator.userAgent.match(/iPod/i) ||
                  navigator.userAgent.match(/BlackBerry/i) ||
                  navigator.userAgent.match(/Windows Phone/i)) {
                  console.log('mobile')
                  let allAreFilled = true;
                  document.getElementById("mform").querySelectorAll("[required]").forEach(function(i) {
                      if (!allAreFilled) return;
                      if (!i.value) allAreFilled = false;
                      if (i.type === "radio") {
                          let radioValueCheck = false;
                          document.getElementById("mform").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
                              if (r.checked) radioValueCheck = true;
                          })
                          allAreFilled = radioValueCheck;
                      }
                  })
                  if (!allAreFilled || $('#mpersonalize-file').prop('files')[0] == undefined) {
                      alert('Fill all the fields');
                  }
              if (allAreFilled && $('#personalize-file').val() == "") {
                    alert('Upload your desired photo of which you want a custom portrait');
                }
                  console.log($('#mpersonalize-file').prop('files')[0])
                  if (allAreFilled && $('#mpersonalize-file').prop('files')[0] != undefined) {
                      var fd = new FormData();
                      fd.append('productId', productId);
                      fd.append('action', action);
                      fd.append('price', $('.non_change_price span:last').html())
                      fd.append('size', $("input[name=size2]:checked").val());

                      fd.append('faces', $("input[name=faces2]:checked").val());
                      fd.append('note', $('#note2').val());
                      fd.append('photo', $('#mpersonalize-file').prop('files')[0]);


                      $.ajax({
                          type: 'POST',
                          url: window.location.href,
                          headers: {
                              'X-CSRFToken': csrftoken
                          },
                          data: fd,
                          processData: false,
                          contentType: false,

                          success: function(data) {
                              console.log(data)
                              $(`<button onclick='window.location.href="/cart/"' class="added">Added to Cart</button>`).insertBefore($(parent))
                              $(parent).remove()
                              $('.shp__cart__wrap').append(`
        
            <div class="shp__single__product">
                    <div class="shp__pro__thumb">
                        <a href="javascript:void(0)">
                            <img src="` + window.location.origin + `/media/` + data[1]['fields']['image'] + `" alt="product images">
                        </a>
                    </div>
                    <div class="shp__pro__details">
                        <h2><a href="product-details.html">` + data[1]['fields']['name'] + `</a></h2>
                        <span class="shp__price">₹<span>` + data[1]['fields']['price'] + `</span></span>
                    </div>
                    <div class="remove__btn">
                        <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                    </div>
                </div>

                `)

                              $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                              if ($('.empty-cart-text').length > 0) {
                                  $(`
                <ul class="shoping__total">
                    <li class="subtotal">Subtotal:</li>
                    <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + data[1]['fields']['price'] + `</span></li>
                </ul>
                <ul class="shopping__btn" id="shp__btn">
                <li><a href="/cart/">View Cart</a></li>
                <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
            </ul>`).insertAfter($('.shp__cart__wrap'))
                                  $('.empty-cart-text').remove()
                              } else {
                                  $('.total__price span:last').text(thousands_separators(parseFloat($('#solo-price span').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                                  console.log($(parent).parent().parent())
                              }

                              $.fn.rmvorder();
                              $.fn.rmvwish();
                              console.log(data)
                          }
                      })
                  }
              } else {

                  console.log('desktop')
                  let allAreFilled = true;
                  document.getElementById("form").querySelectorAll("[required]").forEach(function(i) {
                      if (!allAreFilled) return;
                      if (!i.value) allAreFilled = false;
                      if (i.type === "radio") {
                          let radioValueCheck = false;
                          document.getElementById("form").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
                              if (r.checked) radioValueCheck = true;
                          })
                          allAreFilled = radioValueCheck;
                      }

                  })
                  if (!allAreFilled && $('#personalize-file').val() == "") {
                      alert('Select all the required fields and Upload your desired photo of which you want a custom portrait');
                  }
              if (allAreFilled && $('#personalize-file').val() == "") {
                    alert('Upload your desired photo of which you want a custom portrait');
                }
                  console.log($('#personalize-file').prop('files')[0])
                  if (allAreFilled && $('#personalize-file').val() != "") {
                      var fd = new FormData();
                      fd.append('productId', productId);
                      fd.append('action', action);
                      fd.append('price', $('.non_change_price span:last').text().replace(/,/g, '').split(".")[0])
                      fd.append('size', $("input[name=size]:checked").val());
                      fd.append('faces', $("input[name=faces]:checked").val());
                      fd.append('note', $('#note').val());
                      fd.append('photo', $('#personalize-file').prop('files')[0]);
                      if (window.location.pathname === '/personalize-details/' + productId + '/') {
                          console.log('rotate')
                          $('#add-img').toggleClass('rotate')
                      }
                      $.ajax({
                          type: 'POST',
                          url: window.location.href,
                          headers: {
                              'X-CSRFToken': csrftoken
                          },
                          data: fd,
                          processData: false,
                          contentType: false,

                          success: function(data) {
                              console.log(data)
                              $(`<div data-tooltip="Added to Cart">
              <a href="/cart/"><img src="` + window.location.origin + `/static/main/images/added.svg" alt="" width="100%" height="100%" style='cursor:pointer'></a>
              </div>
              `).insertBefore($(parent).parent())
                              $(parent).parent().remove()
                              $('.shp__cart__wrap').append(`
          
              <div class="shp__single__product">
                      <div class="shp__pro__thumb">
                          <a href="javascript:void(0)">
                              <img src="` + window.location.origin + `/media/` + data[1]['fields']['image'] + `" alt="product images">
                          </a>
                      </div>
                      <div class="shp__pro__details">
                          <h2><a href="product-details.html">` + data[1]['fields']['name'] + `</a></h2>
                          <span class="shp__price">₹<span>` + $('.new__price span:last').text() + `</span></span>
                      </div>
                      <div class="remove__btn">
                          <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                      </div>
                  </div>

                  `)

                              $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                              if ($('.empty-cart-text').length > 0) {
                                  $(`
                  <ul class="shoping__total">
                      <li class="subtotal">Subtotal:</li>
                      <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $('.new__price span:last').text() + `</span></li>
                  </ul>
                  <ul class="shopping__btn" id="shp__btn">
                  <li><a href="/cart/">View Cart</a></li>
                  <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
              </ul>`).insertAfter($('.shp__cart__wrap'))
                                  $('.empty-cart-text').remove()
                              } else {
                                  $('.total__price span:last').text(thousands_separators(parseFloat($('.new__price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                                  console.log($(parent).parent().parent())
                              }
                              $.fn.updateCart();
                              $.fn.rmvorder();
                              $.fn.rmvwish();
                              console.log(data)
                          }
                      })
                  }
              }
          } else {
              url = window.location.href.split("/")
              console.log(url)

              if (window.location.pathname === '/artwork-details/' + url[4] + '/') {
                  console.log('rotate')
                  $('#add-img').toggleClass('rotate')
              } else {
                  $(parent).hide();
                  $(parent).parent().find('.loader1').show();
              }
              $.ajax({

                  type: 'POST',
                  url: window.location.href,
                  headers: {
                      'X-CSRFToken': csrftoken
                  },
                  data: {
                      productId: productId,
                      action: action
                  },
                  success: function(data) {
                      console.log(data)


                      $(parent).parent().find('.loader1').hide();

                      console.log(window.location.pathname)
                      if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                          $('#add-img').toggleClass('rotate')
                          console.log('enterd')
                          $('.shp__cart__wrap').append(`
          
              <div class="shp__single__product">
                      <div class="shp__pro__thumb">
                          <a href="javascript:void(0)">
                              <img src="` + $('.bg-art').attr('src') + `" alt="product images">
                          </a>
                      </div>
                      <div class="shp__pro__details">
                          <h2><a href="product-details.html">` + $('#solo-art').text() + `</a></h2>
                          <span class="shp__price">₹<span>` + $('.new__price span:last').text() + `</span></span>
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
                      <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $('.new__price span:last').text() + `</span></li>
                  </ul>
                  <ul class="shopping__btn" id="shp__btn">
                  <li><a href="/cart/">View Cart</a></li>
                  <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
              </ul>`).insertAfter($('.shp__cart__wrap'))
                              $('.empty-cart-text').remove()
                          } else {
                              $('.total__price span').text(thousands_separators(parseFloat($('.new__price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span').text().replace(/,/g, ''))))
                              console.log($(parent).parent().parent())
                              calculate(currency, currencySign)
                          }
                          console.log($(parent).parent().parent())
                          if (navigator.userAgent.match(/Android/i) ||
                              navigator.userAgent.match(/webOS/i) ||
                              navigator.userAgent.match(/iPhone/i) ||
                              navigator.userAgent.match(/iPad/i) ||
                              navigator.userAgent.match(/iPod/i) ||
                              navigator.userAgent.match(/BlackBerry/i) ||
                              navigator.userAgent.match(/Windows Phone/i)) {
                              $(`<button onclick='window.location.href="/cart/"' class="added">Added to Cart</button>`).insertBefore($(parent))
                              $(parent).remove();
                          } else {
                              $(`<div data-tooltip="Added to Cart">
              <img src="` + window.location.origin + `/static/main/images/added.svg" class="update-cart" data-product="` + productId + `" data-action="remove" id="add-img" alt="" width="100%" height="100%">
              </div>
              `).insertBefore($(parent).parent())
                              $(parent).parent().remove();
                          }


                          $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                          $.fn.updateCart();
                          $.fn.rmvorder();
                          $.fn.rmvwish();

                      }
                      if (window.location.pathname == '/artworks/' || window.location.pathname == "/" || window.location.pathname == "/search-results/" || window.location.pathname === '/artworks/' + url[4] + '/' + url[5] + '/' || window.location.pathname === '/artworks/' + url[4] + '/' || window.location.pathname == '/' || window.location.pathname === '/artist/' + url[4] + '/') {
                          if (window.pathname === '/artist/' + url[4] + '/') {
                              $('.shp__cart__wrap').append(`
          
          <div class="shp__single__product">
                  <div class="shp__pro__thumb">
                      <a href="javascript:void(0)">
                          <img src="` + window.location.origin + `/media/` + data[1]['fields']['image'] + `" alt="product images">
                      </a>
                  </div>
                  <div class="shp__pro__details">
                      <h2><a href="product-details.html">` + data[1]['fields']['name'] + `</a></h2>
                      <span class="shp__price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span').text() + `</span></span>
                      <span class="non_change_shp_price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span').text() + `</span></span>
                  </div>
                  <div class="remove__btn">
                      <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                  </div>
              </div>

              `)

                          } else {
                              $('.shp__cart__wrap').append(`
          
          <div class="shp__single__product">
                  <div class="shp__pro__thumb">
                      <a href="javascript:void(0)">
                          <img src="` + window.location.origin + `/media/` + data[1][0]['fields']['image'] + `" alt="product images">
                      </a>
                  </div>
                  <div class="shp__pro__details">
                      <h2><a href="product-details.html">` + data[1][0]['fields']['name'] + `</a></h2>
                      <span class="shp__price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span').text() + `</span></span>
                      <span class="non_change_shp_price">` + currencySign + `<span>` + $(parent).parent().find('.non_change_sale_price span').text() + `</span></span>
                    </div>
                  <div class="remove__btn">
                      <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                  </div>
              </div>

              `)
                          }
                          if ($('.empty-cart-text').length > 0) {
                              $(`
              <ul class="shoping__total">
                  <li class="subtotal">Subtotal:</li>
                  <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span:last').text() + `</span></li>
              </ul>
              <ul class="shopping__btn" id="shp__btn">
              <li><a href="/cart/">View Cart</a></li>
              <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
          </ul>`).insertAfter($('.shp__cart__wrap'))
                              $('.empty-cart-text').remove()
                          } else {
                              $('.total__price span').text(thousands_separators(parseFloat($(parent).parent().find('.sale_price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                              console.log($(parent).parent().parent())
                              calculate(currency, currencySign)
                          }
                          $(`<a href="javascript:void(0)" class="update-cart" data-product="` + productId + `" data-action="remove"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #000000; background-color: #ffcc7e; border: 1px solid #FFCC7E; margin-right: 15px; margin-top: 10px; border-radius: 50%;"></span></a>`).insertBefore($(parent))
                          $(parent).remove();

                          $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                          $.fn.updateCart();
                          $.fn.rmvorder();
                          $.fn.rmvwish();

                      }
                  }
              })
          }
      }
      if (action === "remove") {
          if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
              $('#add-img').toggleClass('rotate')
          } else {
              $(parent).hide();
              $(parent).parent().find('.loader1').show();
          }
          $.ajax({

              type: 'POST',
              url: window.location.href,
              headers: {
                  'X-CSRFToken': csrftoken
              },
              data: {
                  productId: productId,
                  action: action
              },
              success: function(data) {
                  $(parent).parent().find('.loader1').hide();

                  console.log(data)
                  $('.shp__single__product').each(function(index) {
                      console.log('mc')
                      if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                          console.log('personalize')
                          console.log($('#solo-art').html())
                          if ($('.shp__pro__details h2 a').eq(index).html() == $('#solo-art').html()) {
                              $('.shp__single__product').eq(index).remove();
                              console.log('removed')
                              $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($('#solo-price span:last').text().replace(/,/g, ''))))
                              if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                                  $('.shopping__btn').remove();
                                  $('.shoping__total').remove();
                                  $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                              }

                              $(`<div data-tooltip="Add to Cart">
      <img src="` + window.location.origin + `/static/main/images/cart.svg" class="update-cart" data-product="` + productId + `" data-action="add" id="add-img" alt="" width="100%" height="100%">
      </div>
      `).insertBefore($(parent).parent())
                              $(parent).parent().remove();

                          }
                      } else {
                          if ($('.shp__pro__details h2 a').eq(index).text() == $(parent).parent().siblings().find('a h4').text()) {
                              console.log($(parent).parent().siblings().find('a h4').text())
                              $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($(parent).parent().find('.sale_price span:last').html().replace(/,/g, ''))))
                              $('.shp__single__product').eq(index).remove();
                              if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                                  $('.shopping__btn').remove();
                                  $('.shoping__total').remove();
                                  $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                              }
                          }
                      }
                  });

                  $(`<a href="javascript:void(0)" class="update-cart" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; background-color: transparent; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertBefore($(parent))
                  $(parent).remove();
                  $('.cart-count').html(parseFloat($('.cart-count').html()) - 1);
                  $.fn.updateCart();
                  $.fn.rmvorder();
                  $.fn.rmvwish();
              }
          });
      }
  }


  function addMoreCart(productId, action, parent) {
      if (action === 'add' && $(parent).hasClass('art-more')) {

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
                  action: action
              },
              success: function(data) {
                  console.log(data)
                  url = window.location.href.split("/")
                  console.log(url)
                  $(parent).parent().find('.loader1').hide();

                  console.log(window.location.pathname)

                  $('.shp__cart__wrap').append(`
            
                <div class="shp__single__product">
                        <div class="shp__pro__thumb">
                            <a href="javascript:void(0)">
                                <img src="` + window.location.origin + `/media/` + data[1]['fields']['image'] + `" alt="product images">
                            </a>
                        </div>
                        <div class="shp__pro__details">
                            <h2><a href="product-details.html">` + data[1]['fields']['name'] + `</a></h2>
                            <span class="shp__price">₹<span>` + $(parent).parent().find('.sale_price span:last').text() + `</span></span>
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
                        <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span:last').text() + `</span></li>
                    </ul>
                    <ul class="shopping__btn" id="shp__btn">
                    <li><a href="/cart/">View Cart</a></li>
                    <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
                </ul>`).insertAfter($('.shp__cart__wrap'))
                      $('.empty-cart-text').remove()
                  } else {
                      $('.total__price span:last').text(thousands_separators(parseFloat($(parent).parent().find('.sale_price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                      console.log($(parent).parent().parent())
                  }
                  console.log($(parent).parent().parent())
                  $(`<a href="javascript:void(0)" class="update-cart art-more" data-product="` + productId + `" data-action="remove"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #000000; background-color: #ffcc7e; border: 1px solid #FFCC7E; margin-right: 15px; margin-top: 10px; border-radius: 50%;"></span></a>`).insertBefore($(parent))
                  $(parent).remove();

                  $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                  $.fn.updateCart();
                  $.fn.rmvorder();
                  $.fn.rmvwish();

              }
          })

      }
      if (action === "remove" && $(parent).hasClass('art-more')) {
          $(parent).parent().find('.loader1').show();
          $(parent).hide();
          $.ajax({

              type: 'POST',
              url: window.location.href,
              headers: {
                  'X-CSRFToken': csrftoken
              },
              data: {
                  productId: productId,
                  action: action
              },
              success: function(data) {
                  $(parent).parent().find('.loader1').hide();
                  console.log(data)
                  $('.shp__single__product').each(function(index) {
                      console.log('mc')
                      /*if(window.location.pathname==='/artwork-details/'+productId+'/' || window.location.pathname==='/personalize-details/'+productId+'/'){
                        $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, ''))-parseFloat($('#solo-price span').text().replace(/,/g, ''))))
                      }
                      else{*/
                      $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($(parent).parent().find('.sale_price span:last').html().replace(/,/g, ''))))

                      $('.shp__single__product').eq(index).remove();
                      if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                          $('.shopping__btn').remove();
                          $('.shoping__total').remove();
                          $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                      }
                      $(`<a href="javascript:void(0)" class="update-cart art-more" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; background-color: transparent; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertBefore($(parent))
                      $(parent).remove();
                      $('.cart-count').html(parseFloat($('.cart-count').html()) - 1);
                      $.fn.updateCart();
                      $.fn.rmvorder();
                      $.fn.rmvwish();
                  })
              }
          });
      }
  }

  function addMoreCookieCart(productId, action, names, price, image, parent) {
      if (action === 'add' && $(parent).hasClass('art-more')) {
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
                        <span class="shp__price">` + currencySign + `<span>` + price + `</span></span>
                    </div>
                    <div class="remove__btn">
                        <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                    </div>
                </div>

                `)

              cart[productId] = {
                  'quantity': 1
              }
              document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
              if ($('.empty-cart-text').length > 0) {
                  $(`
                <ul class="shoping__total">
                    <li class="subtotal">Subtotal:</li>
                    <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + price + `</span></li>
                </ul>
                <ul class="shopping__btn" id="shp__btn">
                <li><a href="/cart/">View Cart</a></li>
                <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
            </ul>`).insertAfter($('.shp__cart__wrap'))
                  $('.empty-cart-text').remove()
              } else {
                  $('.total__price span:last').text(thousands_separators(parseFloat($('#solo-price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                  console.log($(parent).parent().parent())
              }
              $.fn.rmvorder();
              $.fn.rmvwish();
              $.fn.updateCart();

          }

          if ($('.empty-cart-text').length > 0) {
              $(`
              <ul class="shoping__total">
                  <li class="subtotal">Subtotal:</li>
                  <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span:last').text() + `</span></li>
              </ul>
              <ul class="shopping__btn" id="shp__btn">
              <li><a href="/cart/">View Cart</a></li>
              <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
          </ul>`).insertAfter($('.shp__cart__wrap'))
              $('.empty-cart-text').remove()
          } else {
              $('.total__price span:last').text(thousands_separators(parseFloat($(parent).parent().find('.sale_price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
              console.log($(parent).parent().parent())
          }

          $(`<a href="javascript:void(0)" class="update-cart art-more" data-product="` + productId + `" data-action="remove"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #000000; background-color: #ffcc7e; border: 1px solid #FFCC7E; margin-right: 15px; margin-top: 10px; border-radius: 50%;"></span></a>`).insertBefore($(parent))
          $(parent).remove();
          $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
          $.fn.updateCart();
          $.fn.rmvorder();
          $.fn.rmvwish();
          cart[productId] = {
              'quantity': 1
          }
          document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

      }
      if (action == "remove") {

          cart[productId]['quantity'] -= 1
          if (cart[productId]['quantity'] <= 0) {
              delete cart[productId];
              $('.shp__single__product').each(function(index) {
                  if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                      $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($('#solo-price span').text().replace(/,/g, ''))))
                  } else {
                      $('.total__price span').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($(parent).parent().find('.sale_price span:last').html().replace(/,/g, ''))))
                  }
                  $('.shp__single__product').eq(index).remove();
                  if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                      $('.shopping__btn').remove();
                      $('.shoping__total').remove();
                      $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                  }
              })
              $(`<a href="javascript:void(0)" class="update-cart art-more" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; background-color: #000000; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertBefore($(parent))
              parent.remove();
              $('.cart-count').html(parseFloat($('.cart-count').html()) - 1);
              $.fn.updateCart();
              $.fn.rmvorder();
              $.fn.rmvwish();
          }

      }
      document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
  }

  function addCookieCart(productId, action, names, price, image, parent) {
      if (action == "add") {
          url = window.location.href.split("/")
          if (window.location.pathname === '/artwork-details/' + url[4] + '/') {
              console.log('rotate')
              $('#add-img').toggleClass('rotate')
          }
          if (cart[productId] == undefined) {

              if (window.location.pathname === '/personalize-details/' + productId + '/') {

                  if (navigator.userAgent.match(/Android/i) ||
                      navigator.userAgent.match(/webOS/i) ||
                      navigator.userAgent.match(/iPhone/i) ||
                      navigator.userAgent.match(/iPad/i) ||
                      navigator.userAgent.match(/iPod/i) ||
                      navigator.userAgent.match(/BlackBerry/i) ||
                      navigator.userAgent.match(/Windows Phone/i)) {
                      console.log('mobile')
                      let allAreFilled = true;
                      document.getElementById("mform").querySelectorAll("[required]").forEach(function(i) {
                          if (!allAreFilled) return;
                          if (!i.value) allAreFilled = false;
                          if (i.type === "radio") {
                              let radioValueCheck = false;
                              document.getElementById("mform").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
                                  if (r.checked) radioValueCheck = true;
                              })
                              allAreFilled = radioValueCheck;
                          }
                      })
                      if (!allAreFilled || $('#mpersonalize-file').prop('files')[0] == undefined) {
                          alert('Fill all the fields');
                      }
                      console.log($('#mpersonalize-file').prop('files')[0])
                      if (allAreFilled && $('#mpersonalize-file').prop('files')[0] != undefined) {
                          var fd = new FormData();
                          fd.append('productId', productId);
                          fd.append('action', action);
                          fd.append('size', $("input[name=msize]:checked").val());
                          fd.append('price', $(".non_change_price span:last").val());
                          fd.append('medium', $("input[name=mmedium]:checked").val());
                          fd.append('orientation', $("input[name=morientation]:checked").val());
                          fd.append('faces', $("input[name=mfaces]:checked").val());
                          fd.append('note', $('#mnote').val());
                          fd.append('photo', $('#mpersonalize-file').prop('files')[0]);
                          $.ajax({
                          type: 'POST',
                          url: window.location.href,
                          headers: {
                              'X-CSRFToken': csrftoken
                          },
                          data: fd,
                          processData: false,
                          contentType: false,

                          success: function(data) {
                                  $(`<button onclick='window.location.href="/cart/"'>Added to Cart</button>`).insertBefore($(parent))
                                  $(parent).remove()
                                  $('.shp__cart__wrap').append(`
              
                  <div class="shp__single__product">
                          <div class="shp__pro__thumb">
                              <a href="javascript:void(0)">
                                  <img src="` + window.location.origin + image + `" alt="product images">
                              </a>
                          </div>
                          <div class="shp__pro__details">
                              <h2><a href="product-details.html">` + $('#solo-art').html() + `</a></h2>
                              <span class="shp__price">` + currencySign + `<span>` + price + `</span></span>
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
                    <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + price + `</span></li>
                </ul>
                <ul class="shopping__btn" id="shp__btn">
                <li><a href="/cart/">View Cart</a></li>
                <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
            </ul>`).insertAfter($('.shp__single__product'))
                                      $('.empty-cart-text').remove()
                                  } else {
                                      $('.total__price span:last').text(thousands_separators(parseFloat($('#solo-price span').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                                      console.log($(parent).parent().parent())
                                  }
                                  $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                                  cart[productId] = {
                                      'quantity': 1
                                  }
                                  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
                                  $.fn.rmvorder();
                                  $.fn.rmvwish();
                          }
                          })
                      }
                  } else {
                      console.log('desktop')
                      let allAreFilled = true;
                      document.getElementById("form").querySelectorAll("[required]").forEach(function(i) {
                          if (!allAreFilled) return;
                          if (!i.value) allAreFilled = false;
                          if (i.type === "radio") {
                              let radioValueCheck = false;
                              document.getElementById("form").querySelectorAll(`[name=${i.name}]`).forEach(function(r) {
                                  if (r.checked) radioValueCheck = true;
                              })
                              allAreFilled = radioValueCheck;
                          }
                      })
                      if (!allAreFilled || $('#personalize-file').prop('files')[0] == undefined) {
                          alert('Fill all the fields');
                      }
                      console.log($('#personalize-file').prop('files')[0])
                      if (allAreFilled && $('#personalize-file').prop('files')[0] != undefined) {
                          var fd = new FormData();
                          fd.append('productId', productId);
                          fd.append('action', action);
                          fd.append('size', $("input[name=size]:checked").val());
                          fd.append('medium', $("input[name=medium]:checked").val());
                          fd.append('orientation', $("input[name=orientation]:checked").val());
                          fd.append('faces', $("input[name=faces]:checked").val());
                          fd.append('note', $('#note').val());
                          fd.append('price', $('.non_change_price span:last').html());
                          fd.append('photo', $('#personalize-file').prop('files')[0]);
                          if (window.location.pathname === '/personalize-details/' + productId + '/') {
                              console.log(productId)
                              $('#add-img').toggleClass('rotate')
                          }
                      $.ajax({
                          type: 'POST',
                          url: window.location.href,
                          headers: {
                              'X-CSRFToken': csrftoken
                          },
                          data: fd,
                          processData: false,
                          contentType: false,

                          success: function(data) {

                                  url = window.location.href.split("/")
                                  $(`<div data-tooltip="Added to Cart">
              <img src="` + window.location.origin + `/static/main/images/added.svg" class="update-cart" data-product="` + productId + `" data-action="remove" id="add-img" alt="" width="100%" height="100%">
              </div>
              `).insertBefore($(parent))
                                  $(parent).remove()
                                  $('.shp__cart__wrap').append(`
          
              <div class="shp__single__product">
                      <div class="shp__pro__thumb">
                          <a href="javascript:void(0)">
                              <img src="` + window.location.origin + image + `" alt="product images">
                          </a>
                      </div>
                      <div class="shp__pro__details">
                          <h2><a href="product-details.html">` + $('#solo-art').html() + `</a></h2>
                          <span class="shp__price">` + currencySign + `<span>` + price + `</span></span>
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
                      <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + price + `</span></li>
                  </ul>
                  <ul class="shopping__btn" id="shp__btn">
                  <li><a href="/cart/">View Cart</a></li>
                  <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
              </ul>`).insertAfter($('.shp__cart__wrap'))
                                      $('.empty-cart-text').remove()
                                  } else {
                                      $('.total__price span:last').text(thousands_separators(parseFloat($('#solo-price span').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                                      console.log($(parent).parent().parent())
                                  }
                                  $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                                  cart[productId] = {
                                      'quantity': 1
                                  }
                                  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
                                  $.fn.rmvorder();
                                  $.fn.rmvwish();

                      }
                      })
                      }          
                  }
              }

              if (window.location.pathname === '/artwork-details/' + url[4] + '/') {

                  if (navigator.userAgent.match(/Android/i) ||
                      navigator.userAgent.match(/webOS/i) ||
                      navigator.userAgent.match(/iPhone/i) ||
                      navigator.userAgent.match(/iPad/i) ||
                      navigator.userAgent.match(/iPod/i) ||
                      navigator.userAgent.match(/BlackBerry/i) ||
                      navigator.userAgent.match(/Windows Phone/i)) {
                      console.log('mobile')
                  
                      $(`<button onclick='window.location.href="/cart/"' class="added">Added to Cart</button>`).insertBefore($(parent))
                      $(parent).remove();
                  } else {
                      console.log('desk')
                      $(`<div data-tooltip="Added to Cart">
              <img src="` + window.location.origin + `/static/main/images/added.svg" class="update-cart" data-product="` + productId + `" data-action="remove" id="add-img" alt="" width="100%" height="100%">
              </div>
              `).insertBefore($(parent).parent())
                      $(parent).parent().remove();
                  }
                  $('.shp__cart__wrap').append(`
        
            <div class="shp__single__product">
                    <div class="shp__pro__thumb">
                        <a href="javascript:void(0)">
                            <img src="` + window.location.origin + image + `" alt="product images">
                        </a>
                    </div>
                    <div class="shp__pro__details">
                        <h2><a href="product-details.html">` + names + `</a></h2>
                        <span class="shp__price">` + currencySign + `<span>` + price + `</span></span>
                    </div>
                    <div class="remove__btn">
                        <a href="javascript:void(0)" title="Remove this item" class="remove-cart" data-product="` + productId + `" data-action="delete"><i class="zmdi zmdi-close"></i></a>
                    </div>
                </div>

                `)


                  cart[productId] = {
                      'quantity': 1
                  }
                  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
                  $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                  if ($('.empty-cart-text').length > 0) {
                      $(`
                <ul class="shoping__total">
                    <li class="subtotal">Subtotal:</li>
                    <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + price + `</span></li>
                </ul>
                <ul class="shopping__btn" id="shp__btn">
                <li><a href="/cart/">View Cart</a></li>
                <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
            </ul>`).insertAfter($('.shp__cart__wrap'))
                      $('.empty-cart-text').remove()
                  } else {
                      $('.total__price span:last').text(thousands_separators(parseFloat($('#solo-price span').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                      console.log($(parent).parent().parent())
                  }
                  $.fn.rmvorder();
                  $.fn.rmvwish();
                  $.fn.updateCart();

              }
              console.log(url)

              if (window.location.pathname === '/artworks/' || window.location.pathname === '/search-results/' || window.location.pathname == "/" || window.location.pathname === '/artworks/' + url[4] + '/' + url[5] + '/' || window.location.pathname === '/artworks/' + url[4] + '/' || window.location.pathname === '/artist/' + url[4] + '/' || window.location.pathname === '/artist/' + url[4] + '/' + url[5] + '/') {
                  console.log('entered')
                  $('.shp__cart__wrap').append(`
            
          <div class="shp__single__product">
                  <div class="shp__pro__thumb">
                      <a href="javascript:void(0)">
                          <img src="` + image + `" alt="product images">
                      </a>
                  </div>
                  <div class="shp__pro__details">
                      <h2><a href="product-details.html">` + names + `</a></h2>
                      <span class="shp__price">` + currencySign + `<span>` + price + `</span></span>
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
                  <li class="total__price" id="shp__total__price">` + currencySign + `<span>` + $(parent).parent().find('.sale_price span:last').text() + `</span></li>
              </ul>
              <ul class="shopping__btn" id="shp__btn">
              <li><a href="/cart/">View Cart</a></li>
              <li class="shp__checkout"><a href="/checkout/">Checkout</a></li>
          </ul>`).insertAfter($('.shp__cart__wrap'))
                      $('.empty-cart-text').remove()
                  } else {
                      $('.total__price span').text(thousands_separators(parseFloat($(parent).parent().find('.sale_price span:last').text().replace(/,/g, '')) + parseFloat($('.total__price span:last').text().replace(/,/g, ''))))
                      console.log($(parent).parent().parent())
                  }

                  $(`<a href="javascript:void(0)" class="update-cart" data-product="` + productId + `" data-action="remove"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #000000; background-color: #ffcc7e; border: 1px solid #FFCC7E; margin-right: 15px; margin-top: 10px; border-radius: 50%;"></span></a>`).insertBefore($(parent))
                  $(parent).remove();
                  $('.cart-count').html(parseFloat($('.cart-count').html()) + 1);
                  $.fn.updateCart();
                  $.fn.rmvorder();
                  $.fn.rmvwish();
                  cart[productId] = {
                      'quantity': 1
                  }
                  document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"

              }
          }

      }
      if (action == "remove") {

          cart[productId]['quantity'] -= 1
          if (cart[productId]['quantity'] <= 0) {
              delete cart[productId];
              if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                  $('.shp__single__product').each(function(index) {
                      $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($('#solo-price span').text().replace(/,/g, ''))))

                      $('.shp__single__product').eq(index).remove();
                      if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                          $('.shopping__btn').remove();
                          $('.shoping__total').remove();
                          $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                      }

                      $(`<div data-tooltip="Add to Cart">
              <img src="` + window.location.origin + `/static/main/images/cart.svg" class="update-cart" data-product="` + productId + `" data-action="add" id="add-img" alt="" width="100%" height="100%">
              </div>
              `).insertBefore($(parent).parent())
                      $(parent).parent().remove();
                  })
              } else {
                  console.log($(parent).parent().siblings().find('a:first h4').html())
                  $('.shp__single__product').each(function(index) {
                      if ($('.shp__pro__details h2 a').eq(index).text() == $(parent).parent().siblings().find('a h4').text()) {
                          $('.total__price span:last').html(thousands_separators(parseFloat($('.total__price span:last').html().replace(/,/g, '')) - parseFloat($(parent).parent().find('.sale_price span:last').html().replace(/,/g, ''))))
                          $('.shp__single__product').eq(index).remove();
                          if ($('.shp__cart__wrap').children('.shp__single__product').length < 1) {
                              $('.shopping__btn').remove();
                              $('.shoping__total').remove();
                              $('.shp__cart__wrap').append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)
                          }

                          $(`<a href="javascript:void(0)" class="update-cart" data-product="` + productId + `" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; background-color: transparent; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertBefore($(parent))
                      }
                  })

              }

          };
          $(parent).remove();
          $('.cart-count').html(parseFloat($('.cart-count').html()) - 1);
          $.fn.updateCart();
          $.fn.rmvorder();
          $.fn.rmvwish();
      }
      document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
  }

$.fn.wishlisted = function() {
      var delwishBtns = document.getElementsByClassName('wishlisted')

      for (i = 0; i < delwishBtns.length; i++) {
          delwishBtns[i].addEventListener('click', function(e) {
              e.preventDefault();
              e.stopImmediatePropagation();
              var productId = this.dataset.product
              var action = this.dataset.action
              var parent = $(this)

              wishlisted(productId, action, parent)
          })
      }
  }
  $.fn.wishlisted();

  $('.loader2').hide();

  $.fn.wishlist = function() {
      var wishBtns = document.getElementsByClassName('wishlist-cart')

      for (i = 0; i < wishBtns.length; i++) {
          wishBtns[i].addEventListener('click', function(e) {
              e.preventDefault();
              e.stopImmediatePropagation();
              var productId = this.dataset.product
              var action = this.dataset.action
              var parent = $(this)
              if (user === "AnonymousUser") {
                  if (window.location.pathname === '/artwork-details/' + url[4] + '/') {
                      names = $('#solo-art').text()
                      price = $('#solo-price span').text()
                      image = $('.bg-art').attr('src')
                      console.log(names)
                      console.log(image)
                  } else {
                      names = $(parent).parent().siblings().find('a').find('h4').text()
                      price = $(parent).parent().find('.sale_price span:last').text()
                      image = $(parent).parent().parent().parent().find('img').attr('src')
                  }
                  wishCookieCart(productId, action, parent, names, price, image)
              } else {
                  console.log(productId)
                  wishlistCart(productId, action, parent)
              }
          })
      }
  }
  $.fn.wishlist();

  function wishCookieCart(productId, action, parent, names, price, image) {
      if (action == 'wishlist') {
          if (wishlist[productId] === undefined) {
              wishlist[productId] = {
                  'quantity': 1
              }
              document.cookie = 'wishlist=' + JSON.stringify(wishlist) + ";domain=;path=/"

              $('.wish__cart__wrap').append(`
              
              <div class="wish__single__product wish__single">
                      <div class="wish__pro__thumb">
                          <a href="javascript:void(0)">
                              <img src="` + image + `" alt="product images">
                          </a>
                      </div>
                      <div class="wish__pro__details">
                          <h2><a href="product-details.html">` + names + `</a></h2>
                          <span class="wish__price">` + currencySign + `` + price + `</span>
                      </div>
                      <div class="remove__btn">
                          <a href="javascript:void(0)" title="Remove this item" class="remove-wish" data-product="` + productId + `" data-action="delete-wish"><i class="zmdi zmdi-close"></i></a>
                      </div>
                  </div>
                  
                  `)
              if ($('.no-item').length > 0) {
                  $(`<ul class="wish__btn" id="wishlist__btn">
                  <li><a href="/wishlist/">View Wishlists</a></li>
                  <li class="shp__checkout"><a href="/cart/">View Cart</a></li>
              </ul>`).insertAfter($('.wish__cart__wrap'))
                  $('.no-item').remove()
              }
              parent.parent().append(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + productId + `" data-action="remove-wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #000000; background-color: #ffcc7e; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`)
              parent.remove();
              $('.wish-count').html(parseFloat($('.wish-count').html()) + 1);
              $.fn.wishlist();
              $.fn.rmvorder();
              $.fn.rmvwish();
          }

      }
      if (action == 'remove-wishlist') {

          delete wishlist[productId]
          document.cookie = 'wishlist=' + JSON.stringify(wishlist) + ";domain=;path=/"
          $('.wish__single__product').each(function(index) {
              if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                  console.log($('#solo-art').html())
                  if ($('.wish__pro__details h2 a').eq(index).html() == $('#solo-art').html()) {
                      $('.wish__single__product').eq(index).remove();
                      if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                          $('.wish__btn').remove();
                          $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                      }
                  }
              } else {
                  if ($('.wish__pro__details h2 a').eq(index).html() == $(parent).parent().siblings().find('a h4').text()) {
                      $('.wish__single__product').eq(index).remove();
                      if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                          $('.wish__btn').remove();
                          $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                      }
                  }
              }
          })
          $('.wish-count').html(parseFloat($('.wish-count').html()) - 1);
          parent.parent().append(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + productId + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`)
          parent.remove();
          $.fn.wishlist();
          $.fn.rmvorder();

          $.fn.rmvwish();
      }
  }

  function wishlistCart(productId, action, parent) {
      if (action === 'wishlist') {
          $(parent).hide();
          $(parent).parent().find('.loader2').show();
          $.ajax({
              type: 'POST',
              url: window.location.href,
              headers: {
                  'X-CSRFToken': csrftoken
              },
              data: {
                  product: productId,
                  productId: productId,
                  action: action
              },
              success: function(data) {

                  $(parent).parent().find('.loader2').hide();
                  $('.wish__cart__wrap').append(
                      `<div class="wish__single__product wish__single">
            <div class="wish__pro__thumb">
                <a href="javascript:void(0)">
                    <img src="` + window.location.origin + `/media/` + data[0]['fields']['image'] + `" alt="product images">
                </a>
            </div>
            <div class="wish__pro__details">
                <h2><a href="product-details.html">` + data[0]['fields']['name'] + `</a></h2>
                <span class="wish__price">` + currencySign + `` + thousands_separators(data[0]['fields']['price']) + `</span>
            </div>
            <div class="remove__btn">
                <a href="javascript:void(0)" title="Remove this item" class="remove-wish" data-product="` + productId + `" data-action="delete-wish"><i class="zmdi zmdi-close"></i></a>
            </div>
        </div>`
                  )
                  $('.wish-count').html(parseFloat($('.wish-count').html()) + 1);
                  console.log(data)
                  if ($('.no-item').length > 0) {
                      $(`<ul class="wish__btn" id="wishlist__btn">
              <li><a href="/wishlist/">View Wishlists</a></li>
              <li class="shp__checkout"><a href="/cart/">View Cart</a></li>
          </ul>`).insertAfter($('.wish__cart__wrap'))
                      $('.no-item').remove()
                  }
                  /*parent.find('span').addClass('ti-shopping-cart-full').removeClass('ti-heart')
                      
                  //$('.update-cart').attr('href', '/cart/')
                  parent.attr('title', 'Added to Wishlist')
                  parent.addClass('wishlist').removeClass('wishlist-cart')*/
                  parent.parent().append(`<a href="javascript:void(0)" class="wishlist-cart" data-product="` + productId + `" data-action="remove-wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #000000; background-color: #ffcc7e; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`)
                  parent.remove();
                  $.fn.wishlist();

                  $.fn.rmvorder();
                  $.fn.rmvwish();

              }
          });
      }
      if (action === 'remove-wishlist') {
          $(parent).hide();
          $(parent).parent().find('.loader2').show();
          $.ajax({
              type: 'POST',
              url: window.location.href,
              headers: {
                  'X-CSRFToken': csrftoken
              },
              data: {
                  product: productId,
                  productId: productId,
                  action: action
              },
              success: function(data) {
                  $(parent).parent().find('.loader2').hide();
                  console.log(data)
                  $('.wish__single__product').each(function(index) {
                      if (window.location.pathname === '/artwork-details/' + url[4] + '/' || window.location.pathname === '/personalize-details/' + productId + '/') {
                          console.log($('#solo-art').html())
                          if ($('.wish__pro__details h2 a').eq(index).html() == $('#solo-art').html()) {
                              $('.wish__single__product').eq(index).remove();
                              if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                                  $('.wish__btn').remove();
                                  $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                              }
                          }
                      } else {
                          if ($('.wish__pro__details h2 a').eq(index).html() == $(parent).parent().siblings().find('a h4').text()) {
                              $('.wish__single__product').eq(index).remove();
                              if ($('.wish__cart__wrap').children('.wish__single__product').length < 1) {
                                  $('.wish__btn').remove();
                                  $('.wish__cart__wrap').append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)
                              }
                          }
                      }
                  })
                  $('.wish-count').html(parseFloat($('.wish-count').html()) - 1);
                  parent.parent().append(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="` + productId + `" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`)
                  parent.remove();
                  $.fn.wishlist();
                  $.fn.rmvorder();
                  $.fn.rmvwish();
              }
          })
      }
  }
