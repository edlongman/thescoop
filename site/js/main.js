// global variable containing the current AJAX request, needed if it must be aborted
ajax = $.ajax();
// global variables for currently displayed dates
today = new Date();
startDate = null;
lastDisplayedDate = null;
// global variable for displayed dates (changes when browser width changes)
amountAddDates = 2; 

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
	$('#news').html('<img src="img/loading.gif" alt="Loading" class="loading">');

	amount = $('#number').val();
	scope = $('#date option:selected').val();
	section = $('#section option:selected').val();
	// keyword $('#keyword').val()
	keyword = '';

	try {
		//keyword = $.trim(keyword);
		validate(amount, scope, section, keyword);

		// make asynchronous request
		getGuardianNews(amount, scope, section, keyword);
	} catch (e) {
        ajax.abort(); // using global variable containing current ajax request
		$('#news').html('<p class="error">Please assure your input is correct (' + e + ')</p>')
		return;
	}
}

function getDailyNews() {
    $('.breakdown').append('<img src="img/loading.gif" alt="Loading" class="loading">')

    section = $('#section option:selected').val();
    // keyword $('#keyword').val()
    keyword = '';

    startDate = new Date();
    // get correct start date
    switch ($('#date option:selected').val()) {
        case 'days': startDate.setDate(today.getDate()-amount); break;
        case 'weeks': startDate.setDate(today.getDate()-amount*7); break;
        case 'months': startDate.setDate(today.getMonth()-amount); break;
    }

    if (lastDisplayedDate == null){
        lastDisplayedDate = new Date(startDate);
    }

    if (callAndEncreaseDailyGuardian(section, keyword) == null){
        $('#breakdown').append('<p class="no-more-days">No more days to display.</p>')
    }
} 

function callAndEncreaseDailyGuardian(section, keyword){
    if (lastDisplayedDate.getDate() + amountAddDates+1 <= today.getDate()){
        increasedDate = new Date(); increasedDate.setDate(lastDisplayedDate.getDate() + amountAddDates);
        var startDate = new Date();
        startDate.setDate(lastDisplayedDate.getDate()+1)
        getGuardianDailyNews(startDate, increasedDate, section, keyword);
        lastDisplayedDate.setDate(increasedDate.getDate() + 1);
        return this;
    } else if (lastDisplayedDate.getDate() < today.getDate()){
        getGuardianDailyNews(lastDisplayedDate, today, section, keyword);
        lastDisplayedDate = today;
        return this;
    } else {
        return null;
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

	$('#news').slideUp(300, function(){
        $('#news').html(str);
        $('#news article').hide();
        $('#news').slideDown(300, function(){
            initializeLinkListeners();
        });
    });

    getDailyNews();
}

function handleGuardianDailyNews(news){
    for (i = 0; i < news.length; i++) {
        day = news[i];
        str = '<div class="news">';
        date = new Date();
        date.setDate(lastDisplayedDate.getDate() - (news.length - i));
        str += 'Date: ' + date.f('d MMM');
        str += '<ol>';
        $.each(news[i], function(index, story) {
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
        str += '</div>'
        $('#breakdown').append(str);
    }
    
    initializeLinkListeners();
    initializeScollListener();
}

function initializeLinkListeners() {
    $('.headline').unbind();

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

function initializeScollListener () {
    $(window).scroll(function() {
        if (document.documentElement.clientHeight + $(document).scrollTop() >= document.body.offsetHeight )
        { 
            callAndEncreaseDailyGuardian();
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
            $('#news').html('<p class="error">Couldn’t scoop the news for you&hellip; <a href="#" title="Try again" class="try-again try-again--news">Try again</a></p>');
            initializeTryAgain();
            console.log('ERROR: ' + errorThrown);
        }
    });
}

function getGuardianDailyNews(start_time, end_time, section, keyword){
    ajax = $.ajax({
        url: 'guardian_feeds_daily_news.php',
        type: 'GET',
        dataType: 'json',
        data: {start_time: start_time.f('yyyy-MM-dd'), end_time: end_time.f('yyyy-MM-dd'), section: section, keyword: keyword},
        success: function(data, textStatus, xhr) {
            // replace JSON date format with JavaScript Date Objects
            $.each(data, function(index, day) {
                 $.each(day, function(index, story) {
                     story[2] = new Date(story[2]);
                 });
            });

            // call handleGuardianDailyNews function of main.js
            handleGuardianDailyNews(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            $('#breakdown').append('<p class="error">Couldn’t scoop the news for you&hellip; <a href="#" title="Try again" class="try-again try-again--news">Try again</a></p>');
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