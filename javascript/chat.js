$('document').ready(function () {
    let goEasy = new GoEasy({
        appkey: "BC-91f07537ddb043f583cd40f9af21dd7d"
    });

    $('#joinChannel').on('click', function () {
        let userInput = $('#ChatChannel').val();
        if (userInput.length <= 3) {
            alert("Please Follow the format: airlineCode + flight Number");
            return;
        }
        let airline = userInput.substring(0, 2);
        let flight = userInput.substring(2);
        if (!/^[a-zA-Z]+$/.test(airline)) {
            alert("Please Follow the format: airlineCode + flight Number");
            return;
        }
        if (!/^[0-9]+$/.test(flight)) {
            alert("Please Follow the format: airlineCode + flight Number");
            return;
        }
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
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
                    $('#chooseChannel').css("display", "none");
                    $('#chatRoom').css("display", "block");
                    $('#chatRoomChannelName').text(airline + flight);
                    goEasy.subscribe({
                        channel: airline + flight,
                        onMessage: function (message) {
                            let array = message.content.split("锺");
                            let dom = $("<div class=\"messageItem\"></div>");
                            let dom2 = $("<div class=\"fromUser\"></div>").text(array[0]);
                            let dom3 = $("<div class=\"message\"></div>").text(array[1]);
                            dom.append(dom2);
                            dom.append(dom3);
                            $('#messageContainer').append(dom);
                        }
                    });

                } else {
                    alert("there is no such flight today")
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

            }
        });
    });

    $('#chatRoomInputButton').on("click", function () {
        let message = $('#chatRoomInputText').val();
        if (message.trim() == "") {
            alert("say something");
            return;
        }
        goEasy.publish({
            channel: $('#chatRoomChannelName').text(),
            message: message + "锺" + message
        });
    })
});

