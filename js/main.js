/*----------------------------------------------------
*      input character limit function
*----------------------------------------------------*/

function charLimit(maxLen, thisField) {
    var max = maxLen,
        len = thisField.val().length,
        char = max - len;

    if (len >= max) {
        $(thisField).parent().find('.charsRemain').addClass('limit');
    } else {
        $(thisField).parent().find('.charsRemain').removeClass('limit');
    }

    $(thisField).parent().find('.charsRemain').text(char);
}

/*----------------------------------------------------
*      dynamic window resize function
*----------------------------------------------------*/

function dynamicResizer() {
    if($(window).width() <= 720) {
        $('header > div > nav > ul > li').on('click', function() {
            $(this).children('ul').toggle();
        });
    }
}

$(window).load(function() {
    dynamicResizer();

    var resizeEvent = (function () {
        var timers = {};
        return function (callback, ms, uniqueId) {
            if (!uniqueId) {
                uniqueId = "Don't call this twice without a uniqueId";
            }
            if (timers[uniqueId]) {
                clearTimeout (timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    $(window).resize(function() {
        resizeEvent(function() {
            dynamicResizer();
        }, 250, 'dynamicResize');
    });
});

/*----------------------------------------------------
*      general
*----------------------------------------------------*/

$(document).ready(function() {
    //hide things we don't need to start with
    $('ul.tree > li.closed').children('ul').hide();
    $('aside').find('ul.tree').hide().first().show();
    $('aside').find('nav.controlsNav ul').hide().first().show();
    $('article').find('section').hide().first().show();

    //are we needing to hide subnav items because we're on small screen?
    if($(window).width() <= 720) {
        $('header > div > nav > ul > li > ul').hide();
    }

    //accordion for contexts/templates/files
    $(document).on('click', 'ul.tree > li > nav > h1', function() {
        if($(this).parents('li').last().hasClass('closed')) {
            $(this).parents('li').last().removeClass('closed').addClass('active');
            $(this).parents('nav').siblings('ul').slideDown(200, 'easeOutQuad');
        } else {
            $(this).parents('li').last().addClass('closed').removeClass('active');
            $(this).parents('nav').siblings('ul').slideUp(200, 'easeOutQuad');
        }
    });

    //set char limit on fields
    $('#pageTitle').on('keyup', function() {
        charLimit(70, $(this));
    });

    $('#pageDescription').on('keyup', function() {
        charLimit(160, $(this));
    });

    //tab nav for sidebar
    $('aside > nav.tabNav li a').on('click', function(e) {
        e.preventDefault();
        var tab = $(this).attr('href');
        var nav = tab.replace('#', '.');

        $('aside').find('ul'+tab).show().siblings('ul.tree').hide();
        $('aside').find('ul'+nav).show().siblings('ul').hide();
        $('aside nav.tabNav li a').removeClass('active');
        $(this).addClass('active');
    });

    //tab nav for main article area
    $('#resourceEdit nav.tabNav li a').on('click', function(e) {
        e.preventDefault();
        var tab = $(this).attr('href');

        $('article').find('section'+tab).show().siblings('section').hide();
        $('#resourceEdit nav.tabNav li a').removeClass('active');
        $(this).addClass('active');
    });

    //johns super dropdownatron for the template select
    //TODO - maybe expand this to all selects?
    $('#pageStyle').dropdownatron();

    //on search bar focus show example of type ahead results
    $('.awesomeBar').on({
        focus: function() {
            $(this).siblings('ul').slideDown(200);
        },
        blur:  function() {
            $(this).siblings('ul').slideUp(200);
        }
    });

});
