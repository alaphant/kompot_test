// variables
var $js_set_h = $('.js_set_h'),
    $header_btn = $('.header-btn'),
    $footer = $('.footer'),
    $window = $(window),
    $document = $(document);




var flag = true;

var map, markerIcon = 'img/source/map-pointer-small.png';
var mass_markers = [
    ['Библиотека Botan','ул. Воздвиженская, 9-19', 50.461162, 30.510019, 1],
    ['Honey Bunny','ул. Межигорская, 17',50.467930, 30.513502, 2],
    ['Gara','ул. Воздвиженская, 29A', 50.460063, 30.511865, 3],
    ['Окно во Двор ','бул. Шевченко, 2, 4 подъезд, код 77К, 3 этаж', 50.442779, 30.519291, 4],
    ['АНТИкинотеатр Rockfellow','Андреевский спуск, ул. Боричев Ток, 30', 50.462027, 30.5160095, 5]
];


//function
function initSlider($slider){
    $slider.slick({
        arrows: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 10000,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1
    });
}

function setHeightPage(){
    if($js_set_h.length > 0){
        var window_h = $window.height();
        $js_set_h.css({height: 'auto'});
        var document_h = $document.height();

        if(window_h < document_h){
            $js_set_h.css({height: document_h});
            $footer.addClass('relative');
        }
        else
        {
            $js_set_h.css({height: '100%'});
            $footer.removeClass('relative');
        }
    }
}

function showPopUp($obj_open,$obj_close,$obj_body,$obj_overlay){
    $obj_open.on('click',function(e){
        e.preventDefault();

        setTimeout(function(){
            var window_H = $window.height(),
                obj_body_H;

            if ($window.width() <= 890) {
                obj_body_H = $obj_body.outerHeight()+25;
            }
            else{
                obj_body_H = $obj_body.outerHeight();
            }

            if(window_H <= obj_body_H){
                $obj_body.css({position: 'absolute', top: '70px', marginTop: '0px'});
            }
            else{
                $obj_body.css({position: 'fixed', top: '50%', marginTop: -(obj_body_H/2) });
            }

            $obj_overlay.fadeIn(400, function(){
                $obj_body
                    .css('display', 'block')
                    .animate({opacity: 1}, 200);
            });
        },100);
    });

    $obj_close.on('click', function(){
        $obj_body
            .animate({opacity: 0}, 200, function(){
                $(this).css('display', 'none');
                $obj_overlay.fadeOut(400);
            }
        );
    });
}
//google maps
function initGoogleMap() {
    var mapCenter = new google.maps.LatLng(50.4583445,30.5132426);
    var mapOptions = {
        zoom: 14,
        center: mapCenter,
        disableDefaultUI: true
    };
    //init map
    map = new google.maps.Map(document.getElementById('googlemaps'), mapOptions);

    setMarkers(map);
}
function setMarkers(map) {

    //init infowindow
    var infoBubble = new InfoBubble({
        map: map,
        content: contentString,
        //position: new google.maps.LatLng(0.0, 549.0),
        pixelOffset: new google.maps.Size(130, 120),
        padding: 0,
        maxWidth: 170,
        maxHeight: 240,
        backgroundColor: 'transparent',
        borderRadius: 0,
        shadowStyle: 0,
        arrowStyle: 0,
        arrowSize: 0,
        borderWidth: 1,
        disableAutoPan: false,
        hideCloseButton: true,
        arrowPosition: 50,
        backgroundClassName: 'infowindow'
    });



    for (var i = 0; i < mass_markers.length; i++) {
        var mass_markers_item = mass_markers[i];
        var marker = new google.maps.Marker({
            position: {lat: mass_markers_item[2], lng: mass_markers_item[3]},
            map: map,
            icon: markerIcon,
            title: mass_markers_item[0],
            zIndex: mass_markers_item[4]
        });
        //====================
        var contentString = '<img src="/img/source/map-pointer-big.png" alt="logo">' +
            '<div class="maps-name-partner">' + mass_markers_item[0] + '</div>' +
            '<br>' +
            '<div class="maps-name-address">' + mass_markers_item[1] + '</div>';


        //style infowindow
        (function(marker, i,contentString) {
            google.maps.event.addDomListener(marker, 'click', function () {
                //style infowindow
                $('.infowindow').parent().addClass('parent-infowindow');
                $('.infowindow').parent().parent().css({
                    marginTop: '77px',
                    marginLeft: '0px',
                    zIndex: '500'
                });
                infoBubble.setContent(contentString);
                infoBubble.open(map, marker);
            });
        })(marker, i,contentString);
    }

    google.maps.event.addDomListener(map, 'click', function () {
        infoBubble.close();
    });

}

