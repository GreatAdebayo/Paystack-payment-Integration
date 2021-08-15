<?php
$conn = new mysqli('localhost', 'root', '', 'paystack_payment');
if(!$conn){
echo 'Not connected to database'.mysqli_error($con);
}


?>