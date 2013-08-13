// ajax variable to store latest ajax request if it needs to be aborted
ajax = null;

$(document).ready(function() {
    ajax = $.ajax();

	var section_cookie = $.cookie('section');
    if (section_cookie != undefined) {
	    $('select[name="section"]').val(section_cookie);
	}

	var number_cookie = $.cookie('number');
	if (number_cookie != undefined) {
		$('input[name="number"]').val(number_cookie);
	}

	var date_cookie = $.cookie('date');
	if (date_cookie != undefined) {
	    $('select[name="date"]').val(date_cookie);
	}

	resizeSection();
	resizeNumber();
	resizeDate();

	$(window).resize(function() {
		resizeSection();
		resizeNumber();
		resizeDate();
	});

	getNews();

	$('select[name="section"]').change(function() {
		resizeSection();
		getNews();

		$.cookie('section', $(this).val()), { expires: 7 };
	});

	$('input[name="number"]').bind('input paste', function() {
		resizeNumber();
		if ($(this).val() != ''){
			getNews();
		}

		$.cookie('number', $(this).val()), { expires: 7 };

		// Change days to day if value is 1 etc.

		var first_option = $('select[name="date"] option:first-child').text();
		var last_letter = first_option.substr(first_option.length - 1);

		if (last_letter == 's' && $(this).val() == 1) {
			$('select[name="date"] option').each(function() {
				var removed_s = $(this).text().slice(0, -1);
				$(this).text($(this).text().slice(0, -1));
			})
		}
		else if (last_letter != 's' && $(this).val() != 1) {
			$('select[name="date"] option').each(function() {
				old_text = $(this).text();
				$(this).text(old_text + 's');
			})
		}

	});

	$('select[name="date"]').change(function(){
		resizeDate();
		getNews();
		$.cookie('date', $(this).val()), { expires: 7 };
	});
});

$(document).ajaxComplete(function() {
	$('.news ul li:odd').css('background-color', '#f7f7f7');
})


// Get headlines

function getNews(){
	$('.news').html('<div class="loading"><img src="img/loading.gif"></div>');

	amount = $('input[name="number"]').val();
	scope = $('select[name="date"] option:selected').val();
	section = $('select[name="section"] option:selected').val();
	// keyword $('#keyword').val()
	keyword = '';

	try {
		keyword = $.trim(keyword);
		validate(amount, scope, section, keyword);

        // make asynchronous request
        if (window.location.href.split('/').pop().match('^bbc.html')){
            getBBCNews(amount, scope, section, keyword);
        } else {
            getGuardianNews(amount, scope, section, keyword);
        }
	} catch (e) {
		ajax.abort(); // using global variable containing current ajax request
		$('.news').html('<p class="error">Please assure your input is correct (' + e + ')</p>')
		return;
	}
}


// Loading headlines to page

function handleGuardianNews(news){
	var tabindex_count = 4;

	str = '<ul>';
	$.each(news, function(index, story) {
		headline = story[0];
		link = story[1];
		date = story[2];

		str += '<li>';
		str += '<h2 class="headline" tabindex="' + tabindex_count + '"><div class="inner">' + headline + '</div></h2>';
		str += '<article>';
		str += '<div class="inner">';
		str += '<div class="summary--content"><img src="img/loading.gif"></div>';
		// str += '<time datetime="' + date.toJSON() + '"> ' + date.f('d MMM') + '</time> // ';
		str += '<a href="' + link + '" class="read-more" tabindex="2">Full article</a>';
		str += '</div>'
		str += '</article>';
		str += '</li>';

		tabindex_count += 1;
	});
	str += '</ul>';
	$('.news').html(str).hide();
	$('.news').slideDown(600, function() {
		initializeLinkListeners();
	});
	$('.news article').hide();
}

function handleBBCNews(news){
    str = '<ul>';
    $.each(news, function(index, story) {
        link = story['url'];
        headline = story['title'];
        summary = story['description'];
        largeThumbnail = story['large_thumb'];
        smallThumbnail = story['small_thumb'];

        str += '<li>';
        str += '<div class="inner">'
        str += '<h2 class="headline">' + headline + '</h2>';
        str += '<article>';
        str += '<div class="summary--content"><p>' + summary + '</p></div>';
        // str += '<time datetime="' + date.toJSON() + '"> ' + date.f('d MMM') + '</time> // ';
        str += '<a href="' + link + '" class="read-more" target="_blank" tabindex="2">Full article</a>';
        str += '</article>';
        str += '</div>'
    });
    str += '</ul>';
    $('.news').html(str).hide();
    $('.news').slideDown(600, function() {
        initializeLinkListenersBBC();
    });
    $('.news article').hide();
}


