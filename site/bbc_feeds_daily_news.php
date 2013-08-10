<?php
include_once "../lib/bbc_feeds.php";
$current_date=date("Y-m-d");
if(!array_key_exists("start_date",$_GET)||date("Y-m-d",strtotime($_GET["start_date"]))!=$_GET["start_date"]){
	$_GET["start_date"]="2013-08-07";
}
if(!array_key_exists("end_date",$_GET)||date("Y-m-d",strtotime($_GET["end_date"]))!=$_GET["end_date"]){
	$_GET["end_date"]=$current_date;
}
if(!array_key_exists("section",$_GET)){
	$_GET["section"]="uk-news";
}
$per_date_array=array();
$end_date=strtotime($_GET["end_date"]);
$start_date=strtotime($_GET["start_date"]);
$seconds_in_a_day=60*60*24;
$date_difference=$end_date/$seconds_in_a_day-$start_date/$seconds_in_a_day;
for($i=0;$i<$date_difference;$i++){
	$selection_date=date("Y-m-d",$start_date+$i*$seconds_in_a_day);
	$per_date_array[]=get_bbc_feeds_with_range($_GET["section"],$selection_date,$selection_date);
}
echo json_encode($per_date_array);