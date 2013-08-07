/*****************************************************************************/
/*                          Main JS for whileaway                            */
/*****************************************************************************/

$(document).ready(function(){
    // Make select element equal to width of current option
    // 1. Create hidden span width value of current option
    // 2. Set width of select to width of span
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


    // Change width of input on load, keyup, input and paste
    function inputWidth() {
        $('#number-span').html($('#number').val());
        $('#number').css('width', $('#number-span').width());
    }
    inputWidth();
    $('#number').bind('keyup input paste', inputWidth);

    getNews();
    // onchange of input fields, call getNews()
    $('#number').change(function(){getNews();});
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

         str += '<li><a href="' + link + '">' + headline + '</a> (' + date.f('EE, d MMM yyyy HH:mm') + ')</li>';
    });
    str += '</ol>'
    $('#headlines').html(str);
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
