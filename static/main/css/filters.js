if ($('#id_category').val() != "") {
        value = $('#id_category').find('option:selected').val();
        $('#art_categories').val(value).change()
        if ($('#cat' + value).attr('data-id') == value) {

            $.each($('#cat' + value + ' option'), function (key, value) {
                $('.art_subcategories').append(value)

            })
        }
    }
    $('#art_categories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_category').val(value).change()
        $('#id_subcategory').val("").change()
        $('#submit_cat').click()

    })

    $('#mobile_categories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_categories').val(value).change()
        $('#id_subcatgory').val("").change()
        $('#submit_cat').click()
    })

    $('#mobile_art_categories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_category').val(value).change()
        $('#id_subcategory').val("").change()
        $('#submit_cat').click()

    })

    if ($('#id_categories').val() != "") {
        value = $('#id_categories').find('option:selected').val();
        $('#categories').val(value).change()
        $('#mobile_categories').val(value)
        console.log($('#cat' + value).attr('data-id'))
        if ($('#cat' + value).attr('data-id') == value) {

            $.each($('#cat' + value + ' option'), function (key, value) {
                $('.subcategories').append(value)
            })

        }
        $('.subcategories').val($('#id_subcatgory').find('option:selected').val()).change()

    }
    $('#categories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_categories').val(value).change()
        $('#id_subcatgory').val("").change()
        $('#submit_cat').click()

    });

    if ($('#id_orientation').val() != "") {
        value = $('#id_orientation').find('option:selected').val();
        $('#orientation').val(value).change()
        $('#mobile_orientation').val(value).change()
    }
    $('#orientation').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_orientation').val(value).change()
        $('#submit_cat').click()

    });

    $('#mobile_orientation').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log('orientation')
        var value = $(this).find('option:selected').val();
        $('#id_orientation').val(value).change()
        $('#submit_cat').click()

    });

if ($('#id_mediumi').val() != "") {
        value = $('#id_mediumi').val();
        $('#medium').val(value).change()
        $('#mobile_medium').val(value)


    }
    $('#medium').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $('#medium').val();
        $('#id_mediumi').val(value)

        $('#submit_cat').click()
    });

    $('#mobile_medium').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $('#mobile_medium').val();
        $('#id_mediumi').val(value)

        $('#submit_cat').click()
    });

    if ($('#id_o').val() != "") {
        value = $('#id_o').find('option:selected').val();
        $('#sort-art').val(value).change()
        $('#mobile_sort-art').val(value).change()

    }
    $('#sort-art').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_o').val(value).change()

        $('#submit_cat').click()
    });

    $('#mobile_sort-art').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var value = $(this).find('option:selected').val();
        $('#id_o').val(value).change()

        $('#submit_cat').click()
    });

    if ($('#id_subcatgory').val() != "") {
        value = $('#id_subcatgory').find('option:selected').val();
        $('#subcategories').val(value).change()
        $('#mobile_subcategories').val(value).change()

    }
    $('#mobile_subcategories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#grid-view-overlay').show();
        var value = $(this).find('option:selected').val();
        $('#id_subcatgory').val(value).change()

        $('#submit_cat').click()
    })

    $('#subcategories').on('change', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $('#grid-view-overlay').show();
        var value = $(this).find('option:selected').val();
        $('#id_subcatgory').val(value).change()

        $('#submit_cat').click()
    })

$('#sizes').on('change', function(){
 sessionStorage.setItem("size", $(this).val());

let data = sessionStorage.getItem('size')


if(data == 'small'){
$('#grid-view').html("")
for(i=0;i<small.length;i++){
$('#grid-view').append(
`
<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
${small[i]}
</div>
`
)
}
$('#grid-view').masonry('destroy');
var grid = $('#grid-view').masonry({itemSelector: '.grid-item',percentPosition: true});$(grid).imagesLoaded().progress(function () {$(grid).masonry('layout')})
}
if(data == 'medium'){
$('#grid-view').html("")
for(i=0;i<medium.length;i++){
$('#grid-view').append(
`
<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
${medium[i]}
</div>
`
)
}
$('#grid-view').masonry('destroy');
var grid = $('#grid-view').masonry({itemSelector: '.grid-item',percentPosition: true});$(grid).imagesLoaded().progress(function () {$(grid).masonry('layout')})
}
if(data == 'large'){
$('#grid-view').html("")
for(i=0;i<large.length;i++){
$('#grid-view').append(
`
<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
${large[i]}
</div>
`
)
}
$('#grid-view').masonry('destroy');
var grid = $('#grid-view').masonry({itemSelector: '.grid-item',percentPosition: true});$(grid).imagesLoaded().progress(function () {$(grid).masonry('layout')})
}
});
let data = sessionStorage.getItem('size')

small = []
medium = []
large = []
if(data){
$('.grid-item').each(function(i){
  var size = $('h6').eq(i).html().split(' X ');
  if(size.length == 2){
  var size1 = size[0].split('\"')
  var size2 = size[1].split('\"')
  var sqinch = parseFloat(size1[0])*parseFloat(size2[0])
  console.log(sqinch)
  if(sqinch <= 144){
  small.push($('.grid-item').eq(i).html())
  }
if( sqinch > 144 && sqinch <= 576){
medium.push($('.grid-item').eq(i).html())
}

if(sqinch > 576){
large.push($('.grid-item').eq(i).html())
}
  }
else{
var size3 = size[0].split('\"')
  var size4 = size[1].split('\"')
  var size5 = size[2].split('\"')

  if(size3[0] > size4[0] && size3[0] > size5[0]){
  if(size3[0] <= 12){
small.push($('.grid-item').eq(i).html())
}
if(12 < size3[0] < 24){
medium.push($('.grid-item').eq(i).html())
}
if(size3[0] > 24 ){
large.push($('.grid-item').eq(i).html())
}
}

  if(size4[0] > size3[0] && size4[0] > size5[0]){
  if(size4[0] <= 12){
small.push($('.grid-item').eq(i).html())
}
if(12 < size4[0] < 24){
medium.push($('.grid-item').eq(i).html())
}
if(size4[0] > 24 ){
large.push($('.grid-item').eq(i).html())
}
}

  if(size5[0] > size3[0] && size5[0] > size4[0]){
  if(size5[0] <= 12){
small.push($('.grid-item').eq(i).html())
}
if(12 < size5[0] < 24){
medium.push($('.grid-item').eq(i).html())
}
if(size5[0] > 24 ){
large.push($('.grid-item').eq(i).html())
}
}


}
})
}
if(data == 'small'){
$('#sizes').val('small').change()
$('#grid-view').html("")
for(i=0;i<small.length;i++){
$('#grid-view').append(
`
<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
${small[i]}
</div>
`
)
}
}
if(data == 'medium'){
$('#sizes').val('medium').change()
$('#grid-view').html("")
for(i=0;i<medium.length;i++){
$('#grid-view').append(
`
<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
${medium[i]}
</div>
`
)
}
}
if(data == 'large'){
$('#sizes').val('large').change()
$('#grid-view').html("")
for(i=0;i<large.length;i++){
$('#grid-view').append(
`
<div class="col-md-4 col-sm-12 col-xs-12 grid-item" id="single-art">
${large[i]}
</div>
`
)
}
}

$('#filter_cat').on('click', function () {
        $('#submit_cat').click()
    })

