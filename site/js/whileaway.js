/*****************************************************************************/
/*                          Main JS for whileaway                            */
/*****************************************************************************/

$(document).ready(function(){
    $('#form').on('submit', function(e){
        e.preventDefault();

        amount = $('#number').val();
        scope = $('#date option:selected').val();
        keyword = $('#keyword option:selected').val();

        // function getNews from get.js
        response = getNews(amount, scope, keyword);

        //test
        test(response);
    });
});

function test(response){
    str = '<ul>';
    for (var i = 0; i < response[0].length; i++) {
        str += '<li>' + response[0][i] + ': <a href="' + response[1][i] + '">' + response[1][i] + '</a></li>';
    };
    str += '</ul>'
    $('#test').html(str);
}