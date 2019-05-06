<?php
    //$airline = $_GET['airline']

    $server = "localhost";
    $db_username = "root"; 
    $db_password = "cs411fullscore"; 
    $dbname = "flightdb";
    $conn = new mysqli($server, $db_username, $db_password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql="select distinct origin, destination from delay_info";
    
    $result = mysqli_query($conn,$sql);
    $amount = mysqli_num_rows($result);
    
    $jsonresults=array();
    while($row=mysqli_fetch_array($result)){
        //echo $row;  
    }

    $jsonresult=json_encode ( $jsonresults );
    
    mysqli_close($con);

    //echo $jsonresult;
?>