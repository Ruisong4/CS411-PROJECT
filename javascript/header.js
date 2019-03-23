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
    }
};

