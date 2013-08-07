/*****************************************************************************/
/*                        Get JSON response from PHP                         */
/*****************************************************************************/

function getNewsFromAPI(amount, scope, keyword){
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

    // make asynchronous ajax request, calls handle
    ajax(start_time, end_time, keyword);
}

function ajax(start_time, end_time, keyword){
    $.ajax({
        url: 'include.php',
        type: 'GET',
        dataType: 'json',
        data: {start_time: start_time.f('yyyy-MM-dd'), end_time: end_time.f('yyyy-MM-dd'), keyword: keyword, section: ''}, // HOTFIX: ", section: ''", remove if fixed
        success: function(data, textStatus, xhr) {
            // replace JSON date format with JavaScript Date Objects
            $.each(data, function(index, story) {
                 story[2] = new Date(story[2]);
            });

            // call handleNews function of whileaway.js
            handleNews(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('ERROR: ' + errorThrown);
        }
    });
}