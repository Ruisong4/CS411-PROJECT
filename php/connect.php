<?php
    $server = "localhost";
    $db_username = "root"; //helloworldflight_jiayuan8
    $db_password = ""; //a321a321a330a340
    $dbname = "helloworldflight_Flight";
    $conn = new mysqli($server, $db_username, $db_password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
