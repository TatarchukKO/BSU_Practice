/**
 * Created by Kanstantsin on 21.03.2017.
 */
var userName = null;

var authoModel = (function () {
    var validData = [{
        login: "fomichev",
        pass: "1234"
    }, {
        login: "hadanenok",
        pass: "jeka"
    }, {
        login: "titivuk",
        pass: "kozya"
    }];

    function pressLogInButton() {
        document.querySelector(".wrapper").style.display = "none";
        document.querySelector(".detailed-view").style.display = "none";
        document.querySelector(".show-more-news").style.display = "none";
        document.querySelector(".sign-in-button").style.visibility = "hidden";
        document.querySelector(".authorization").style.display = "block";
    }

    function pressLogOutButton() {
        document.querySelector(".sign-in-button").style.visibility = "visible";
        document.querySelector(".sign-out-button").style.visibility = "hidden";
        document.querySelector(".user-name").style.visibility = "hidden";
        document.querySelector(".dv-edit-remove-buttons").style.visibility = "hidden";
        document.querySelector(".user-name").innerHTML = "";
        document.querySelector(".add-button").style.visibility = "hidden";

    }

    function isValidateLogIn() {
        var l = document.getElementById("login").value;
        var p = document.getElementById("pass").value;

        var flag = false;
        validData.forEach(function (element) {
            if (l === element.login && p === element.pass) {
                flag = true;
                userName = l;
                return true;
            }
        })
        if (flag) {
            document.querySelector(".authorization").style.display = "none";
            document.querySelector(".wrapper").style.display = "inline-block";
            document.querySelector(".show-more-news").style.display = "block";
            document.querySelector(".sign-out-button").style.visibility = "visible";
            document.querySelector(".sign-in-button").style.visibility = "hidden";
            document.querySelector(".user-name").innerHTML = l;
            document.querySelector(".user-name").style.visibility = "visible";
            document.querySelector(".dv-edit-remove-buttons").style.visibility = "visible";
            document.querySelector(".add-button").style.visibility = "visible";
        }
    }

    function storageUsers() {
        localStorage.setItem("users", JSON.stringify(validData));
    }

    return {
        pressLogInButton: pressLogInButton,
        isValidateLogIn: isValidateLogIn,
        pressLogOutButton: pressLogOutButton
    };

}());

