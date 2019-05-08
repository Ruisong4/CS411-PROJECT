<?php
    function db_connect($ori, $des){
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
        <div>
        </div>

        <br><br><br><br><br><br><br>
        <h1 style= "font-size: 50px;font-family: Staatliches;text-align:center;">RESULT FOR {$ori} TO {$des}</h1>
        <br><br>

        <table align="center" style="font-family: Staatliches;font-size:25px;text-align:center;">
		
		<thead>
			<tr>
				<th>Airline
				<th>Number of records in database
				<th>On-Time Rate
        </thead>
        <tbody>

EOT;

        $q = "select a.airline, count(*), sum(sc_dept>ac_dept) from delay_info d, airline a where d.origin = '$ori' and d.destination = '$des' and a.iata_code = d.airline  group by a.airline";

        $result=mysql_query($q);

        //$c = 0
        while($row = mysql_fetch_assoc($result)){

            $acc = $row['sum(sc_dept>ac_dept)']/$row['count(*)'] * 100;
            $acc = round($acc ,2);

            //print_r( $row);

            //$c = $c + 1;
            print_r(    "<tr>".
                        "<td>{$row['airline']}</td>".
                        "<td>{$row['count(*)']}</td>".
                        "<td>{$acc}%</td>".
                        "</tr>");

        }
        print <<<EOT
        </tbody>
        </table>
        <div class="inputBlock" onclick="window.location.href= 'http://sp19-cs411-35.cs.illinois.edu/visual/flight_chart.html?dep={$ori}&des={$des}';return false"  align="center" style="width: 100%">
            <div id="flightNumberSubmit" class="searchSubmit">
                Visualize It!
            </div>
        </div>
        <div style="width: 100%" class="inputBlock" >
            <form style="text-align: center" action='shortest_path.php' method='POST'>
                <input type='hidden' name='airport' value={$ori}>
                <input type='hidden' name='airport1' value={$des}>    
                
                <input type="Submit" value = "Find another plan" align = center name = "routeSubmit"  class="searchSubmit" />
                
            </form>
        </div>
        <div class="inputBlock" onclick="window.location.href= 'http://sp19-cs411-35.cs.illinois.edu';return false"  align="center" style="width: 100%">
            <div id="flightNumberSubmit" class="searchSubmit">
                Back To Main Page
            </div>
        </div>
        </div>
        


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
        <script src="../javascript/cookieTool.js"></script>
        <script src="../javascript/header.js"></script>
        <script src="../javascript/mainPage.js"></script>
    </head>

    <div id="navContainer">
        <img id="logo_img" src="../resources/img/plane.png">
        <div id="logo_div">ON TIME</div>
        <div id="navLinks">
            <a href="../manage_airport.html" class="navLink">Manage Airport</a>
            <a href="../index.html" class="navLink">Search</a>
            <a class="navLink" href="../visual/index.html">Visual</a>
            <a class="navLink" href="../chat.html">Chat</a>
            <a id="showLogin" class="navLink">MY TRIP</a>
        </div>
    </div>

EOT;



    if(!isset($_POST['routeSubmit'])){
        exit("illegal access");
    }
    if(!isset($_POST['depInput'])){
        exit("No Origin");
    }
    if(!isset($_POST['desInput'])){
        exit("No Destination");
    }

    
    $ori = $_POST['depInput'];
    $des = $_POST['desInput'];

    
    db_connect($ori, $des);
?>