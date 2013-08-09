// global variables for currently displayed dates
today = new Date();
startDate = null;
displayedStartDate = new Date();
displayedEndDate = new Date();
// global variable for displayed dates (changes when browser width changes)
displayedDates = 2; 

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
        getNews();
    });
    $('#date').change(function(){
        resizeDate();
        getNews();
    });
});

function getNews(){
    $('.news').html('<img src="img/loading.gif" alt="Loading…" class="loading"/>');

	amount = $('#number').val();
	scope = $('#date option:selected').val();
	section = $('#section option:selected').val();
    // keyword $('#keyword').val()
    keyword = '';

	try {
        keyword = $.trim(keyword);
		validate(amount, scope, section, keyword);
	} catch (e) {
		alert(e); // To-Do: Error handling
		return;
	}

    startDate = new Date();
    switch (scope) {
        case 'days': startDate.setDate(today.getDate()-amount); break;
        case 'weeks': startDate.setDate(today.getDate()-amount*7); break;
        case 'months': startDate.setMonth(today.getMonth()-amount); break;
    }
    // make asynchronous request
    getGuardianNews(startDate, today, section, keyword);

    // get news for first days
    displayedStartDate = new Date(startDate);
    displayedEndDate.setDate(startDate.getDate() + displayedDates);
    getGuardianDailyNews(displayedStartDate, displayedEndDate, section, keyword);
}

function plusDisplayedDates(amount){
    if (displayedEndDate.getDate() + displayedDates > today.getDate()){
        displayedEndDate = today;
        displayedStartDate = displayedEndDate - displayedDates;
    }
}

function minusDisplayedDays(amount) {
    if (displayedStartDate.getDate() + displayedDates > today.getDate()){
        displayedEndDate = today;
        displayedStartDate = displayedEndDate - displayedDates;
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

function resizeSection () {
    option_val = $('#section > option:selected').text();
    $('#section-span').html(option_val);
    $('#section').width($('#section-span').width());
}

function resizeNumber () {
    $('#number-span').html($('#number').val());
    $('#number').css('width', $('#number-span').width());
}

function resizeDate () {
    option_val = $('#date > option:selected').val();
    $('#date-span').html(option_val);
    $('#date').width($('#date-span').width());
}

function validate(amount, scope, section, keyword) {
	// scopes = ['days', 'weeks', 'months'];
	// if (scopes.indexOf(scope) < 0) {
	// 	throw 'Invalid scope';
	// }

	if (isNaN(amount)) {
		throw 'Invalid amount';
	}

    // sections = ['world', 'uk-news', 'football', 'film', 'business', 'politics', 'technology'];
    // if (sections.indexOf(section) < 0) {
    //     throw 'Invalid section';
    // }
}
