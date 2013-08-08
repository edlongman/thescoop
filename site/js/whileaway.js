/*****************************************************************************/
/*                          Main JS for whileaway                            */
/*****************************************************************************/

$(document).ready(function(){
    // Form UI fixes

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

    // prevent page reload on enter
    $('#form').submit(function(event) {
        event.preventDefault();
    });

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
	str = '<ol class="articles">';
	$.each(news, function(index, story) {
		headline = story[0];
		link = story[1];
		date = story[2];
		// summary = story[3];

		// str += '<li>' + headline + ' (<a href="' + link + '">more…</a>, ' + date.f('d MMM yyyy HH:mm') + ')</li>';
        str += '<li>';
		str += '<a href="#" class="headline">' + headline + '</a>';
        str += '<article><p><strong>No summary found.</strong></p>';
        str += '<time datetime="' + date.toJSON() + '"> ' + date.f('d MMM') + '</time> // ';
        str += '<a href="' + link + '" class="read-more" target="_blank">Read more</a>';
        str += '</article></li>';
	});
	str += '</ol>';
	$('#headlines').html(str);

    initializeLinkListeners();
}

function initializeLinkListeners () {
    var articles = $('.articles li article');
    articles.hide();

    // display summary on headline click
    $('.headline').click(function(e){
        e.preventDefault();
        $(this).next('article').find('p').html(getSummary($(this).next('article').find('a.read-more').attr('href')));
        $(this).next('article').toggle(300);
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
