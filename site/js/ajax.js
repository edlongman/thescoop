/*****************************************************************************/
/*                        Get JSON response from PHP                         */
/*****************************************************************************/

function getGuardianNews(start_time, section, keyword){
    $.ajax({
        url: 'guardian_feeds.php',
        type: 'GET',
        dataType: 'json',
        data: {start_time: start_time.f('yyyy-MM-dd'), end_time: new Date().f('yyyy-MM-dd'), section: section, keyword: keyword},
        success: function(data, textStatus, xhr) {
            // replace JSON date format with JavaScript Date Objects
            $.each(data, function(index, story) {
                 story[2] = new Date(story[2]);
            });

            // call handleGuardianNews function of whileaway.js
            handleGuardianNews(data);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log('ERROR: ' + errorThrown);
        }
    });
}
