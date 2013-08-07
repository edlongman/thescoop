/*****************************************************************************/
/*                        Get JSON response from PHP                         */
/*****************************************************************************/

function getNews(amount, scope, keyword){
    today = new Date(); // dates are entered relatively, today is needed

    start_time = new Date();
    end_time = today;
    //keyword = keyword;

    // get correct start time
    switch (scope) {
        case 'days': start_time.setDate(today.getDate()-amount); break;
        case 'weeks': start_time.setDate(today.getDate()-amount*7); break;
        case 'months': start_time.setMonth(today.getMonth()-amount); break;
    }

    json = ajax(start_time, end_time, keyword);
    // place for further processing
    return json;
}

function ajax(start_time, end_time, keyword){
    data = [];

    $.ajax({
        url: 'include.php',
        type: 'GET',
        dataType: 'json',
        data: {start_time: start_time.toJSON().substring(0,10), end_time: end_time.toJSON().substring(0,10), keyword: keyword},
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