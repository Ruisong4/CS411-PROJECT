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
                    let b = $( "<div></div>" ).text(data[0].airline);
                    let c = $( "<div></div>" ).text(data[0].flight_number);
                    let d = $( "<div></div>" ).text(data[0].flight_date);
                    let e = $( "<div></div>" );
                    if (data[0].no_delay){
                        e.text("No Delay")
                    }
                    if (data[0].below_fifteen){
                        e.text("Around Thirty Minutes")
                    }
                    if (data[0].below_thirty){
                        e.text("Around Thirty Minutes")
                    }
                    if (data[0].above_thirty){
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
        alert(dateInput.selectedDates);
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

                } else {
                    alert("there is no such flight at the given date")
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    })
});