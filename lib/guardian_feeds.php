<?php
	include_once '../lib/util.php';
	include_once '../lib/simple_html_dom.php';
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
			$date_array[] = $json_obj["response"]["results"][$i]["webPublicationDate"];
		}
		for($i=0;$i<count($json_obj["response"]["results"]);$i++){
			$ret_me[] = array($titles_array[$i] , $url_array[$i] , $date_array[$i]);
		}
		if(isset($ret_me)) {
			return($ret_me);
		}
		else {
			return(null);
		}
	}

	function daily_news($start_time, $end_time) { //Returns news for each day between start_time and end_time. Caps at 200 days of news.
                $start_date = strtotime($start_time);//changes start time to seconds
                $end_date = strtotime($end_time);//^*end time*^
                $num = ($end_date - $start_date) / (60*60*24);//calculates number of days between dates
                //echo $num;
                if($num <= 200) {//level cap to stop overflow
                        for($i=0;$i <= $num;$i++) { //for each day between the dates, fetch news and add it to $daily_news in array form.
                                $daily_news[] = get_news(date('Y-m-d',$start_date + ($i*60*60*24)),date('Y-m-d',$start_date + ($i*60*60*24)),$_REQUEST['section'],$_REQUEST['keyword']);
                        }
                }
                else {
                        $daily_news = 'STOP BEING A $Up3r H4x0r';
                }
                return($daily_news);
        }
        function two_char_format($number) { //if $number is 1 char long, return it with a zero infront, else return $number.
                if(count(str_split($number))==1) {
                        return('0' . $number);
                }
                else {
                        return($number);
                }
        }