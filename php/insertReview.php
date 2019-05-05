<?php
    include('connect.php');
    $airline = $_POST["airline"];
    $flight = $_POST["flight"];
    $date = $_POST["date"];
    $user = $_POST["user"];
    $s1 = $_POST["s1"];
    $s2 = $_POST["s2"];
    $s3 = $_POST["s3"];
    $s4 = $_POST["s4"];

    $insert = "INSERT INTO `user_review`(`flight_date`, `airline`, `flight_number`, `no_delay`, 
                    `below_fifteen`, `below_thirty`, `above_thirty`, `user`) 
                    VALUES ('$date','$airline','$flight','$s1','$s2'
                    ,'$s3','$s4','$user')";

    if(!$conn->query($insert)){
        $response = [
            'status' => false,
            'message' => 'na'
        ];
        echo json_encode($response);
    }else{
        $response = [
            'status' => true,
            'message' => 'na'
        ];
        echo json_encode($response);
    };