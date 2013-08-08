<?php
date_default_timezone_set('GMT');
include_once "../config.php";
$db=mysqli_connect("localhost",$mysql_user,$mysql_passwd,$mysql_db);
$current_date=date("Y-m-d");
if(!array_key_exists("start_date",$_GET)||date("Y-m-d",strtotime($_GET["start_date"]))==$_["start_date"]){
	$_GET["start_date"]="2013-08-07";
}
if(!array_key_exists("end_date",$_GET)||date("Y-m-d",strtotime($_GET["end_date"]))==$_GET["end_date"]){
	$_GET["end_date"]=$current_date;
}
if(!array_key_exists("section",$_GET)){
	$_GET["section"]="news";
}
$start_date=date("Y-m-d",strtotime($_GET["start_date"]));
$end_date=date("Y-m-d",strtotime($_GET["end_date"]));
$section=$_GET["section"];
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
echo json_encode($articles,JSON_PRETTY_PRINT);