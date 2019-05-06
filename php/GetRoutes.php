<?php
    //$airline = $_GET['airline']
    $airline = $_GET['airline'];
    $server = "localhost";
    $db_username = "root"; 
    $db_password = "cs411fullscore"; 
    $dbname = "flightdb";
    $conn = new mysqli($server, $db_username, $db_password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql="select distinct origin, destination from delay_info where airline = '$airline'";
    
    $result = mysqli_query($conn,$sql);
    $amount = mysqli_num_rows($result);
    
    $jsonresults=array();
    while($row=mysqli_fetch_array($result)){

        $sql="select d1.city, d2.city from data d1, data d2 where d1.iata_code = '$row[0]' and d2.iata_code = '$row[1]'";
        $result1 = mysqli_query($conn,$sql);
        $jsonresults[] = mysqli_fetch_array($result1);
    }

    $jsonresult=json_encode ( $jsonresults );
    
    mysqli_close($con);

    echo $jsonresult;
?>