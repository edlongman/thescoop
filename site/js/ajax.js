/*****************************************************************************/
/*                        Get JSON response from PHP                         */
/*****************************************************************************/

function getGuardianNews(start_time, end_time, section, keyword){
    $.ajax({
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
            console.log('ERROR: ' + errorThrown);
        }
    });
}

function getGuardianDailyNews (start_time, end_time, section, keyword) {
    $.ajax({
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

        // call handleGuardianNews function of main.js
        handleGuardianDailyNews(data);
      },
      error: function(xhr, textStatus, errorThrown) {
        alert('Error in daily');
      }
    });
    
}

function getSummary (object) {
    $.ajax({
        url: 'ots.php',
        type: 'GET',
        dataType: 'html',
        data: {to_sum: $(object).next('article').find('a.read-more').attr('href'), ratio: 10},
        success: function(data, textStatus, xhr) {
            data = $('<div/>').html(data).text();
            if (data == 'null') {
                data = 'No summary found.'
            }
            $(object).next('article').find('.summary--content').slideUp(300, function(){
                $(object).next('article').find('.summary--content').html('<p>' + data + '</p>');
            }).slideDown(300);
        },
        error: function(xhr, textStatus, errorThrown) {
            $(object).next('article').find('.summary--content').html('No summary found.');
            console.log('ERROR: ' + xhr);
        }
    });
    
}