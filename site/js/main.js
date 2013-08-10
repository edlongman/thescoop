$(document).ready(function(){
	// Resize select and input
	resizeSection();
	resizeNumber();
	resizeDate();

	$(window).resize(function() {
		resizeSection();
		resizeNumber();
		resizeDate();
	});

	// Fetching and displaying stories
	getNews();

	// onchange of input fields
	$('#section').change(function(){
		resizeSection();
		getNews();
	});
	$('#number').bind('keyup input paste', function(){
		resizeNumber();
        if ($(this).val() != ''){
            getNews();
        }

		var first_option = $('#date option:first-child').text();
		var last_letter = first_option.substr(first_option.length - 1);

		if (last_letter == 's' && $(this).val() == 1) {
			$('#date option').each(function() {
				var removed_s = $(this).text().slice(0, -1);
				$(this).text($(this).text().slice(0, -1));
			})
		}
		else if (last_letter != 's' && $(this).val() != 1) {
			$('#date option').each(function() {
				old_text = $(this).text();
				$(this).text(old_text + 's');
			})
		}
	});
	$('#date').change(function(){
		resizeDate();
		getNews();
	});
});

function getNews(){
	$('.news').html('<img src="img/loading.gif">');

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
        ajax.abort(); // using global variable containing current ajax request
		$('.news').html('<p class="error">Please assure your input is correct (' + e + ')</p>')
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
		str += '<div class="summary--content"><img src="img/loading.gif"></div>';
		// str += '<time datetime="' + date.toJSON() + '"> ' + date.f('d MMM') + '</time> // ';
		str += '<a href="' + link + '" class="read-more" target="_blank" tabindex="2">Full article</a>';
		str += '</article>';
		str += '</li>';
	});
	str += '</ol>';
	$('.news').html(str);

	initializeLinkListeners();
}

function initializeLinkListeners() {
	var articles = $('.headline').next('article');
	articles.hide();

	$('.headline').click(function() {
		var headline = $(this);
		var article = headline.next('article');

		article.slideToggle({
			duration: 400,
			easing: 'easeInOutCirc'
		});

		articles.not(article).slideUp({
			duration: 400,
			easing: 'easeInOutCirc'
		});

		if (! headline.hasClass('loaded')) {
			getSummary(headline);
			headline.addClass('loaded');
		}
	})
}

function resizeSection() {
	option_val = $('#section > option:selected').text();
	$('#section-span').html(option_val);
	$('#section').width($('#section-span').width() + 3);
}

function resizeNumber() {
	$('#number-span').html($('#number').val());
	$('#number').css('width', $('#number-span').width() + 3);
}

function resizeDate() {
	option_val = $('#date > option:selected').val();
	$('#date-span').html(option_val);
	$('#date').width($('#date-span').width() + 3);
}

function validate(amount, scope, section, keyword) {
	// scopes = ['days', 'weeks', 'months'];
	// if (scopes.indexOf(scope) < 0) {
	// 	throw 'Invalid scope';
	// }

	if (isNaN(amount)) {
		throw 'Invalid amount of ' + $('#date option:selected').val();
	}

	// sections = ['world', 'uk-news', 'football', 'film', 'business', 'politics', 'technology'];
	// if (sections.indexOf(section) < 0) {
	//     throw 'Invalid section';
	// }
}
