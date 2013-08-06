/*****************************************************************************/
/*                        Get JSON response from PHP                         */
/*****************************************************************************/

//defining global attributes
today = new Date(); // dates are entered relatively, today is needed
start_time = new Date();
end_time = today;
categories;

function getJSON(){
  // get amount of days/months user has been away
  // amount = $('#idOfInput').val();

  // get scope (days/months)
  // amount = $('#idOfSelect option:selected').val();

  setStartTime(amount, scope);

  // get categories
  // categories = $('#whatever').whatever();

  json = ajax();

  // doSomething with JSON, or not

  return json;
}

function setStartTime(amount, scope){
  switch scope {
    case 'days': start_time.setDate(today.getDate()-amount); break;
    case 'months': start_time.setMonth(today.getMonth()-amount); break;
  }
}

function ajax(){
    $.ajax({
      url: '/path/to/file',
      type: 'GET',
      dataType: 'json',
      data: {start_time: start_time, end_time: end_time, categories: categories},
      success: function(data, textStatus, xhr) {
        return data;
      },
      error: function(xhr, textStatus, errorThrown) {
        log('ERROR: ' + errorThrown + '; ' + xhr);
      }
    });
}