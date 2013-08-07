<?php
	include_once '../lib/util.php';
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
		return($ret_me);
	}
	function daily_news2($start_time, $end_time) {
		//echo strtotime($end_time) - strtotime($start_time) / 86400;
		$num_years = implode( '', array_slice( str_split( $end_time ), 0, 4 ) ) + 0 - implode( '', array_slice( str_split( $end_time ), 0, 4 ) ) + 0;
		for($i=0; $i<=$num_years; $i++) {
			$year = implode( '', array_slice(str_split($start_time),0,4) ) + $i;
			$num_months = implode( '', array_slice(str_split($end_time),5,2) ) + 0 - implode( '', array_slice(str_split($start_time),5,2) ) + 0;
			for($q=0; $q <= $num_months; $q++) {
				$month = implode( '', array_slice(str_split($start_time),5,2) ) + $q;
				$num_days = implode( '', array_slice(str_split($end_time),8,2) ) + 0 -  implode( '', array_slice(str_split($start_time),8,2) ) + 0;
				for($w=0; $w <= $num_days; $w++) {
					$day =  implode( '', array_slice(str_split($start_time),8,2) ) + $w;
					$date = two_char_format($year) . '-' . two_char_format($month) . '-' . two_char_format($day);
					//return( $date . ' ');
					return( $num_days);
					//$daily_news[] = get_news($date,$date,$_REQUEST['section'],$_REQUEST['keyword']);
				}
			}
		}
		return($daily_news);
	}
	function daily_news($start_time, $end_time) {
		$start_date = strtotime($start_time);
		$end_date = strtotime($end_time);
		$num = ($end_date - $start_date) / (60*60*24);
		//echo $num;
		if($num <= 200) {
			for($i=0;$i <= $num;$i++) {
				$daily_news[] = get_news(date('Y-m-d',$start_date + ($i*60*60*24)),date('Y-m-d',$start_date + ($i*60*60*24)),$_REQUEST['section'],$_REQUEST['keyword']);
				//$daily_news[] = date('Y-m-d',$start_date + ($i*60*60*24));
			}
		}
		else {
			$daily_news = 'STOP BEING A $Up3r H4x0r';
		}
		return($daily_news);
	}
	function two_char_format($number) { //if $number is 1 char long, return it with a zero infront, else do nothing.
		if(count(str_split($number))==1) {
			return('0' . $number);
		}
		else {
			return($number);
		}
	}
	echo json_encode(get_news($_REQUEST['start_time'],$_REQUEST['end_time'],$_REQUEST['section'],$_REQUEST['keyword']));
	echo json_encode(daily_news($_REQUEST['start_time'],$_REQUEST['end_time']));
?>
