<?php
	include_once '../lib/simple_html_dom.php';
	include_once '../lib/util.php';
	function article_parse( $article_url ) {
		$html = file_get_html($article_url);
		// Find all <p> text
		$text = '';
		//foreach($html->find('div[id=article-body-blocks]') as $element) {
		//	$text .= $element->innertext;
		$text = $html->find('div[id=article-body-blocks]',0)->innertext;
		//}
		return $text;
	}
	function ots ($text , $ratio) {
		$file = fopen('./txt.txt', 'w');
		fwrite( $file , $text );
		$sum = shell_exec ( 'ots -r ' . $ratio . ' -d en txt.txt');
		fwrite( $file , '' );
		fclose( $file );
		return $sum;
	}
	echo ots( article_parse($_REQUEST['to_sum']) , $_REQUEST['ratio']);
?>
