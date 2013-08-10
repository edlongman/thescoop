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

function initializeTryAgain () {
    $('.try-again').click(function(event) {
        event.preventDefault();

        if ($(this).hasClass('try-again--news')) {
            getNews();
        } else if ($(this).hasClass('try-again--summary')) {
            getSummary($(this).parent().parent().parent().prev('h2'));
        }
    });
}

function resizeSection() {
	option_val = $('#section > option:selected').text();
	$('#section-span').html(option_val);
	$('#section').width($('#section-span').width() + 3);
}

function resizeNumber() {
	$('#number-span').html($('#number').val());
	$('#number').css('width', $('#number-span').width() + 3);

	var font_size = $('body').css('font-size');

	if (font_size == '16px') {
		$('#number').css('height', '42px');
	}

	else if (font_size == '14px') {
		$('#number').css('height', '36px');
	}

	else if (font_size == '12px') {
		$('#number').css('height', '30px');
	}
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

/**********************************AJAX***************************************/
// global variable containing the current AJAX request, needed if it must be aborted
ajax = null;

function getGuardianNews(amount, scope, section, keyword){
    today = new Date(); // dates are entered relatively, today is needed

    start_time = new Date();
    end_time = today;
    //section = section;

    // get correct start time
    switch (scope) {
        case 'days': start_time.setDate(today.getDate()-amount); break;
        case 'weeks': start_time.setDate(today.getDate()-amount*7); break;
        case 'months': start_time.setMonth(today.getMonth()-amount); break;
    }

    // make asynchronous ajax request, calls handle
    ajaxGuardian(start_time, end_time, section, keyword);
}

function ajaxGuardian(start_time, end_time, section, keyword){
    ajax = $.ajax({
        url: 'guardian_feeds.php',
        type: 'GET',
        dataType: 'json',
        data: {start_time: start_time.f('yyyy-MM-dd'), end_time: end_time.f('yyyy-MM-dd'), section: section, keyword: keyword},
        success: function(data, textStatus, xhr) {
            // replace JSON date format with JavaScript Date Objects
            $.each(data, function(index, story) {
                story[2] = new Date(story[2]);
            });

            // call handleGuardianNews function of main.js
            handleGuardianNews(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            $('.news').html('<p class="error">Couldn’t scoop the news for you&hellip; <a href="#" title="Try again" class="try-again try-again--news">Try again</a></p>');
            initializeTryAgain();
            console.log('ERROR: ' + errorThrown);
        }
    });
}

function getSummary (object) {
    ajax = $.ajax({
        url: 'ots.php',
        type: 'GET',
        dataType: 'html',
        data: {to_sum: $(object).next('article').find('a.read-more').attr('href'), ratio: 10},
        success: function(data, textStatus, xhr) {
            data = $('<div/>').html(data).text();
            if (data == 'null') {
                data = 'No summary found.'
            }
            $(object).next('article').find('.summary--content').slideUp(200, function(){
                $(object).next('article').find('.summary--content').html('<p>' + data + '</p>');
                $(object).next('article').find('.summary--content').find('a').attr('target', '_blank');
                object.addClass('loaded');
            }).slideDown(300);
        },
        error: function(xhr, textStatus, errorThrown) {
            $(object).next('article').find('.summary--content').html('<p class="error">Couldn’t get summary&hellip;<a href="#" title="Try again" class="try-again try-again--summary">Try again</a></p>');
            initializeTryAgain();
            console.log('ERROR in getSummary');
            console.log(xhr);
        }
    });
    
}