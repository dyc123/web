<?  
session_start(); 
function random($len) 
{ 
$srcstr="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
mt_srand(); 
$strs=""; 
for($i=0;$i<$len;$i++){ 
$strs.=$srcstr[mt_rand(0,35)]; 
} 
return strtoupper($strs); 
} 
$str=random(4); //������ɵ��ַ��� 
$width = 45; //��֤��ͼƬ�Ŀ�� 
$height = 23; //��֤��ͼƬ�ĸ߶� 
@header("Content-Type:image/png"); 
$_SESSION["code"] = $str; 
//echo $str; 
$im=imagecreate($width,$height); 
//����ɫ 
$back=imagecolorallocate($im,0xFF,0xFF,0xFF); 
//ģ������ɫ 
$pix=imagecolorallocate($im,187,230,247); 
//����ɫ 
$font=imagecolorallocate($im,1,1,21); 
//��ģ�����õĵ� 
mt_srand(); 
for($i=0;$i<1000;$i++) 
{ 
imagesetpixel($im,mt_rand(0,$width),mt_rand(0,$height),$pix); 
} 
imagestring($im, 9, 7, 5,$str, $font); 
imagerectangle($im,0,0,$width-1,$height-1,$font); 
imagepng($im); 
imagedestroy($im); 
$_SESSION["code"] = $str;
?>

