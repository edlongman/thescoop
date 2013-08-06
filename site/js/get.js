/*****************************************************************************/
/*                        Get JSON response from PHP                         */
/*****************************************************************************/

//defining global attributes
today = new Date(); // dates are entered relatively, today is needed
start_time = new Date();
end_time = today;
categories = '';

function getJSON(){
    // get amount of days/months user has been away
    // amount = $('#idOfInput').val();
    amount = 1;

    // get scope (days/months)
    // scope = $('#idOfSelect option:selected').val();
    scope = 'days';

    setStartTime(amount, scope);

    // get categories
    // categories = $('#whatever').whatever();
    categories = '';

    json = ajax();
    // place for further processing
    return json;
}

function setStartTime(amount, scope){
    switch (scope) {
        case 'days': start_time.setDate(today.getDate()-amount); break;
        case 'months': start_time.setMonth(today.getMonth()-amount); break;
    }
}

function ajax(){
    data = [];
    $.ajax({
        url: '../include.php',
        type: 'GET',
        dataType: 'json',
        data: {start_time: start_time.toJSON().substring(0,10), end_time: end_time.toJSON().substring(0,10), categories: categories},
        async: false,
        success: function(response, textStatus, xhr) {
            data = response;
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('ERROR: ' + errorThrown + '; ' + xhr);
        }
    });
    return data;
}