<?php
error_reporting(-1);
function get_url_output($url){
	$curl=curl_init($url);
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	return curl_exec($curl);
}



if(array_key_exists("test",$_GET)){
	function test_get_curl_output(){
		$result=get_url_output("http://example.com/");
		if($result){
			echo "result fetched";
			echo $result;
		}
		else{
			echo "error";
			trigger_error(curl_error());
		}
	}
	test_get_curl_output();
}
?>