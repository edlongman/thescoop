/*****************************************************************************/
/*                          Main JS for whileaway                            */
/*****************************************************************************/

// Form UI fixes

$('#section').change(function() {
	option_val = $('#section > option:selected').text();
	$('#section-span').html(option_val);
	$('#section').width($('#section-span').width());
});

$('#section').change();


$('#date').change(function() {
	option_val = $('#date > option:selected').text();
	$('#date-span').html(option_val);
	$('#date').width($('#date-span').width());
});

$('#date').change();


function inputWidth() {
	$('#number-span').html($('#number').val());
	$('#number').css('width', $('#number-span').width());
}

inputWidth();

$('#number').bind('keyup input paste', inputWidth);

window.onresize = function() {
	$('#section').change();
	$('#date').change();
	inputWidth();
}




// Fetching and displaying stories

getNews();

// onchange of input fields, call getNews()
$('#number').bind('keyup input paste', function(){getNews();});
$('#date').change(function(){getNews();});
$('#section').change(function(){getNews();});

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
        getGuardianNews(amount, scope, keyword);
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
		// summary = story[3];

		// str += '<li>' + headline + ' (<a href="' + link + '">more…</a>, ' + date.f('d MMM yyyy HH:mm') + ')</li>';
		str += '<li><a href="' + link + '">' + headline + '</a></li>';
	});
	str += '</ol>';
	$('#headlines').html(str);
}

function validate(amount, scope, section, keyword) {
	scopes = ['days', 'weeks', 'months'];
	if (scopes.indexOf(scope) < 0) {
		throw 'Invalid scope';
	}

	if (isNaN(amount)) {
		throw 'Invalid amount';
	}
}
