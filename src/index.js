import "./style.less";
import $ from "jquery";

$(document).ready(function(){
    //.header-content-top opacity appearance, when element is outside of #header
    $(window).on('scroll', function() {
        let scroll = $(window).scrollTop(),
        headerNav = $('.header-content-top'),
        headerHeight = ($('#header').height() - 110);

        if (scroll > headerHeight) {
            headerNav.css('background-color', 'rgba(43,48,58,1)');
        } else {
            headerNav.css('background-color', 'rgba(43,48,58,0)');
        }
    });

    //smooth page scroll to anchor
    $("#nav-bar").on("click","a", function (event) {
        event.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top - 100;
        $('body,html').animate({scrollTop: top}, 500);
    });
});

