<?php
header("Access-Control-Allow-Origin: http://localhost:3002");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type");

$ref = $_GET['reference'];
if($ref == ''){
echo 'wayray';
}

  $curl = curl_init();
  
  curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.paystack.co/transaction/verify/" . rawurlencode($ref),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
      "Authorization: Bearer ",
      "Cache-Control: no-cache",
    ),
  ));
  
  $response = curl_exec($curl);
  $err = curl_error($curl);
  curl_close($curl);
  
  if ($err) {
    echo "cURL Error #:" . $err;
  } else {

    $result = json_decode($response);
  }


  if($result->data->status == 'success'){
   $status = $result->data->status;
   $reference = $result->data->reference;
   $lname = $result->data->customer->last_name;
   $fname = $result->data->customer->first_name;
   $cus_email = $result->data->customer->email;
   date_default_timezone_set('Africa/Lagos');
   $date_time =  date('m/d/Y h:i:s a', time());

   include 'database.php';
   $stmt = $conn->prepare("INSERT INTO `customer` (`status`, `reference`, `last_name`, `first_name`, `email`, `date`) 
   VALUES (?, ?, ?, ?, ?, ?)");
   $stmt->bind_param("ssssss", $status, $reference, $lname, $fname, $cus_email, $date_time);
   if($stmt->execute()){
    echo 'success';
    exit();
   }else{
       echo 'error';
       exit();
   }
   $stmt->close();
   $conn->close();
  }else{
   echo 'paymentError';
   exit();
  }
?>
