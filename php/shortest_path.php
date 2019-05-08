<?php
    $airport = $_POST['airport'];
    $airport1 = $_POST['airport1'];


    $server = "localhost";
    $db_username = "root"; 
    $db_password = "cs411fullscore"; 
    $dbname = "flightdb";
    $conn = new mysqli($server, $db_username, $db_password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql="select distinct origin from sp";
    
    $result = mysqli_query($conn,$sql);
    $amount = mysqli_num_rows($result);
    
    $jsonresults=array();
    while($row=mysqli_fetch_array($result)){
        $jsonresults[]=$row ; 
    }

    $jsonresult=json_encode ( $jsonresults );
    $origin_arr = array();
    for($i = 0; $i < sizeof($jsonresults); $i ++){
        $origin_arr[] = $jsonresults[$i]["origin"];
    }
    $graph = array();
    for($i = 0; $i < sizeof($jsonresults); $i ++){
        $graph[$origin_arr[$i]] = array(); 
        for($j = 0; $j < sizeof($origin_arr); $j ++){
            $graph[$origin_arr[$i]][$origin_arr[$j]] = 32767;
        }
    }
    $sql="select * from sp";
    
    $result = mysqli_query($conn,$sql);
    $amount = mysqli_num_rows($result);
    
    $jsonresults=array();
    while($row=mysqli_fetch_array($result)){
        $jsonresults[]=$row ; 
    }

    for($i = 0; $i < sizeof($jsonresults); $i ++){
        $graph[$jsonresults[$i]["origin"]][$jsonresults[$i]["destination"]] = $jsonresults[$i]["max(distance)"];
    }

    mysqli_close($con);
    //print_r($graph["JFK"]);

    function dijkstra($source, $graph, $origin_arr){
        $is_visited = array();
        $prev = array();
        $dist = array();
        $path = array();
        for($i = 0; $i < sizeof($origin_arr); $i ++){
            $is_visited[$origin_arr[$i]] = 0;
            $prev[$origin_arr[$i]] = -1;
            $dist[$origin_arr[$i]] = $graph[$source][$origin_arr[$i]];
            $path[$origin_arr[$i]] = $source;
        }
        $min_cost;
        $min_cost_name;

        for($i = 0; $i < sizeof($origin_arr); $i ++){
            if($origin_arr[$i] == $source){
                continue;
            }
            $min_cost = 32767;
            for($j = 0; $j < sizeof($origin_arr); $j ++){
                if($is_visited[$origin_arr[$j]] == 0 and $dist[$origin_arr[$j]] < $min_cost){
                    $min_cost = $dist[$origin_arr[$j]];
                    $min_cost_name = $origin_arr[$j];
                }
            }
            $is_visited[$min_cost_name] = 1;
            for($j = 0; $j < sizeof($origin_arr); $j ++){
                if($is_visited[$origin_arr[$j]] == 0 and $graph[$min_cost_name][$origin_arr[$j]] != 32767 and $graph[$min_cost_name][$origin_arr[$j]] + $min_cost < $dist[$origin_arr[$j]]){
                    $dist[$origin_arr[$j]] = $graph[$min_cost_name][$origin_arr[$j]] + $min_cost;
                    $path[$origin_arr[$j]] = $min_cost_name;
                }
            }
        }
        return $path;
    }

    $path = dijkstra($airport1, $graph, $origin_arr);
    $final_path = array();
    $final_path[] = $airport;
    while($path[$airport] != $airport1){
        $final_path[] = $path[$airport];
        $airport = $path[$airport];
    }
    $final_path[] = $airport1;

    $arg = "?";

    for($i = 0; $i < sizeof($final_path); $i ++){
        $arg = $arg . "airport" . (string)$i . "={$final_path[$i]}";
        if($i < sizeof($final_path) - 1){
            $arg = $arg . "&";
        }
    }
    $url = "Location: ../visual/connection.html" . $arg; 
    header($url);

    echo $url


    //cho sizeof($jsonresults);
?>