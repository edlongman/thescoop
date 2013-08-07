/*****************************************************************************/
/*                          Main JS for whileaway                            */
/*****************************************************************************/

$(document).ready(function(){
    // Form UI fixes

    $('#keyword').change(function() {
    	option_val = $('#keyword > option:selected').val();
    	$('#keyword-span').html(option_val);
    	$('#keyword').width($('#keyword-span').width());
    });

    $('#keyword').change();


    $('#date').change(function() {
    	option_val = $('#date > option:selected').val();
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
    	$('#keyword').change();
    	$('#date').change();
    	inputWidth();
    }

    // Fetching and displaying stories
    getNews();

    // onchange of input fields, call getNews()
    $('#number').bind('keyup input paste', function(){getNews();});
    $('#date').change(function(){getNews();});
    $('#keyword').change(function(){getNews();});
});

function getNews(){
	amount = $('#number').val();
	scope = $('#date option:selected').val();
	keyword = $('#keyword option:selected').val();
	if (keyword == 'news') {
		keyword = '';
	};

	try {
		validate(amount, scope, keyword);
	} catch (e) {
		alert(e);
		return;
	}

	// make asynchronous request
	getNewsFromAPI(amount, scope, keyword);
}

function handleNews(news){
	$('#form button').html('Go');

	str = '<ol>';
	$.each(news, function(index, story) {
		headline = story[0];
		link = story[1];
		date = story[2];
		// summary = story[3];

		// str += '<li>' + headline + ' (<a href="' + link + '">more…</a>, ' + date.f('d MMM yyyy HH:mm') + ')</li>';
        str += '<li class="headline">';
		str += '<a href="#">' + headline + '</a>';
        str += '<div><p>Insert summary here</p><span class="read-more-link"><a href="' + link + '">Read more…</a></span></div>'
        str += '</li>  '
	});
	str += '</ol>';
	$('#headlines').html(str);

    // display summary on headline click
    $('.headline a').click(function(e){
        $(this).next('div').toggle(300);
    });
}

function validate(amount, scope, keyword) {
	scopes = ['days', 'weeks', 'months'];
	if (scopes.indexOf(scope) < 0) {
		throw 'Invalid scope';
	}

	if (isNaN(amount)) {
		throw 'Invalid amount';
	}

	$.trim(keyword);
}
