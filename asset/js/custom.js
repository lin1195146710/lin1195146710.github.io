! function($) {
    "use strict";

    /* ---------------------------------------------- /*
    * Preloader
    /* ---------------------------------------------- */

    $(window).on('load', function() {
        $('#preloader').addClass("loaded");
    });

    /* ---------------------------------------------- /*
    * Section Scroll - Navbar
    /* ---------------------------------------------- */

    $('.navbar-nav a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');

        if ($('.navbar').hasClass('active')) {
            $('.navbar').removeClass('active')
            $('.ham').removeClass('active')
        }

        event.preventDefault();
    });

    $('.navbar-toggler').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        });
        $("body").toggleClass('aside-open');
        $(".ham").toggleClass('active');
        $("body, html").toggleClass('overflow-hidden');
    });

    /* ---------------------------------------------- /*
    * Scroll Spy - init
    /* ---------------------------------------------- */

    $("#navbarCollapse").scrollspy({
        offset: 20
    });

    /* ---------------------------------------------- /*
    * Magnific Popup - Init
    /* ---------------------------------------------- */

    $('.simple-ajax-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        zoom: {
            enabled: true,

            duration: 300,
            easing: 'ease-in-out',

            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    /* ---------------------------------------------- /*
    * Swipper - Init
    /* ---------------------------------------------- */

    // Testimony init

    var swipertest = new Swiper('.swiper-testimony', {
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    /* ---------------------------------------------- /*
    * AnimateOnScroll - Init
    /* ---------------------------------------------- */

    var wow = new WOW({
        boxClass: 'wow', //动画元素的CSS类（默认类名wow）
        animateClass: 'animated', //动画CSS类 （默认类名animated）
        offset: 0, //距离可视区域多少开始执行动画（默认值为0）
        mobile: true, // 是否在移动设备上执行动画 （默认是true）
        live: true, //异步加载的内容是否有效（默认是true）
        callback: function(box) {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
        },
        scrollContainer: null, // optional scroll container selector, otherwise use window,
        resetAnimation: true, //结束时重置动画（默认是true）
    });
    wow.init();

    /* ---------------------------------------------- /*
    * Initialize shuffle plugin
    /* ---------------------------------------------- */

    var $portfolioContainer = $('.list-items-container');

    $('#filter li').on('click', function(e) {
        e.preventDefault();

        $('#filter li').removeClass('active');
        $(this).addClass('active');

        var group = $(this).attr('data-group');
        var groupName = $(this).attr('data-group');

        $portfolioContainer.shuffle('shuffle', groupName);
    });


    /* ---------------------------------------------- /*
    * Parallax - Init
    /* ---------------------------------------------- */

    $(".js-height-full").height($(window).height());

    $(window).resize(function() {
        $(".js-height-full").height($(window).height());
    });

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('#home').css({ 'background-attachment': 'scroll' });
    } else {
        $('#home').parallax('50%', -0.3);
    }

    if ($('.section-home').length) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
            $('.swiper-slide').css({ 'background-attachment': 'scroll' });
        } else {
            $('.swiper-slide').parallax('50%', -0.3);
        }
    }

}(window.jQuery);