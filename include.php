<?php
  include_once util.php;
  function get_news($start_time, $end_time) { //returns a multidimentional array of titles and URLs of news between time frames
     $json = get_url_output('http://content.guardianapis.com/search?from-date='. $start_time . '&to-date=' . $end_time . '&order-by=relevance&format=json');
     $json_obj = JSON_decode($json);
     $titles_array = $json_obj->response->results->webTitle;
     $url_array = $json_obj->response->results->webUrl;
     return($titles_array, $url_array);
  }
  echo get_news($_REQUEST['start_time'],$_REQUEST['end_time'])[0,1];
?>
