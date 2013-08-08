<?php
date_default_timezone_set('GMT');
function get_bbc_feeds_with_range($section,$start_date,$end_date){
	require_once "../config.php";
	$section=preg_replace("/[`;'\"]/","",$section);
	$start_date=preg_replace("/[`;'\"]/","",$start_date);
	$end_date=preg_replace("/[`;'\"]/","",$end_date);
	$db=mysqli_connect("localhost",$mysql_user,$mysql_passwd,$mysql_db);
	$query = "SELECT `url`,`title`,`description`,`large_thumb`,`small_thumb`,SUM(`points`) AS `points_sum` 
			FROM `bbcstories` WHERE `section`='$section' AND $start_date<=`date_added`<=$end_date 
			GROUP BY `url` ORDER BY `points_sum` DESC LIMIT 0,10";
	$results=$db->query($query);
	$num_articles=mysqli_num_rows($results);
	$articles=array();
	while($row=mysqli_fetch_assoc($results)){
		$article_array=$row;
		unset($article_array["points_sum"]);
		$article_array["description"]=urldecode($article_array["description"]);
		$articles[]=$article_array;
	}
	return json_encode($articles,JSON_PRETTY_PRINT);
}