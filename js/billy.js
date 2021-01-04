var bliu = {
    clickHandlers: function(){
        $('.js-contact').click(function(){
            if($('.submenu').is(':visible'))
                bliu.collapseMenu();

            $('html, body').animate({
                scrollTop: $(document).height(),
            }, 1000);
        });
        $('.js-expand-menu').click(function(){
            bliu.expandMenu();
        });
        $('.js-collapse-menu').off('click').click(function(){
            bliu.collapseMenu();
        });
    },

    collapseMenu: function(){
        $('.submenu').fadeOut();
    },

    expandMenu: function(){
        $('.submenu').fadeIn();
    },

    filterPortfolio: function(type){
        var el = '.portfolio-items .item';
        if(type != 'all'){
            el += '.' + type;
            $('.inner-container.intro').hide();
            $('.inner-container.intro').siblings('.portfolio').show();
            $('.inner-container.intro').siblings('.portfolio').children('h2').text(type);
        }

        $('.portfolio-items .item').hide();
        $(el).each(function(i){
            $(this).delay(100 * i).fadeIn(200);
        });
    },

    renderPortfolioItems: function(){
        if(typeof(portfolioItems) != 'undefined'){
            var pfHtml = '';

            for(var idx=0; idx < portfolioItems.length; idx++){
                var category = portfolioItems[idx].category;
                var color = portfolioItems[idx].color;
                var clsName = portfolioItems[idx].name;
                var fullName = portfolioItems[idx].fullName;
                var itemUrl = portfolioItems[idx].detailsUrl;
                var summary = portfolioItems[idx].goal;
                var isOdd = (idx%2 == 0);
                var fontColor;


                switch(color){
                    case 'grey':
                    case 'orange':
                    case 'pink':
                    case 'white':
                        fontColor = 'text-black';
                        break;
                    default:
                        fontColor = 'text-white';
                }

                pfHtml += '\
                    <div class="container portfolio ' + color + ' ' + (isOdd ? 'odd' : 'even') + '">\
                        <div class="full section portfolio-item ' + category + ' ' + clsName + '">\
                            <div class="image"></div>\
                            <div class="text">\
                                <h1 class="margin-0 text-uppercase title">'
                                    + fullName + '\
                                </h1>\
                                <h3 class="margin-0 text-uppercase type">'
                                    + category + '\
                                </h3>\
                                <p class="padding-bottom-2rem summary">'
                                    + summary + '\
                                </p>\
                                <a class="hollow round ' + (color == 'white' ? '' : color) + ' large button text-uppercase" href="' + itemUrl + '">&emsp;read the full story&emsp;</a>\
                            </div>\
                        </div>\
                    </div>';
            }
            $('#index').find('.section.top').after(pfHtml);
        }
    },

    init: function(){
        if($('.menu.mobile').is(':visible')){
            isMobile = true;
        }
        bliu.clickHandlers();

        if(window.location.pathname === '/' || window.location.pathname.indexOf('index.html') > 0) {
            console.log('Welcome to Billy Liu Designs!');
            bliu.renderPortfolioItems();
        }
    }
}

$(document).ready(function(){
    bliu.init();
});