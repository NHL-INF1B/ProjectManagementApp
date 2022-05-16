<?php
/**
 * Anti Cors - Cross-Origin Resource Sharing
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

/**
 * Getting posted data from the app
 */
$json = file_get_contents('php://input');
$obj = json_decode($json, TRUE); // returns array("username" => "stefan") etc.

if (isset($obj)) {
    $name = $obj['name'];
    $email = $obj['email'];
    $dateOfBirth = $obj['dateOfBirth'];
    $password = $obj['password'];

    echo "invalid_email";;
    // echo password_hash($password, PASSWORD_DEFAULT);

    /**
     * Debugging
     */
    // $file = fopen("debug.txt","a");
    // fwrite($file, implode("\n", $obj));
    // fclose($file);

    /**
     * Returning message to app
     */
    // echo json_encode('Data has been send');

    //Do something
} else {
    echo json_encode('No data send');
}

function validateField () {

}
