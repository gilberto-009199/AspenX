$(window).load(function () {


    "use strict";

    /* *****************************************************************
     * ENABLE SMOOTH SCROLL
     * ************************************************************** */

    $('.btn-link,.nav-wrapper .main-nav li a,.nav-wrapper .side-nav li a').smoothScroll({offset: -50, speed: 1200});


    /* *****************************************************************
     * SCROLL TOP
     * ************************************************************** */

    $(window).scroll(function () {
        if ($(window).scrollTop() > ($('#home').height()) + 50) {
            $('.scroll-to-top').fadeIn(200);
        } else {
            $('.scroll-to-top').fadeOut(200);
        }
    });

    $('.scroll-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
    });


    /* *****************************************************************
     * INTRO SLIDER
     * ************************************************************** */

    $(".hero-slider").flexslider({
        directionNav: true,
        controlNav: false,
        prevText: "<i class='ion-ios-arrow-left'></i>",
        nextText: "<i class='ion-ios-arrow-right'></i>"
    });


    /* *****************************************************************
     * TESTIMONIAL SLIDER INIT
     * ************************************************************** */

    $("#testimonial-slider").owlCarousel({
        navigation: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
    });


    /* *****************************************************************
     * SCREEN SLIDER
     * ************************************************************** */

    $("#screen-slider").owlCarousel({
        item: 4,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsMobile: [767, 1]
    });


    /* *****************************************************************
     * NAVBAR INIT
     * ************************************************************** */

    $(".button-collapse").sideNav();


    /* *****************************************************************
     * TYPED INIT
     * ************************************************************** */

    $(".type").typed({
        strings: ["Sweet", "Modern", "Beautiful", "Elegant", "Cool", "Extraordinary", "Impressive"],
        typeSpeed: 200,
        backDelay: 1500,
        loop: true,
        loopCount: false
    });


    /* *****************************************************************
     * GOOGLE MAP INIT
     * ************************************************************** */

    initMap();

    function initMap() {
    }


    /* *****************************************************************
     * GOOGLE MAP SIZE FIX
     * ************************************************************** */

    if ($(window).width() > 767) {
        var height = $('.address-block').outerHeight();
        $('.map-block').outerHeight(height);
    }


    /* *****************************************************************
     * WOW PLUGIN INIT
     * ************************************************************** */

    var wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: false
            }
    );
    wow.init();


    /* *****************************************************************
     * COUNTER INIT
     * ************************************************************** */

    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });


    /* *****************************************************************
     * APP SHOWCASE GALLERY INIT
     * ************************************************************** */

    var showcase = (function () {

        var $el = $('#img-wrapper'),
                $device = $el.find('.feature-device'),
                $trigger = $device.children('a:first'),
                $screens = $el.find('.feature-grid > a'),
                $screenImg = $device.find('.screen'),
                $screenTitle = $device.find('.ac-title'),
                $body = $('body');

        function init() {
            $trigger.on('click', showGrid);
            $screens.on('click', function () {
                showScreen($(this));
                return false;
            });
        }

        function showGrid() {
            $el.addClass('feature-gridview');
            $body.off('click').on('click', function () {
                showScreen();
            });
            return false;
        }

        function showScreen($screen) {
            $el.removeClass('feature-gridview');
            if ($screen) {
                $screenImg.attr('src', $screen.find('img').attr('src'));
                $('.features-section-box i').removeClass('red-text');
                var box_num = $screen.find('img').attr('data-num');
                $('.features-section-box.' + box_num + ' i').addClass('red-text');
                $screenTitle.text($screen.find('span').text());
            }
        }

        return {init: init};

    })();

    $(function () {
        showcase.init();
    });


    /* *****************************************************************
     * MODAL INIT
     * ************************************************************** */

    var ModalEffects = (function () {

        function init() {

            [].slice.call(document.querySelectorAll('.md-trigger')).forEach(function (el, i) {
                var modal = document.querySelector('#' + el.getAttribute('data-modal')),
                        close = modal.querySelector('.md-close');

                function removeModal(hasPerspective) {
                    classie.remove(modal, 'md-show');
                    if (hasPerspective) {
                        classie.remove(document.documentElement, 'md-perspective');
                    }
                }

                function removeModalHandler() {
                    removeModal(classie.has(el, 'md-setperspective'));
                }

                $(el).on('click', function () {
                    classie.add(modal, 'md-show');
                    if (classie.has(el, 'md-setperspective')) {
                        setTimeout(function () {
                            classie.add(document.documentElement, 'md-perspective');
                        }, 25);
                    }
                });

                $(close).on('click', function (ev) {
                    ev.stopPropagation();
                    removeModalHandler();
                });

            });
        }

        return {init: init};

    })();

    $(function () {
        ModalEffects.init();
    });

    /* *****************************************************************
     * FORM VALIDATION
     * ************************************************************** */

    $("#contactForm").validate({
        rules: {
            fullname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            fullname: {
                required: "Por favor, preencha seu nome"
            },
            email: "Endereço de E-mail Inválido",
            message: "Por favor, preencha uma mensagem"
        },
        submitHandler: function () {
            // Add your ajax form processing here.
        }
    });

    $("#subscribeForm").validate({
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            email: "Endereço de e-mail inválido"
        },
        submitHandler: function () {
            // Add your ajax form processing here.
        }
    });


    /* *****************************************************************
     * PRELOADER
     * ************************************************************** */

    $('.preloader').fadeOut('slow');


});