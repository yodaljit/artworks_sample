$(".results").hide(),$(window).scroll(function(){992<$(window).width()?155<$(window).scrollTop()?($("#desk-nav").hide(),$("#links").hide(),$("#desk-sticky-nav").show()):($("#desk-nav").show(),$("#links").show(),$("#desk-sticky-nav").hide()):60<$(window).scrollTop()?$(".nav").css("background-color","#212120"):$(".nav").css("background-color","#141413")}),$("#desk-sticky-nav .header-icons #search").hide(),$("#search-icon").on("click",function(){$("#desk-sticky-nav .header-icons #search").show(),$(this).hide(),$("#desk-sticky-nav .header-icons .wish__menu").hide(),$("#desk-sticky-nav .header-icons .cart__menu").hide(),$("#desk-sticky-nav .header-icons .user__menu").hide(),$("#desk-sticky-nav .header-icons #user").hide()}),$("#desk-sticky-nav .input-group-text").on("click",function(){console.log("click"),$("#search-icon").show(),$("#desk-sticky-nav .header-icons #search").hide(),$("#desk-sticky-nav .header-icons .wish__menu").show(),$("#desk-sticky-nav .header-icons .cart__menu").show(),$("#desk-sticky-nav .header-icons .user__menu").show(),$("#desk-sticky-nav .header-icons #user").show()}),$(".mob-search .input-group-text").on("click",function(){$(".mob-search").hide()}),$.fn.rmvwish=function(){var a=document.getElementsByClassName("remove-wish");for(i=0;i<a.length;i++)a[i].addEventListener("click",function(a){a.preventDefault(),a.stopImmediatePropagation(),productId=this.dataset.product,action=this.dataset.action,parent=$(this),shp=$(".product__details").siblings(),"AnonymousUser"==user?(delete wishlist[productId],document.cookie="wishlist="+JSON.stringify(wishlist)+";domain=;path=/",$(".wish__single__product").each(function(a){"/wishlist/"==window.location.pathname&&(console.log($(parent).parent().siblings().find("h2 a").html()),$(parent).parent().siblings().find("h2 a").html()==$(".art-name h4").eq(a).html()&&(console.log($("table tbody").find("tr").eq(a)),console.log($(".art-name h4").eq(a).text()),$("table tbody").find("tr").eq(a).remove()),1>$("table tbody tr").length&&($(".wishlist-table").remove(),$(".wishlist-content").append(`<p class="text-center"><strong>There's no item in your wishlist.</strong></p>`)))}),$(".wishlist-cart").each(function(a){$(this).attr("data-product")===productId&&"remove-wishlist"===$(this).attr("data-action")&&($(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="`+productId+`" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`).insertAfter($(".wishlist-cart").eq(a)),$(".wishlist-cart").eq(a).remove(),$.fn.wishlist(),$.fn.updateCart(),$.fn.rmvwish())}),$(".wish-count").html(parseFloat($(".wish-count").html())-1),$(parent).parent().parent().remove(),1>$(".wish__cart__wrap").children(".wish__single__product").length&&($(".wish__btn").remove(),$(".wish__cart__wrap").append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)),$(".total__price span").text(thousands_separators(parseFloat($(".total__price span").text().replace(/,/g,""))-parseFloat(parent.parent().parent().find(".shp__pro__details").find("span span").text().replace(/,/g,"")))),$.fn.rmvwish(),$.fn.wishlist(),$.fn.updateCart()):$.ajax({type:"POST",url:window.location.href,headers:{"X-CSRFToken":csrftoken},data:{productId:productId,product:productId,action:action},success:function(){$(".wish__single__product").each(function(a){"/wishlist/"==window.location.pathname&&(console.log($(parent).parent().siblings().find("h2 a").html()),$(parent).parent().siblings().find("h2 a").html()==$(".art-name h4").eq(a).html()&&(console.log($("table tbody").find("tr").eq(a)),console.log($(".art-name h4").eq(a).text()),$("table tbody").find("tr").eq(a).remove()),1>$("table tbody tr").length&&($(".wishlist-table").remove(),$(".wishlist-content").append(`<p class="text-center"><strong>There's no item in your wishlist.</strong></p>`)))}),$(".wishlist-cart").each(function(a){$(this).attr("data-product")===productId&&"remove-wishlist"===$(this).attr("data-action")&&($(`<a id="wishlist" href="javascript:void(0)" class="wishlist-cart" data-product="`+productId+`" data-action="wishlist"><span class="iconify" data-icon="bx:bx-heart" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%;"></span></a>`).insertAfter($(".wishlist-cart").eq(a)),$(".wishlist-cart").eq(a).remove())}),$(".wish-count").html(parseFloat($(".wish-count").html())-1),$(parent).parent().parent().remove(),1>$(".wish__cart__wrap").children(".wish__single__product").length&&($(".wish__btn").remove(),$(".wish__cart__wrap").append(`<p class="text-center no-item">Your Wishlist is empty.</p>`)),$(".total__price span").text(thousands_separators(parseFloat($(".total__price span").text().replace(/,/g,""))-parseFloat(parent.parent().parent().find(".shp__pro__details").find("span span").text().replace(/,/g,"")))),$.fn.wishlist(),$.fn.updateCart(),$.fn.rmvwish()}})})},$.fn.rmvorder=function(){var a=document.getElementsByClassName("remove-cart");for(i=0;i<a.length;i++)a[i].addEventListener("click",function(a){a.preventDefault(),a.stopImmediatePropagation(),productId=this.dataset.product,action=this.dataset.action,parent=$(this),shp=$(".product__details").siblings(),"AnonymousUser"==user?(delete cart[productId],document.cookie="cart="+JSON.stringify(cart)+";domain=;path=/",$(".update-cart").each(function(a){$(this).attr("data-product")===productId&&$(this).hasClass("art-more")&&"remove"===$(this).attr("data-action")&&(console.log("has"),$(`<a href="javascript:void(0)" class="update-cart art-more" data-product="`+productId+`" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($(".update-cart").eq(a)),$(".update-cart").eq(a).remove(),console.log("done")),$(this).attr("data-product")!==productId||$(this).hasClass("art-more")||"remove"!==$(this).attr("data-action")||(window.location.pathname==="/artwork-details/"+url[4]+"/"||window.location.pathname==="/personalize-details/"+productId+"/"?($(`<div data-tooltip="Add to Cart">
                <img src="`+window.location.origin+`/static/main/images/cart.svg" class="update-cart" data-product="`+productId+`" data-action="add" id="add-img" alt="" width="100%" height="100%">
                </div>
                `).insertAfter($(".update-cart").eq(a).parent()),$(".update-cart").eq(a).parent().remove(),$.fn.updateCart(),$.fn.rmvorder()):($(`<a href="javascript:void(0)" class="update-cart" data-product="`+productId+`" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($(".update-cart").eq(a)),console.log("done"),$(".update-cart").eq(a).remove()))}),$(".cart-count").html(parseFloat($(".cart-count").html())-1),$(parent).parent().parent().remove(),1>$(".shp__cart__wrap").children(".shp__single__product").length&&($(".shopping__btn").remove(),$(".shoping__total").remove(),$(".shp__cart__wrap").append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)),$(".total__price span").text(thousands_separators((parseFloat($(".total__price span:last").text().replace(/,/g,""))-parseFloat(parent.parent().parent().find(".shp__pro__details").find("span span").text().replace(/,/g,""))).toFixed(2))),$.fn.wishlist(),$.fn.updateCart()):$.ajax({type:"POST",url:window.location.href,headers:{"X-CSRFToken":csrftoken},data:{productId:productId,product:productId,action:action},success:function(){$(".update-cart").each(function(a){$(this).attr("data-product")===productId&&$(this).hasClass("art-more")&&"remove"===$(this).attr("data-action")&&(console.log("has"),$(`<a href="javascript:void(0)" class="update-cart art-more" data-product="`+productId+`" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($(".update-cart").eq(a)),$(".update-cart").eq(a).remove(),console.log("done")),$(this).attr("data-product")!==productId||$(this).hasClass("art-more")||"remove"!==$(this).attr("data-action")||(window.location.pathname==="/artwork-details/"+url[4]+"/"||window.location.pathname==="/personalize-details/"+productId+"/"?($(`<div data-tooltip="Add to Cart">
                      <img src="`+window.location.origin+`/static/main/images/cart.svg" class="update-cart" data-product="`+productId+`" data-action="add" id="add-img" alt="" width="100%" height="100%">
                      </div>
                      `).insertAfter($(".update-cart").eq(a).parent()),$(".update-cart").eq(a).parent().remove(),$.fn.updateCart(),$.fn.rmvorder()):($(`<a href="javascript:void(0)" class="update-cart" data-product="`+productId+`" data-action="add"><span class="iconify" data-icon="bx:bx-shopping-bag" style=" width: 30px; height: 30px; padding: 5px;color: #FFCC7E; border: 1px solid #FFCC7E; border-radius: 50%; margin-right: 15px; margin-top: 10px;"></span></a>`).insertAfter($(".update-cart").eq(a)),console.log("done"),$(".update-cart").eq(a).remove()))}),$(".cart-count").html(parseFloat($(".cart-count").html())-1),$(parent).parent().parent().remove(),1>$(".shp__cart__wrap").children(".shp__single__product").length&&($(".shopping__btn").remove(),$(".shoping__total").remove(),$(".shp__cart__wrap").append(`<p class="text-center empty-cart-text">Your Cart is empty.</p>`)),$(".total__price span").text(thousands_separators(parseFloat($(".total__price span").text().replace(/,/g,""))-parseFloat($(parent).parent().parent().find(".shp__pro__details").find(".shp__price span").text().replace(/,/g,"")).toFixed(2))),console.log($(".total__price span").text()),$.fn.wishlist(),$.fn.updateCart()}})})},$.fn.rmvorder(),$.fn.rmvwish(),$("#mobile-nav .language-selector").on("click",function(){$(this).find(".iconify").toggleClass("active"),$("#lang-select").toggle()}),$("#mobile-nav .currency-selector").on("click",function(){$(this).find(".iconify").toggleClass("active"),$("#curr-select").toggle()}),$("#desk-nav .language-selector").on("click",function(){$(this).find(".iconify").toggleClass("active"),$("#desk-nav #lang-select").toggle()}),$("#desk-nav .currency-selector").on("click",function(){$(this).find(".iconify").toggleClass("active"),$("#desk-nav #curr-select").toggle()}),$("#desk-sticky-nav .currency-selector").on("click",function(){$(this).find(".iconify").toggleClass("active"),$("#desk-sticky-nav #curr-select").toggle()});function thousands_separators(a){var b=a.toString().split(".");return b[0]=b[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),b.join(".")}$("#mobile-filter-show").on("click",function(){$("#mobile-filter-options").toggleClass("mobile-filter-show"),$("#mobile-filter-options").toggleClass("mobile-filter-hide")}),$(".settings").parent().on("click",function(){$("#advance-filters").toggleClass("hide-advance-filters"),$("#advance-filters").toggleClass("show-advance-filters")}),$(".artist-filters > #artist-filter-show").on("click",function(){$("#artist-filter-options").toggleClass("artist-filter-show"),$("#artist-filter-options").toggleClass("artist-filter-hide")}),$(document).on("show",".accordion",function(a){$(a.target).prev(".accordion-heading").addClass("accordion-opened")}),$(document).on("hide",".accordion",function(a){$(this).find(".accordion-heading").not($(a.target)).removeClass("accordion-opened")}),$(".nav-item a").filter(function(){return this.href==window.location.href}).addClass("active").siblings().removeClass("active"),$(".toggle__menu").on("click",function(){$(".offsetmenu").addClass("offsetmenu__on"),$(".body__overlay").addClass("is-visible")}),$(".offsetmenu__close__btn").on("click",function(){$(".offsetmenu").removeClass("offsetmenu__on"),$(".body__overlay").removeClass("is-visible")}),$(".cart__menu").on("click",function(){$(".shopping__cart").addClass("shopping__cart__on"),$(".body__overlay").addClass("is-visible")}),$(".offsetmenu__close__btn").on("click",function(){$(".shopping__cart").removeClass("shopping__cart__on"),$(".body__overlay").removeClass("is-visible")}),$(".wish__menu").on("click",function(){$(".wishlist__cart").addClass("wishlist__cart__on"),$(".body__overlay").addClass("is-visible")}),$(".offsetmenu__close__btn").on("click",function(){$(".wishlist__cart").removeClass("wishlist__cart__on"),$(".body__overlay").removeClass("is-visible")}),$(".mobile__menuu").on("click",function(){$(".mobile__menu").addClass("mobile__menu__on"),$(".body__overlay2").addClass("is-visible")}),$(".offsetmenu__close__btn").on("click",function(){$(".mobile__menu").removeClass("mobile__menu__on"),$(".body__overlay2").removeClass("is-visible")}),$(".user__menu").on("click",function(){$(".user__cart").addClass("user__cart__on"),$(".body__overlay").addClass("is-visible")}),$(".offsetmenu__close__btn").on("click",function(){$(".user__cart").removeClass("user__cart__on"),$(".body__overlay").removeClass("is-visible")}),$(".filter__menu").on("click",function(){$(".filter__wrap").addClass("filter__menu__on"),$(".body__overlay").addClass("is-visible")}),$(".filter__menu__close__btn").on("click",function(){$(".filter__wrap").removeClass("filter__menu__on"),$(".body__overlay").removeClass("is-visible")}),$(".body__overlay").on("click",function(){$(this).removeClass("is-visible"),$(".offsetmenu").removeClass("offsetmenu__on"),$(".shopping__cart").removeClass("shopping__cart__on"),$(".wishlist__cart").removeClass("wishlist__cart__on"),$(".filter__wrap").removeClass("filter__menu__on"),$(".user__cart").removeClass("user__cart__on")});function getToken(a){let b=null;if(document.cookie&&""!==document.cookie){const c=document.cookie.split(";");for(let d=0;d<c.length;d++){const e=c[d].trim();if(e.substring(0,a.length+1)===a+"="){b=decodeURIComponent(e.substring(a.length+1));break}}}return b}const csrftoken=getToken("csrftoken");function getCookie(a){var b=document.cookie.split(";");for(i=0;i<b.length;i++){var c=b[i].split("=");if(a==c[0].trim())return decodeURIComponent(c[1])}return null}var cart=JSON.parse(getCookie("cart"));cart==null&&(cart={},document.cookie="cart="+JSON.stringify(cart)+";domain=;path=/");var wishlist=JSON.parse(getCookie("wishlist"));wishlist==null&&(wishlist={},document.cookie="wishlist="+JSON.stringify(wishlist)+";domain=;path=/");var currency=JSON.parse(getCookie("currency")),currencySign=JSON.parse(getCookie("currencySign"));currency==null&&(currency="INR",currencySign="\u20B9",document.cookie="currency="+JSON.stringify(currency)+";domain=;path=/",document.cookie="currencySign="+JSON.stringify(currencySign)+";domain=;path=/"),$(".currency-selector p").text(currency),$(".total__price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(currencySign)});var initialSalePrice=[],initialOldPrice=[],salePrice=[],basePrice=[],pricePrice=[],shp_price=[],taxes=[],price=$(".sale_price span"),oldPrice=$(".old_price span"),nPrice=$(".new__price span"),bPrice=$(".base_price"),pPrice=$(".price"),shp_prce=[],wish_price=[];$(".sale_price").each(function(a){initialSalePrice.push($(".sale_price span").eq(a).text())});for(var i=0;i<nPrice.length;i++)salePrice.push($(".new__price span").eq(i).text());for(var i=0;i<bPrice.length;i++)basePrice.push($(".base_price").eq(i).text());for(var i=0;i<pPrice.length;i++)pricePrice.push($(".price").eq(i).text());console.log(initialSalePrice);for(var i=0;i<oldPrice.length;i++)initialOldPrice.push($(".old_price span").eq(i).text());$(".shp__price").each(function(a){shp_price.push($(".non_change_shp_price span").eq(a).text())});function calculate(a,b){fetch(`https://api.exchangerate-api.com/v4/latest/${"INR"}`).then(a=>a.json()).then(c=>{const d=c.rates[a];if($(".wish__price span").each(function(){wish_price.push($(this).text())}),url=window.location.href.split("/"),window.location.pathname==="/artwork-details/"+url[4]+"/"||window.location.pathname==="/personalize-details/"+url[4]+"/"){var e=[];$(".non_change_price span").each(function(){e.push($(this).text())});for(var f=0;f<nPrice.length;f++)console.log(e),$(".new__price span").eq(f).text(thousands_separators((parseFloat($(e)[f])*d).toFixed(2))),$(".new__price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})}$(".sale_price").each(function(a){$(".sale_price span").eq(a).html(thousands_separators((parseFloat($(initialSalePrice)[a].replace(/,/g,""))*d).toFixed(2))),$(".sale_price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})});for(var f=0;f<oldPrice.length;f++)$(".old_price span").eq(f).text(thousands_separators((parseFloat($(initialOldPrice)[f].replace(/,/g,""))*d).toFixed(2))),$(".old_price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)});console.log(d),$(".non_change_shp_price span").each(function(a){console.log($(".non_change_shp_price span").text()),$(".shp__price span").eq(a).text((parseFloat($(".non_change_shp_price span").eq(a).text().replace(/,/g,""))*d).toFixed(2)),console.log($(".shp__price span").eq(a).text()),$(".shp__price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})}),$total_price=0,$(".shp__price span").each(function(a){$total_price+=parseFloat($(".non_change_shp_price span").eq(a).text().replace(/,/g,""))}),console.log($total_price),$(".total__price span").text(thousands_separators(($total_price*d).toFixed(2))),console.log($(".total__price span").text()),$(".total__price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)});for(var f=0;f<wish_price.length;f++)$(".wish__price span").eq(f).text(thousands_separators((parseFloat($(wish_price)[f].replace(/,/g,""))*d).toFixed(2))),$(".wish__price").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)});if("/cart/"===window.location.pathname){var g=0,h=0,j=0;$(".amount").each(function(a){initialSalePrice.push($(this).html()),taxes.push($(".amount1 span").eq(a).html()),g=parseFloat(g)+parseFloat($(taxes)[a].replace(/,/g,"")),console.log(taxes),h=parseFloat(h)+parseFloat($(initialSalePrice)[a].replace(/,/g,""))+parseFloat($(taxes)[a].replace(/,/g,"")),j=parseFloat(j)+parseFloat($(initialSalePrice)[a].replace(/,/g,"")),console.log(h),$(this).html(thousands_separators((parseFloat($(initialSalePrice)[a].replace(/,/g,""))*d).toFixed(2))),$(".total").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})}),$("#amount span").html(thousands_separators((parseFloat(h)*d).toFixed(2))),$(".amount1 span").each(function(a){$(this).html(thousands_separators((parseFloat($(taxes)[a].replace(/,/g,""))*d).toFixed(2))),console.log(this)}),$(".tax span").each(function(){$(this).html(thousands_separators((parseFloat(g)*d).toFixed(2)))}),$("#amount1 span").html(thousands_separators((parseFloat(j)*d).toFixed(2))),$("#amount2 span").html(thousands_separators((parseFloat(h)*d).toFixed(2))),$("#amount").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)}),$("#amount1").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)}),$("#amount2").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)}),$("#discount").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)}),$(".amount1").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)}),$(".tax").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})}if("/confirm-order/"===window.location.pathname||"/thank-you/"===window.location.pathname){var k=0;initialOldPrice.push($("#amount span").html().replace(/,/g,"")),console.log(initialOldPrice),$("#ctax span").each(function(a){taxes.push($(this).html().replace(/,/g,"")),$(this).html(thousands_separators((parseFloat(taxes[a])*d).toFixed(2)))}),$(".amount span").each(function(a){initialSalePrice.push($(this).html()),k=parseFloat(k)+parseFloat($(initialSalePrice)[a].replace(/,/g,"")),console.log(initialSalePrice),console.log(taxes),$(this).text(thousands_separators((parseFloat($(initialSalePrice)[a].replace(/,/g,""))*d).toFixed(2))),$(".amount").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})}),$("#amount span").html(thousands_separators((parseFloat($(initialOldPrice)[0])*d).toFixed(2))),$("#amount").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)}),$("#ctax").contents().each(function(){3==this.nodeType&&$(this).replaceWith(b)})}})}console.log(window.location.pathname.split("/").pop()),calculate(currency,currencySign);var curren=$(".currency"),timer=0;for(i=0;i<curren.length;i++)curren[i].addEventListener("click",function(a){clearInterval(timer),a.preventDefault();var b=this.dataset.curr,c=this.dataset.sign;$(".currency-selector p").text(b),document.cookie="currency="+JSON.stringify(b)+";domain=;path=/",document.cookie="currencySign="+JSON.stringify(c)+";domain=;path=/",timer=setInterval(function(){calculate(b,c)},1e3)});$(".search-form").on("keyup",function(a){13===a.keyCode&&(a.preventDefault(),$(this).parent().parent().submit()),""===$(".search-form").val()&&($(".results").html(""),$(".results").hide()),2<=$(".search-form").val().length&&""!=$(".search-form").val()&&$.ajax({type:"POST",url:window.location.href,headers:{"X-CSRFToken":csrftoken},data:{q:$(".search-form").val(),action:"search"},success:function(a){console.log(a),$(".results").html("");var b=$(".search-form").val(),c=new RegExp(b,"i");$.each(a,function(b,d){-1!=d.fields.search(c)&&$(".results").append(`<a href="/artwork-details/`+a[b].pk+`" style="text-decoration: none"><p class="text-dark">`+a[b].fields.name+`</p></a>`)}),$(".results").show()}})}),$(".mobile-search-form").on("keyup",function(a){13===a.keyCode&&(a.preventDefault(),$(this).parent().parent().submit()),""===$(".mobile-search-form").val()&&($(".results").html(""),$(".results").hide()),2<=$(".mobile-search-form").val().length&&""!=$(".mobile-search-form").val()&&$.ajax({type:"POST",url:window.location.href,headers:{"X-CSRFToken":csrftoken},data:{q:$(".mobile-search-form").val(),action:"search"},success:function(a){console.log(a),$(".results").html("");var b=$(".mobile-search-form").val(),c=new RegExp(b,"i");$.each(a,function(b,d){-1!=d.fields.search(c)&&$(".results").append(`<a href="/artwork-details/`+a[b].pk+`" style="text-decoration: none"><p class="text-dark">`+a[b].fields.name+`</p></a>`)}),$(".results").show()}})}),$("body").on("click",function(){$(".results").children().remove(),$(".results").hide()});var $ul=$(".sidebar-navigation > ul");$ul.find("li a").click(function(a){var b=$(this).parent();0<b.find("ul").length&&(a.preventDefault(),b.hasClass("selected")?(b.removeClass("selected").find("li").removeClass("selected"),b.find("ul").slideUp(400),b.find("a em").removeClass("mdi-flip-v")):(0==b.parents("li.selected").length?($ul.find("li").removeClass("selected"),$ul.find("ul").slideUp(400),$ul.find("li a em").removeClass("mdi-flip-v")):(b.parent().find("li").removeClass("selected"),b.parent().find("> li ul").slideUp(400),b.parent().find("> li a em").removeClass("mdi-flip-v")),b.addClass("selected"),b.find(">ul").slideDown(400),b.find(">a>em").addClass("mdi-flip-v")))}),$(".sidebar-navigation > ul ul").each(function(){if(0<$(this).find(">li>ul").length){var a=$(this).parent().parent().find(">li>a").css("padding-left"),b=parseInt(a),c=b+20;$(this).find(">li>a").css("padding-left",c)}else{var a=$(this).parent().parent().find(">li>a").css("padding-left"),b=parseInt(a),c=b+20;$(this).find(">li>a").css("padding-left",c).parent().addClass("selected--last")}});for(var t=" li > ul ",i=1;10>=i;i++)$(".sidebar-navigation > ul > "+t.repeat(i)).addClass("subMenuColor"+i);var activeLi=$("li.selected");activeLi.length&&opener(activeLi);function opener(a){var b=a.closest("ul");if(b.length)if(a.addClass("selected"),b.addClass("open"),a.find(">a>em").addClass("mdi-flip-v"),b.closest("li").length)opener(b.closest("li"));else return!1}