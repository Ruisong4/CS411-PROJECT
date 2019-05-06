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
    
    $sql="select count(*) as ttl, sum(sc_dept>ac_dept + 60) as acc, sum(sc_dept<ac_dept) as ac, sum(sc_dept<ac_dept-60) as acs,sum(sc_dept<ac_dept-120) as acss from delay_info where origin = '$airport' and destination = '$airport1'";
    
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