//END function

$window.resize(function(){
    setHeightPage();
}).resize();

$(document).ready(function () {
    //slider
    if($('.history-slider').length > 0){
        initSlider($('.history-slider'));
    }

    //set page height
    setTimeout(function(){setHeightPage();},100);

    //site menu
    var $site_menu = $('.site-menu');

    $header_btn.on('click',function(e){
        if($header_btn.data('tag')=='menu'){
            e.preventDefault();
            $site_menu.css({display:'block'});
            $js_set_h.addClass('page-content-scroll-lock');

            setTimeout(function(){
                $site_menu.addClass('active');
            },100)
        }
    });
    if($header_btn.data('tag')=='back'){

        $header_btn.attr('onclick', 'history.go(-1); return false;')
    }

    $('.close-menu').on('click',function(){
        $site_menu.removeClass('active');
        $js_set_h.removeClass('page-content-scroll-lock');
        setTimeout(function(){
            $site_menu.css({display:'none'});
        },400)

    });

    //vimeo
    $('#vimeo').load(function () {
        var iframe = $('#vimeo')[0];
        var $player = $f(iframe);
        //vimeo btn events
        $header_btn.on('click',function(e){
            e.preventDefault();
            if($('#vimeo').length > 0)
            {
                $player.api('pause');
            }
        });

        $('.close-menu').on('click', function(){
            //pause video
            if($('#vimeo').length > 0) {
                $player.api('play');
            }
        });
    });

    if($('#googlemaps').length > 0){
        initGoogleMap();
    }


    //# home page anim central block
    $('.home-slider-item .home-slider-title-link').on('mouseenter',function(){
        $(this).removeClass('hvr-ripple-out');
        $(this).addClass('hvr-ripple-in');
    });

    $('.home-slider-item .home-slider-title-link').on('mouseleave',function(){
        $(this).removeClass('hvr-ripple-in');
        $(this).addClass('hvr-ripple-out');
    });


    //#shop page validation
    //mask phone
    $('.order-phone').inputmask("mask", {"mask": "+38 (999) 999-99-99"});
    //for phone add own rule validation
    $.validator.addMethod('phoneUA', function(phone_number, element) {
        phone_number = phone_number.replace(/\s+/g, '');
        return this.optional(element) || phone_number.match(/^\+38\s?\(\d{3}\)\s?\d{3}\-\d{2}\-\d{2}$/);
    }, 'Невірний номер');
    //validation
    $('#order-form').validate(
        {   errorPlacement: function(error,element) {
            return true;
            },
            rules: {
                ordername: {required: true},
                orderphone: {required: true, phoneUA: true},
                orderemail: {required: true, email: true},
                orderdelivery: {required: true},
                orderpayment: {required: true}
            },
            submitHandler: function (form) {
                //alert('a');
                $('#order-form').triggerHandler('submit_order');
                return false;
            }
        });
});

var  PageLoading;

PageLoading = (function() {
    function PageLoading() {
        var img = document.createElement('img');
        img.src = "../img/source/preloader.gif?p" + new Date().getTime();
        $(img).load(function(){
            $('.spinner').css({backgroundImage: "url("+img.src+")"});
        });


        this.$loader = $('#pageLoading');
        $(window).on('load', (function(){
            var $hidePreloader = this;
            return setTimeout(function(){$hidePreloader.hide()},1300);


        }).bind(this));
        $(window).on('unload', (function() {
            return this.show();
        }).bind(this));
    }
    PageLoading.prototype.hide = function() {
        return TweenMax.to(this.$loader, 1, {
            opacity: 0,
            onComplete: (function() {
                $('.spinner').css({backgroundImage: "none"});

                return this.$loader.css('zIndex', -2);
            }).bind(this)
        });
    };


    PageLoading.prototype.show = function() {
        this.$loader.css('zIndex', 9999);


        return TweenMax.to(this.$loader, 1, {
            opacity: 1
        });
    };
    return PageLoading;

})();

new PageLoading();


