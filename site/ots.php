<?php
	include_once '../lib/simple_html_dom.php';
	function ots( $url_to_sum , $ratio ) {
		// Create DOM from URL or file
		$html = file_get_html($url_to_sum);

		// Find all text
		$text = '';
		foreach($html->find('p') as $element) {
       			$text .= $element->plaintext . '\n';
		}
		$file = fopen('./txt.txt', 'w');
		fwrite( $file , $text );
		$sum = shell_exec ( 'ots -r ' . $ratio . ' -d en txt.txt');
		fwrite( $file , '' );
		fclose( $file );
		return $sum;
	}
	echo ots($_REQUEST['to_sum'], $_REQUEST['ratio']);
?>
