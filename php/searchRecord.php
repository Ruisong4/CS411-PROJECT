<?php
    include('connect.php');
    $searchId = $_POST["searchId"];
    $type = $_POST["type"];
    $airline = $_POST["airline"];
    $flightNumber = $_POST["flightNumber"];
    $destination = $_POST["destination"];
    $departure = $_POST["departure"];
    $departureDate = $_POST["departureDate"];
    $returnDate = $_POST["returnDate"];
    $roundTrip = $_POST["roundTrip"] == '1' ? 1 : 0;

    $insert = "INSERT INTO `searchRecord`(`searchId`, `type`, `airline`, `flightNumber`, 
                `destination`, `departure`, `departureDate`, `roundTrip`, `returnDate`) 
                VALUES ('$searchId','$type','$airline','$flightNumber','$destination'
                ,'$departure','$departureDate','$roundTrip','$returnDate')";

    if(!$conn->query($insert)){
        echo $conn->error;
    };
