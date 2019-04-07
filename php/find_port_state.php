<?php
    function db_connect($state){
        $server="localhost";
        $db_username="root";
        $db_password="cs411fullscore";

        $con = mysql_connect($server,$db_username,$db_password);
        if(!$con){
            die("can't connect".mysql_error());
        }

        mysql_select_db('flightdb',$con);

        print <<<EOT
        <div id="mainContainer">
        <img src="../resources/img/main_background.jpg" id="mainBack">
        <div class="inputBlock" onclick="window.location.href= 'http://sp19-cs411-35.cs.illinois.edu';return false"  align="center" style="width: 100%">
            <div id="flightNumberSubmit" class="searchSubmit">
                Back To Main Page
            </div>
        </div>

        <div class="inputBlock" onclick="window.location.href= 'http://sp19-cs411-35.cs.illinois.edu/manage_airport.html';return false"  align="center" style="width: 100%">
            <div id="flightNumberSubmit" class="searchSubmit">
                Back To manage airport
            </div>
        </div>
        <h1> <br><br><br></h1>
        <br><br><br>
        <h1 style= "font-size: 65px;font-family: Staatliches;text-align:center;">All Airports in '$state'</h1>
        <table align="center" style="font-family: Staatliches;font-size:25px;text-align:center;">
		
		<thead>
			<tr>
				<th>IATA_CODE
				<th>Airport Name
                <th>City
                <th>State
        </thead>
        <tbody>

EOT;

        $q = "select * from data where state = '$state'";

        $result=mysql_query($q);

        //$c = 0
        while($row = mysql_fetch_assoc($result)){

            $acc = $row['sum(sc_dept>ac_dept)']/$row['count(*)'] * 100;
            $acc = round($acc ,2);

            //print_r( $row);

            //$c = $c + 1;
            print_r(    "<tr>".
                        "<td>{$row['iata_code']}</td>".
                        "<td>{$row['airport']}</td>".
                        "<td>{$row['city']}</td>".
                        "<td>{$row['state']}</td>".
                        "</tr>");

        }
        print <<<EOT
        </tbody>
        </table>
        <div class="inputBlock" onclick="window.location.href= 'http://sp19-cs411-35.cs.illinois.edu';return false"  align="center" style="width: 100%">
            <div id="flightNumberSubmit" class="searchSubmit">
                Back To Main Page
            </div>
        </div>

        <div class="inputBlock" onclick="window.location.href= 'http://sp19-cs411-35.cs.illinois.edu/manage_airport.html';return false"  align="center" style="width: 100%">
            <div id="flightNumberSubmit" class="searchSubmit">
                Back To manage airport
            </div>
        </div>
        </div>

        <br><br><br><br>
        


EOT;





        mysql_close($con);
        return $con;
    }

    header("Content-Type: text/html; charset=utf8");

    print <<<EOT

    <head>
        <meta charset="UTF-8">
        <title>Fly on Time</title>
        <link rel="stylesheet" href="../css/table.css">
        <link rel="stylesheet" href="../css/header.css">
        <link rel="stylesheet" href="../css/mainPage.css">
        <link rel="stylesheet" href="../css/jquery.auto-complete.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
        <script
                src="https://code.jquery.com/jquery-2.2.4.min.js"
                integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
                crossorigin="anonymous">
        </script> <!-- loading jquery lib -->
        <script src="../javascript/jquery.auto-complete.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
        <script src="../javascript/header.js"></script>
        <script src="../javascript/mainPage.js"></script>
    </head>

    <div id="navContainer">
        <img id="logo_img" src="../resources/img/plane.png">
        <div id="logo_div">ON TIME</div>
        <div id="navLinks">
            <a href="javascript:void(0)" class="navLink">Search</a>
            <a class="navLink">News</a>
            <a class="navLink">Chat</a>
            <a id="showLogin" class="navLink">MY TRIP</a>
        </div>
    </div>

EOT;



    if(!isset($_POST['airstasubmit'])){
        exit("illegal access");
    }

    $state = $_POST['airsta'];

    
    db_connect($state);
?>