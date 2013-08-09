<?php
	include_once '../lib/simple_html_dom.php';
	include_once '../lib/util.php';
	error_reporting(E_ALL ^ E_NOTICE);
	function article_parse( $article_url ) {
		$html = file_get_html($article_url);
		// Find all text inside the first div with id=article-body-blocks
		$text = 'null';
		$error = 0;
		try { //parse articles
			$text .= $html->find('div[id=article-body-blocks]',0)->innertext;
			//$error = 0;
		}
		catch(Exception $e) {
			$error++;
		}
		try { //parse videos
                        $text .= $html->find('p[itemprop=description]',0)->innertext;
               	        //$error = 0;
               	}
               	catch(Exception $e) {
               	        $error++;
               	}
                try {
                	$text .= $html->find('div[class=flexible-content-body]',0)->innertext;
                        //$error = 0;
                }
                catch(Exception $e) {
                        $error++;
                }
		$text = str_replace('<p>','',$text);
		$text = str_replace('</p>','',$text);
		$text = str_replace('Photograph:','',$text);
		if($error <= 2) {
			return($text);
		}
		else {
			return(null);
		}
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
?>
