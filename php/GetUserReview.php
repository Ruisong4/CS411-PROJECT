<?php
    $airport = $_GET['airport'];
    $airport1 = $_GET['airport1'];
    $server = "localhost";
    $db_username = "root"; 
    $db_password = "cs411fullscore"; 
    $dbname = "flightdb";
    $conn = new mysqli($server, $db_username, $db_password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql="select airline as air, sum(no_delay) as acss, sum(below_thirty) as acc, sum(above_thirty) as ac, sum(below_fifteen) as acs, count(*) as ttl from user_review where dep = '$airport' and des = '$airport1' group by airline";
    
    $result = mysqli_query($conn,$sql);
    $amount = mysqli_num_rows($result);
    
    $jsonresults=array();
    while($row=mysqli_fetch_array($result)){
        $jsonresults[]=$row ; 
    }

    $jsonresult=json_encode ( $jsonresults );
    
    mysqli_close($con);

    echo $jsonresult;
?>