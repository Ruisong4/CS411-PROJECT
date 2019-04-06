<?php
    include('connect.php');
    $username_data = $_POST["username"];
    $password_data = $_POST["password"];
    $type = $_POST["type"];

    $check_name_exist = "SELECT * FROM user WHERE username = '$username_data'";
    $check_password_match = "SELECT * FROM user WHERE username = '$username_data' AND password = '$password_data'";

    if ($type == "login") {
        $result = $conn->query($check_name_exist);
        if ($result->num_rows < 1) {
            $response = [
                'success' => false,
                'message' => 'na'
            ];
            echo json_encode($response);
        } else {
            $result2 = $conn->query($check_password_match);
                if ($result2->num_rows < 1) {
                    $response = [
                        'success' => false,
                        'message' => 'nm'
                    ];
                    echo json_encode($response);
                }else {
                    $response = [
                        'success' => true,
                        'message' => ''
                    ];
                    echo json_encode($response);
                }
            }
    }else {
        $result = $conn->query($check_name_exist);
        if ($result->num_rows < 1) {
            $insert_user = "INSERT INTO user (username, password)
                    VALUES ('$username_data', '$password_data')";
            $conn->query($insert_user);
            $response = [
                'success' => true,
                'message' => ''
            ];
            echo json_encode($response);
        } else {
            $response = [
                'success' => false,
                'message' => 'duplicate'
            ];
            echo json_encode($response);
        }
    }
