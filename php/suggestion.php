<?php
    include('connect.php');
    $searchWord = $_GET["q"]; //
    $searchType = $_GET["type"]; //;
    $lowerSearchWord = strtolower($searchWord);

    $array = array();
    $array2 = array();
    if ($searchType == "airport") {
        $sql = "SELECT city,state, iata_code, airport FROM data WHERE LOWER(iata_code) LIKE '$lowerSearchWord%'";
        $sql2 = "SELECT city,state, iata_code, airport FROM data WHERE LOWER(city) LIKE '$lowerSearchWord%'";
        $result = $conn->query($sql);

        while($row = mysqli_fetch_assoc($result))
        {
            $array[] = $row["city"] . ", " . $row["state"] . " (" . $row["iata_code"] . ") - " .  $row["airport"];
        }

        $result2 = $conn->query($sql2);
        while($row = mysqli_fetch_assoc($result2))
        {
            $array2[] = $row["city"] . ", " . $row["state"] . " (" . $row["iata_code"] . ") - " .  $row["airport"];
        }
        echo json_encode(array_merge($array,$array2));
    }

    if ($searchType == "airline") {
        $sql = "SELECT airline, iata_code FROM airline WHERE LOWER(iata_code) LIKE '$lowerSearchWord%'";
        $sql2 = "SELECT airline, iata_code FROM airline WHERE LOWER(airline) LIKE '$lowerSearchWord%'";
        $result = $conn->query($sql);

        while($row = mysqli_fetch_assoc($result))
        {
            $array[] = $row["airline"] . ", " . $row["iata_code"];
        }

        $result2 = $conn->query($sql2);
        while($row = mysqli_fetch_assoc($result2))
        {
            $array2[] = $row["airline"] . ", " . $row["iata_code"];
        }
        echo json_encode(array_merge($array,$array2));
    }
