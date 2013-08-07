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

    // Form submit
    $('#form').on('submit', function(e){
        e.preventDefault();

        $('#form button').html('<img src="img/loading.gif" alt="Loading…"/>');

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
        getNews(amount, scope, keyword);
    });
});

function handleNews(news){
    $('#form button').html('Go');

    str = '<ul>';
    for (var i = 0; i < news[0].length; i++) {
        // str += '<li>' + news[0][i] + ': <a href="' + news[1][i] + '">' + news[1][i] + '</a></li>';
        str += '<li>' + news[0][i] + '</li>';
    };
    str += '</ul>'
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