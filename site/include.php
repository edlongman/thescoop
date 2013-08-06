<?php
  include_once 'util.php';
  function get_news($start_time, $end_time,$section,$term) { //returns a multidimentional array of titles and URLs of news between time frames
     header("Content-type: text/json");
     $section = urlencode($section);
     $term = urlencode($term);
     $json = get_url_output('http://content.guardianapis.com/search?q='. $term .'&section='. $section .'&from-date='. $start_time .'&to-date='. $end_time .'&order-by=relevance&format=json');
     $json_obj = JSON_decode($json,true);
     //print_r($json_obj["response"]["results"][0]["webTitle"]);
     $titles_array = array();
     $url_array= array();
     for($i=0;$i<count($json_obj["response"]["results"]);$i++){
     	$titles_array[] = $json_obj["response"]["results"][$i]["webTitle"];
     	$url_array[] = $json_obj["response"]["results"][$i]["webUrl"];
     }
     $ret_me = array($titles_array , $url_array);
     return($ret_me);
  }
  echo json_encode(get_news($_REQUEST['start_time'],$_REQUEST['end_time'],$_REQUEST['section'],$_REQUEST['keyword']));
?>
