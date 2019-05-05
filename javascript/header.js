/**
 * this file control the display of login
 * window and send data to register or login via ajax to background
 **/
window.onload = function () {
    //function to close login window
    var closeButton = document.getElementById("closeLogin");
    closeButton.onclick = function () {
        document.getElementById("globalLayer").style.display = "none";
    };

    //function to open login window
    document.getElementById("showLogin").onclick = function () {
        if (getCookie("logged_in") == "true"){
            window.location.href = "./triphistory.html";
            return;
        }
        document.getElementById("globalLayer").style.display = "block";
    };

    //function change between sign up and sign in
    var changeButton = document.getElementById("changeButton");
    changeButton.onclick = function () {
        var toSignup = changeButton.innerHTML == "sign up";
        changeButton.innerHTML = toSignup ? "sign in" : "sign up";
        document.getElementById("changeInfo").innerHTML
            = toSignup ? "already have account?" : "need an account?";
        document.getElementById("login_button").innerHTML
            = toSignup ? "Sign up" : "Sign in";
        var elements = document.getElementsByClassName("hideForm");
        for (var i = 0; i< elements.length; i++){
            elements[i].style.display = toSignup ? "block" : "none";
        }
    };

    $('#login_button').click(function () {
        let usernameHint = $('#usernameHint');
        let passwordHint = $('#passwordHint');
        let confirmHint = $('#confirmHint');
        let usernameInput = $('#username');
        let passwordInput = $('#password');
        let confirmPass = $('#confirm_password');
        usernameHint.html("");
        passwordHint.html("");

        let instruction = $('#login_button').html();
        if (instruction.toLocaleLowerCase() == "sign up") {
            let canRegister = true;
            if (!isValidEmailAddress(usernameInput.val())) {
                usernameHint.html("Please Format Email Correctly!");
                canRegister = false;
            }
            if (passwordInput.val().length < 6) {
                passwordHint.html("password should be at least 6 digits")
                canRegister = false;
            }
            if (confirmPass.val() != passwordInput.val()){
                confirmHint.html("");
                canRegister = false;
            }

            if (!canRegister) {
                return;
            }
            $.ajax({
                type: "POST",
                url: "./php/user.php",
                data: {"username": usernameInput.val(), "password": passwordInput.val(), "type": "register"},
                cache: false,
                async: false,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    if (data.success == false){
                        usernameHint.html("Email already in used");
                        return;
                    }
                    setCookie("logged_in", true, "h6");
                    setCookie("username", usernameInput.val(), "h6");
                    location.reload(true);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: "./php/user.php",
                data: {"username": usernameInput.val(), "password": passwordInput.val(), "type": "login"},
                cache: false,
                async: false,
                dataType: "json",
                success: function (data, textStatus, jqXHR) {
                    if (data.success == false){
                        passwordHint.html("password and email not match!");
                        return;
                    }
                    setCookie("logged_in", true, "h6");
                    setCookie("username", usernameInput.val(), "h6");
                    window.location.href = "./triphistory.html";
                    return;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        }
    })
};

