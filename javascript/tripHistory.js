$('document').ready(function () {

    $.ajax(
        {
            type: "POST",
            url: "./php/getHistory.php",
            data: {
                "user":getCookie("username")
            },
            cache: false,
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                for (let i = 0; i < data.length; i++){
                    let a = $( "<div class=\'reviewItem\'></div>" );
                    let b = $( "<div></div>" ).text(data[i].airline);
                    let c = $( "<div></div>" ).text(data[i].flight_number);
                    let d = $( "<div></div>" ).text(data[i].flight_date);
                    let e = $( "<div></div>" );
                    if (data[i].no_delay == "1"){
                        e.text("No Delay")
                    }
                    if (data[i].below_fifteen == "1"){
                        e.text("Around Thirty Minutes")
                    }
                    if (data[i].below_thirty == "1"){
                        e.text("Around Thirty Minutes")
                    }
                    if (data[i].above_thirty == "1"){
                        e.text("Above Thirty Minutes")
                    }
                    a.append(b,c,d,e);
                    a.insertBefore("#insert")
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        }
    );

    let dateInput = flatpickr('#insertDate', {});

    $('#insert').on('click',function () {
        $('#insertingBlock').css("display","block")
    });

    $('#insertCancel').on('click',function () {
        $("#insertingBlock input").val("");
        $('#insertingBlock').css("display","none")
    });

    $('#insertSubmit').on('click',function () {
        let airline = $('#insertAirline').val();
        let flight =$('#insertNumber').val();
        let dateInput2 = dateInput.selectedDates == "" ? "" : new Date(dateInput.selectedDates);
        let month = dateInput2.getMonth() + 1; //months from 1-12
        let day = dateInput2.getDate();
        $.ajax({
            type: "POST",
            url: "./php/verifyFlight.php",
            data: {
                "airline": airline,
                "flight": flight,
                "month": month,
                "day": day
            },
            cache: false,
            async: false,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (data.status == true) {
                    let year = new Date();
                    year = year.getFullYear();
                    let index = document.getElementById("insertInfo").selectedIndex;
                    let s1 = index == "0" ? 1 : 0;
                    let s2 = index == "1" ? 1 : 0;
                    let s3 = index == "2" ? 1 : 0;
                    let s4 = index == "3" ? 1 : 0;
                    $.ajax({
                        type: "POST",
                        url: "./php/insertReview.php",
                        data: {
                            "airline": airline,
                            "flight": flight,
                            "date":year + "-" + month + "-" + day,
                            "s1":s1,
                            "s2":s2,
                            "s3":s3,
                            "s4":s4,
                            "user":getCookie("username")
                        },
                        cache: false,
                        async: false,
                        dataType: "json",
                        success: function (data, textStatus, jqXHR) {
                            if (data.status == true) {
                                alert("your feedback is important for us, thank you!");
                                location.reload();
                            } else {
                                alert("You can not comment on one flight twice");
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {

                        }
                    });
                } else {
                    alert("there is no such flight at the given date")
                    return;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });

    })
});