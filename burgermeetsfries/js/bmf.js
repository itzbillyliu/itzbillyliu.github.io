var BurgerMeetsFries = {
    animatedScroll: function(identifier){
        distance = $(identifier).offset().top;
        $('html, body').animate({
            scrollTop: distance,
        }, 1000);
    },

    bindClicks: function(){
        $('.hero a.button').on('click', function(){
            BurgerMeetsFries.animatedScroll('.body-section.app');
        });
    },

    init: function () {
        BurgerMeetsFries.bindClicks();
    }
};

$(document).ready(function () {
    BurgerMeetsFries.init();
});