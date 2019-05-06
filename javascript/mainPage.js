$('document').ready(function () {

    if (getCookie("recentSearch") != null){
        $.ajax({
            type: "POST",
            url: "./php/recordLoopUp.php",
            data: {
                "searchId":getCookie("recentSearch"),
            },
            cache: false,
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.length > 0){
                    let today = new Date();
                    let dateArray = data[0].departureDate.split("-");
                    if ((today.getMonth() + 1 > parseInt(dateArray[1]))||(
                        (today.getMonth() + 1 == parseInt(dateArray[1]))
                        && today.getDate() > parseInt(dateArray[2])
                    )){
                        $('#reviewBroadcast').css("display","block");
                        $('#reviewText b').text(data[0].destination);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    }

    let departureDate = flatpickr('#depDateInput', {});
    let returnDate = flatpickr('#desDateInput', {});
    let numberDate = flatpickr('#flightNumberDate', {});
    let routeSuggestDep;
    let routeSuggestDes;
    let airlineSuggest;


    $("#goToReview").click(function () {
        window.location.href = "./tripHistory.html?from=index";
    });

    $("#byRoute").click(function () {
        $(".routeBlock").css("display", "block");
        $(".flightBlock").css("display", "none");
        $("#byRoute").css({
            "color": "#dfe4eb",
            "background": "#eba718",
            "cursor": "default"
        });
        $("#byFlight").css({
            "color": "#000",
            "background": "#dfe4eb",
            "cursor": "pointer"
        });
    });

    $("#byFlight").click(function () {
        $(".flightBlock").css("display", "block");
        $(".routeBlock").css("display", "none");
        $("#byFlight").css({
            "color": "#dfe4eb",
            "background": "#eba718",
            "cursor": "default"
        });
        $("#byRoute").css({
            "color": "#000",
            "background": "#dfe4eb",
            "cursor": "pointer"
        });
    });

    $('#depInput').autoComplete({
        source: function (term, response) {
            try {
                routeSuggestDep.abort();
            } catch (e) {
            }
            routeSuggestDep = $.getJSON('./php/suggestion.php', {q: term, type: "airport"}, function (data) {
                response(data);
            });
        }
    });

    $('#desInput').autoComplete({
        source: function (term, response) {
            try {
                routeSuggestDes.abort();
            } catch (e) {
            }
            routeSuggestDes = $.getJSON('./php/suggestion.php', {q: term, type: "airport"}, function (data) {
                response(data);
            });
        }
    });

    $('#airlineInput').autoComplete({
        source: function (term, response) {
            try {
                airlineSuggest.abort();
            } catch (e) {
            }
            airlineSuggest = $.getJSON('./php/suggestion.php', {q: term, type: "airline"}, function (data) {
                response(data);
            });
        }
    });
    
    $('#routeSubmit').click(function () {

        let departure = $('#depInput').val();
        let destination = $('#desInput').val();

        if (departure == "" || destination == ""){
            alert("destination and departure airport can not be null");
            return; //TODO: 好看一点
        }

        let deStr = departure.match(/\([A-Z][A-Z][A-Z]\)/)[0].substring(1,4);
        let desStr = destination.match(/\([A-Z][A-Z][A-Z]\)/)[0].substring(1,4);

        if (desStr == deStr){
            alert("destination and departure airport should be different");
            return; //TODO: 好看一点
        }

        let deDate = departureDate.selectedDates == "" ? "" : new Date(departureDate.selectedDates);
        let reDate = returnDate.selectedDates == "" ? "" : new Date(returnDate.selectedDates);


        if(deDate == ""){
            alert("please select a departure date");
            return;
        }

        if (reDate!=""&&deDate!=""&&deDate > reDate){
            alert("departure date should be earlier than arrival date");
            return;
        }
        let realMonth2 = "";
        if(reDate!=""){
            realMonth2 =  reDate.getMonth() + 1;
        }
        let realMonth1 =  deDate.getMonth() + 1;
        deDate = deDate=="" ? "" : deDate.getFullYear() + "-" + realMonth1 + "-" + deDate.getDate();
        reDate = reDate=="" ? "" : reDate.getFullYear() + "-" + realMonth2 + "-" + reDate.getDate();
        let searchId = generateId(15);
        setCookie("recentSearch",searchId,"d365");
        let roundTrip = reDate == "" ? 0 : 1;
        reDate = reDate == ""? "1111-11-11" : reDate;
        $.ajax({
            type: "POST",
            url: "./php/searchRecord.php",
            data: {
                "searchId":searchId,
                "type":"route",
                "airline":"",
                "flightNumber":"",
                "destination":desStr,
                "departure":deStr,
                "departureDate":deDate,
                "returnDate":reDate,
                "roundTrip":roundTrip
            },
            cache: false,
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                //window.location.href = "query.html?searchId = " + searchId;

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
        var theForm, newInput1, newInput2, newInput3,newInput4, newInput5, newInput6;
        theForm = document.createElement('form');
        theForm.action = 'php/basic_query.php';
        theForm.method = 'post';
        newInput1 = document.createElement('input');
        newInput1.type = 'hidden';
        newInput1.name = 'depInput';
        newInput1.value = deStr;
        newInput2 = document.createElement('input');
        newInput2.type = 'hidden';
        newInput2.name = 'desInput';
        newInput2.value = desStr;
        newInput3 = document.createElement('input');
        newInput3.type = 'hidden';
        newInput3.name = 'routeSubmit';
        newInput3.value = 1;
        newInput4 = document.createElement('input');
        newInput4.type = 'hidden';
        newInput4.name = 'deDate';
        newInput4.value = deDate;
        newInput5 = document.createElement('input');
        newInput5.type = 'hidden';
        newInput5.name = 'reDate';
        newInput5.value = reDate;
        newInput6 = document.createElement('input');
        newInput6.type = 'hidden';
        newInput6.name = 'round';
        newInput6.value = roundTrip;
        theForm.appendChild(newInput1);
        theForm.appendChild(newInput2);
        theForm.appendChild(newInput3);
        theForm.appendChild(newInput4);
        theForm.appendChild(newInput5);
        theForm.appendChild(newInput6);

        document.getElementById('hidden_form_container').appendChild(theForm);
        theForm.submit();
    });

    $('#broadCastClose').click(function () {
        delCookie("recentSearch");
        $('#reviewBroadcast').css("display","none");
    });


    $('#flightNumberSubmit').click(function () {

        let airline = $('#airlineInput').val();
        let flightNumber = $('#flightNumberInput').val();

        if (airline == "" || flightNumber == ""){
            alert("flightNumber and airline can not be null");
            return; //TODO: 好看一点
        }

        let airlineStr = airline.match(/, [A-Z][A-Z]/)[0].substring(2);
        let searchId = generateId(15);
        setCookie("recentSearch",searchId,"d365");
        let deDate = new Date(numberDate.selectedDates);

        if(deDate == ""){
            alert("please select a departure date");
            return;
        }

        let realMonth = deDate.getMonth() + 1;
        deDate = deDate.getFullYear() + "-" + realMonth  + "-" + deDate.getDate();
        $.ajax({
            type: "POST",
            url: "./php/searchRecord.php",
            data: {
                "searchId":searchId,
                "type":"flight",
                "airline":airlineStr,
                "flightNumber":flightNumber,
                "destination":"",
                "departure":"",
                "departureDate":deDate,
                "returnDate":"1111-11-11",
                "roundTrip":0
            },
            cache: false,
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                //window.location.href = "query.html?searchId = " + searchId;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
        var theForm, newInput1, newInput2, newInput3,newInput4;
        theForm = document.createElement('form');
        theForm.action = 'php/basic_query.php';
        theForm.method = 'post';
        newInput1 = document.createElement('input');
        newInput1.type = 'hidden';
        newInput1.name = 'flight';
        newInput1.value = flightNumber;
        newInput2 = document.createElement('input');
        newInput2.type = 'hidden';
        newInput2.name = 'airline';
        newInput2.value = airlineStr;
        newInput3 = document.createElement('input');
        newInput3.type = 'hidden';
        newInput3.name = 'deDate';
        newInput3.value = deDate;
        newInput4 = document.createElement('input');
        newInput4.type = 'hidden';
        newInput4.name = 'routeSubmit';
        newInput4.value = 0;

        theForm.appendChild(newInput1);
        theForm.appendChild(newInput2);
        theForm.appendChild(newInput3);
        theForm.appendChild(newInput4);

        document.getElementById('hidden_form_container').appendChild(theForm);
        theForm.submit();
    })
});


var generateId = function(length) {
    let ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let rtn = '';
    for (let i = 0; i < length; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
};