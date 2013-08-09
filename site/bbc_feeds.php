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
echo json_encode()get_bbc_feeds_with_range($_GET["section"],$_GET["start_date"],$_GET["end_date"]));