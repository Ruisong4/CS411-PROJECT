<?php
    include("connect.php");
    $username = $_POST["user"];
    $sql = "SELECT * FROM user_review WHERE `user` = '$username'";

    $result = $conn->query($sql);
    $myArray = array();

    while ($row = $result->fetch_assoc()) {
        $myArray[] = $row;
    }

    echo json_encode($myArray);
