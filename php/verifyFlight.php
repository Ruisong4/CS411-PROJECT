<?php
    include('connect.php');
    $airline = $_POST["airline"];
    $flight = $_POST["flight"];
    $month = $_POST["month"];
    $day = $_POST["day"];

    $check_flight_exist = "SELECT * FROM delay_info WHERE airline = '$airline' AND flight_number = '$flight' AND month(flight_date) = '$month' and day(flight_date) = '$day'";
    $result = $conn->query($check_flight_exist);
    if (!$result) {
        trigger_error('Invalid query: ' . $conn->error);
    }
    if ($result->num_rows < 1) {
        $response = [
            'status' => false
        ];
        echo json_encode($response);
    }else{
        $response = [
            'status' => true
        ];
        echo json_encode($response);
    }