// On headline click...

function initializeLinkListeners() {
	var articles = $('.headline').next('article');
	articles.hide();

	$('.headline').bind('click keydown', 'return', function() {
		var headline = $(this);
		var article = headline.next('article');

		$('.headline').not(headline).removeClass('active');
		
		if (headline.hasClass('active')) {
			headline.removeClass('active');
		}
		else {
			headline.addClass('active');
		}

		article.slideToggle(300);
		articles.not(article).slideUp(300);

		if (! headline.hasClass('loaded')) {
			getSummary(headline);
			headline.addClass('loaded');
		}
	});
}

function initializeLinkListenersBBC(){
    var articles = $('.headline').next('article');
    articles.hide();

    $('.headline').click(function() {
        var headline = $(this);
        var article = headline.next('article');

        article.slideToggle(300);
        articles.not(article).slideUp(300);
    });
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


// Resize functions

function resizeSection() {
	option_val = $('select[name="section"] > option:selected').text();
	$('.form-span').html(option_val);
	$('select[name="section"]').width($('.form-span').width());
}

function resizeNumber() {
	$('.form-span').html($('input[name="number"]').val());
	$('input[name="number"]').css('width', $('.form-span').width() + 2);

	// var font_size = $('body').css('font-size');

	// if (font_size == '16px') {
	// 	$('input[name="number"]').css('height', '51px');
	// }
	// else if (font_size == '14px') {
	// 	$('input[name="number"]').css('height', '45.5px');
	// }
	// else if (font_size == '12px') {
	// 	$('input[name="number"]').css('height', '39px');
	// }
}

function resizeDate() {
	option_val = $('select[name="date"] > option:selected').val();
	$('.form-span').html(option_val);
	$('select[name="date"]').width($('.form-span').width() + 2);
}


// Form validation

function validate(amount, scope, section, keyword) {
	// scopes = ['days', 'weeks', 'months'];
	// if (scopes.indexOf(scope) < 0) {
	// 	throw 'Invalid scope';
	// }

	if (isNaN(amount)) {
		throw 'Invalid amount of ' + $('select[name="date"] option:selected').val();
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

function getBBCNews(amount, scope, section){
    today = new Date(); // dates are entered relatively, today is needed

    start_date = new Date();
    end_date = today;
    //section = section;

    // get correct start time
    switch (scope) {
        case 'days': start_date.setDate(today.getDate()-amount); break;
        case 'weeks': start_date.setDate(today.getDate()-amount*7); break;
        case 'months': start_date.setMonth(today.getMonth()-amount); break;
    }

    // make asynchronous ajax request, calls handle
    ajaxBBC(start_date, end_date, section);
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

function ajaxBBC(start_date, end_time, section){
    ajax = $.ajax({
        url: 'bbc_feeds.php',
        type: 'GET',
        dataType: 'json',
        data: {start_date: start_date.f('yyyy-MM-dd'), end_date: end_date.f('yyyy-MM-dd'), section: section},
        success: function(data, textStatus, xhr) {
            // call handleBBCNews function
            handleBBCNews(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            $('.news').html('<p class="error">Couldn’t scoop the news for you&hellip; <a href="#" itle="Try again" class="try-again try-again--news">Try again</a></p>');
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
			$(object).next('article').find('.summary--content').slideUp(400, function(){
                $(object).next('article').find('.summary--content').html('<p>' + data + '</p>');
                $(object).next('article').find('.summary--content').slideDown(400);
            });
			$(object).next('article').find('.summary--content').find('a').attr('target', '_blank');
			object.addClass('loaded');
		},
		error: function(xhr, textStatus, errorThrown) {
			$(object).next('article').find('.summary--content').html('<p class="error">Couldn’t get summary&hellip;<a href="#" title="Try again" class="try-again try-again--summary">Try again</a></p>');
			initializeTryAgain();
			console.log('ERROR in getSummary');
			console.log(xhr);
		}
	});
	
}