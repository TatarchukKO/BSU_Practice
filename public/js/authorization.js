let userName = null;

let authoModel = (function () {
    let validData = [{
        login: "fomichev",
        pass: "1234"
    }, {
        login: "hadanenok",
        pass: "jeka"
    }, {
        login: "titivuk",
        pass: "kozya"
    }];

    function getValidData() {
        return validData;
    }

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
        const l = document.getElementById("login").value;
        const p = document.getElementById("pass").value;

        let flag = false;
        validData.forEach(function (element) {
            if (l === element.login && p === element.pass) {
                flag = true;
                userName = l;
                return true;
            }
        });
        if (flag) {
            articleModel.getArticlesSizeFromDb().then(response => {
               if (response <= 6)
                   document.querySelector(".show-more-news").style.display = "none";
               else
                   document.querySelector(".show-more-news").style.display = "block";
                document.querySelector(".authorization").style.display = "none";
                document.querySelector(".wrapper").style.display = "inline-block";
                document.querySelector(".sign-out-button").style.visibility = "visible";
                document.querySelector(".sign-in-button").style.visibility = "hidden";
                document.querySelector(".user-name").innerHTML = l;
                document.querySelector(".user-name").style.visibility = "visible";
                document.querySelector(".dv-edit-remove-buttons").style.visibility = "visible";
                document.querySelector(".add-button").style.visibility = "visible";
            });
        }
    }

    function storageUsers() {
        localStorage.setItem("users", JSON.stringify(authoModel.getArticles()));
    }
    function getUsersArrayFromLS(){
        validData = localStorage.getItem("users");
    }


    return {
        pressLogInButton: pressLogInButton,
        isValidateLogIn: isValidateLogIn,
        pressLogOutButton: pressLogOutButton,
        getValidData: getValidData
    };

}());

