<?php
    include("connect.php");
    $searchId = $_POST["searchId"];
    $sql = "SELECT * FROM searchrecord WHERE `searchId` = '$searchId'";

    $result = $conn->query($sql);
    $myArray = array();

    while ($row = $result->fetch_assoc()) {
        $myArray[] = $row;
    }

    echo json_encode($myArray);