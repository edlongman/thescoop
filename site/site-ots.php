<?php
	function site_ots($url,$ratio) {
		$html = file_get_contents($url);
		return(ots($html,$ratio));
	}
        function ots($text , $ratio) {
                if($text != null) {
                        $file = fopen('./txt.txt', 'w');
                        fwrite( $file , $text );
                        $ratio = intval($ratio);
                        $sum = shell_exec ( 'ots -r ' . $ratio . ' -d en txt.txt');
                        fwrite( $file , '' );
                        fclose( $file );
                        //$sum = str_replace('.','. ',$sum);
                        //$sum = htmlspecialchars($sum);
                }
                else {
                        $sum = 'null';
                }
                return($sum);
        }
	echo site_ots($_REQUEST['url'],$_REQUEST['ratio']);
?>
