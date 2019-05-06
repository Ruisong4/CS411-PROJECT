<?php
    //$airline = $_GET['airline']
    $city1 = $_GET['iata1'];
    $city2 = $_GET['iata2'];

    $server = "localhost";
    $db_username = "root"; 
    $db_password = "cs411fullscore"; 
    $dbname = "flightdb";
    $conn = new mysqli($server, $db_username, $db_password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "select city from data where iata_code = '$city1'";
    $sql2 = "select city from data where iata_code = '$city2'";
    
    $result1 = mysqli_query($conn, $sql);
    $result2 = mysqli_query($conn, $sql2);
    
    $jsonresults=array();
    $jsonresults[0] = mysqli_fetch_array($result1);
    $jsonresults[1] = mysqli_fetch_array($result2);

    $jsonresult=json_encode ( $jsonresults );
    
    mysqli_close($con);

    echo $jsonresult;
?>