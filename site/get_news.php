<?php
	include_once "../lib/db_feeds.php";
	include_once "../lib/guardian_feeds.php";
	include_once '../lib/simple_html_dom.php';
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
	if(!array_key_exists("site",$_GET)){
		$_GET["site"]="bbc";
	}
	if(!array_key_exists("keyword",$_GET)){
		$_GET["keyword"]="";
	}
	if($_GET["site"]=="guardian"){
		echo json_encode(get_news($_GET['start_date'],$_GET['end_date'],$_GET['section'],$_GET['keyword']));
	}
	else{
		echo json_encode(get_feeds_with_range($_GET["section"],$_GET["start_date"],$_GET["end_date"],$_GET["site"]));
	}
?>