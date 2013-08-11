<?php
	include_once '../lib/simple_html_dom.php';
	include_once '../lib/util.php';
	include_once '../config.php';
	error_reporting(E_ALL ^ E_NOTICE);
	function strip_tag($html_dom,$tag) {
		$elements = $html_dom->find($tag);
		foreach ($elements as $element) {
			$element->outertext = '';
		}
	}
	function article_parse( $article_url ) {
		$url = 'http://www.readability.com/api/content/v1/parser?token='. $GLOBALS["readability_api_key"] .'&url=';
		$output = file_get_contents($url . urlencode($article_url));
		//$output = file_get_html($url . $article_url)->save();
		$json = json_decode($output);
		$text = $json->content;
		$text = strip_tags($text,'<a><strong><em><i><span><b><s>');
		$text = str_replace('Photograph:','',$text);
		return($text);
		}
	function ots($text , $ratio) {
		if($text != null) {
			$file = fopen('./txt.txt', 'w');
			fwrite( $file , $text );
			$sum = shell_exec ( 'ots -r ' . $ratio . ' -d en txt.txt');
			fwrite( $file , '' );
			fclose( $file );
			$sum = str_replace('.','. ',$sum);
			$sum = htmlspecialchars($sum);
		}
		else {
			$sum = 'null';
		}
		return($sum);
	}
	echo ots( article_parse($_REQUEST['to_sum']) , $_REQUEST['ratio']);
	//echo article_parse($_REQUEST['to_sum']);
?>
