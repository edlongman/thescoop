$(document).ready(function() {
    // Fix width of select/input
    $('#section').change(function() {
    	option_val = $('#section > option:selected').text();
    	$('#section-span').html(option_val);
    	$('#section').width($('#section-span').width());
    });

    $('#section').change();

    $('#date').change(function() {
    	option_val = $('#date > option:selected').val();
    	$('#date-span').html(option_val);
    	$('#date').width($('#date-span').width());
    });

    $('#date').change();


    window.onresize = function() {
    	$('#section').change();
    	$('#date').change();
    	inputWidth();
    }

    function inputWidth() {
    	$('#number-span').html($('#number').val());
    	$('#number').css('width', $('#number-span').width());
    }

    inputWidth();

    $('#number').bind('keyup input paste', inputWidth);

    window.onresize = function() {
    	$('#keyword').change();
    	$('#date').change();
    	inputWidth();
    }

    // Fetching and displaying stories
    getNews();

    // onchange of input fields, call getNews()
    $('#number').bind('keyup input paste', function(){getNews();});
    $('#date').change(function(){getNews();});
    $('#section').change(function(){getNews();});
});

function getNews(){
	amount = $('#number').val();
	scope = $('#date option:selected').val();
	section = $('#section option:selected').val();
    // keyword $('#keyword').val()
    keyword = '';

	try {
        keyword = $.trim(keyword);
		validate(amount, scope, section, keyword);

        // make asynchronous request
        getGuardianNews(amount, scope, section, keyword);
	} catch (e) {
		alert(e); // To-Do: Error handling
		return;
	}
}

function handleGuardianNews(news){
	str = '<ol>';
	$.each(news, function(index, story) {
		headline = story[0];
		link = story[1];
		date = story[2];

        str += '<li>';
        str += '<h2 class="headline">' + headline + '</h2>';
		str += '<article>';
        str += '<p><img src="img/loading.gif"/> Loading summary…</p>';
        // str += '<time datetime="' + date.toJSON() + '"> ' + date.f('d MMM') + '</time> // ';
        str += '<a href="' + link + '" class="read-more" target="_blank">Full article</a>';
        str += '</article>';
        str += '</li>';
	});
	str += '</ol>';
	$('.news').html(str);

    initializeLinkListeners();
}

function initializeLinkListeners () {
    var articles = $('.news > ol > li > article');
    articles.hide();

    // display summary on headline click
    $('.headline').click(function() {
        if ($(this).hasClass('active')){
            $('.inactive').removeClass('inactive');
            $('.active').removeClass('active');
            $(this).next('article').slideUp(300);
        } else if ($(this).hasClass('inactive')){
            $('.active').next('article').slideUp(300);
            $('.inactive').removeClass('inactive');
            $('.active').removeClass('active');
            $(this).addClass('active');
            $('.headline').not($(this)).addClass('inactive');
            $(this).next('article').slideDown(300);
        } else {
            $('.headline').not(this).addClass('inactive');
            $(this).addClass('active');

            $(this).next('article').slideDown(300);
        }
        
        if (! $(this).next('article').hasClass('summary--loaded')){
            getSummary($(this));
            $(this).next('article').addClass('summary--loaded');
        }
    });
}

function validate(amount, scope, section, keyword) {
	scopes = ['days', 'weeks', 'months'];
	if (scopes.indexOf(scope) < 0) {
		throw 'Invalid scope';
	}

	if (isNaN(amount)) {
		throw 'Invalid amount';
	}

    sections = ['world', 'uk-news', 'football', 'film', 'business', 'politics'];
    if (sections.indexOf(section) < 0) {
        throw 'Invalid section';
    }
}
