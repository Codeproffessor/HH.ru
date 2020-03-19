//PRELOADER
window.onload = function () {
    fadeOutEffect('loader');
    setTimeout(function () {
        fadeOutEffect('loaderArea');
    }, 200);
    function fadeOutEffect(value) {
        var fadeTarget = document.getElementsByClassName(value)[0],
            fadeEffect = setInterval(function () {
                if (!fadeTarget.style.opacity) {
                    fadeTarget.style.opacity = 1;
                }
                if (fadeTarget.style.opacity > 0) {
                    fadeTarget.style.opacity -= 0.075;
                } else {
                    clearInterval(fadeEffect);
                }
            }, 30);
    }
    setTimeout(function () {
        bgVisible();
    }, 800);
};
setTimeout(function () {
    document.getElementsByClassName('loaderArea')[0].classList.add("unvisible");
}, 1000);

// Анимация фона происходит после загрузки страницы
function bgVisible() {
    var elem = document.querySelector(".form__bg-img");
    var massiveClass = elem.classList;
    if (massiveClass.contains("unvisible")) {
        massiveClass.remove("unvisible");
    }
}

// Shake submit button
function shake() {
    document.getElementById('form-submit').classList.add("shake_animation");

    setTimeout(function () {
        document.getElementById('form-submit').classList.remove("shake_animation");
    }, 720);
}
// Стиль для input line bottom - onchange.
function addInputStyle(value) {
    document.getElementById(value).classList.add("form__input-color")
}
function deleteInputStyle(value) {
    document.getElementById(value).classList.remove("form__input-color")
}

// Проверка равенства значений в password input.
function validatePasswordValue() {
    var password = document.getElementById("pass")
        , confirm_password = document.getElementById("conf-pass");
    if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Пароли не совпадают");
    } else {
        confirm_password.setCustomValidity('');
    }
}
function validatePasswordConfirm() {
    if (document.getElementById("pass").value != document.getElementById("conf-pass").value) {
        passMessageDoNotMatchVisible();
    } else {
        passMessageDoNotMatchUnvisible();
    }
}

function formIsValid() {
    // checkValidity() Возвращает true, если входной элемент содержит допустимые данные.
    if (emailIsValid() && passIsValid() && confpassIsValid()) {
        return true
    } else return false
}

// Всплывающее окно с сообщением: “Регистрация прошла успешно” + плавная анимация.
function successMessage() {
    var BlocksRegistration = {
        FirstBlock: '',
        SecondBlock: '',
        ThirdBlock: '',
        FourthBlock: '',
        FifthBlock: ''
    }

    BlocksRegistration.FirstBlock = document.getElementsByClassName("form__enter-content")[0];
    BlocksRegistration.SecondBlock = document.getElementById("form-submit");
    BlocksRegistration.ThirdBlock = document.getElementsByClassName("top-content")[0];
    BlocksRegistration.FourthBlock = document.getElementsByClassName("form__bg-img")[0];
    BlocksRegistration.FifthBlock = document.getElementsByClassName("registered-message")[0];

    animated();

    setTimeout(function () {
        BlocksRegistration.FirstBlock.classList.add("unvisible");
        BlocksRegistration.SecondBlock.classList.add("unvisible");
        BlocksRegistration.ThirdBlock.classList.add("unvisible");
        BlocksRegistration.FourthBlock.classList.add("unvisible");
        BlocksRegistration.FifthBlock.classList.remove("unvisible");
        document.getElementsByClassName("form__enter-content")[0].reset();
    }, 450);

    setTimeout(function () {
        BlocksRegistration.FirstBlock.classList.remove("unvisible");
        BlocksRegistration.SecondBlock.classList.remove("unvisible");
        BlocksRegistration.ThirdBlock.classList.remove("unvisible");
        BlocksRegistration.FourthBlock.classList.remove("unvisible");
        BlocksRegistration.FifthBlock.classList.add("unvisible");

    }, 5200);
}


function animated() {
    messageUnvisible();
    setTimeout(function () {
        messageVisible();
    }, 500);
    setTimeout(function () {
        messageUnvisible();
        setTimeout(function () {
            messageVisible();
        }, 700);
    }, 4500);

}

function messageVisible() {
    var elem = document.querySelectorAll(".sign-content")[0],
        massiveClass = elem.classList;

    var existenceClass = massiveClass.contains("unvisible");
    if (existenceClass == true) {
        massiveClass.remove("unvisible");
    }
    setTimeout(function () {
        massiveClass.remove("opacityNone");
    }, 50);
}

function messageUnvisible() {
    var elem = document.querySelectorAll(".sign-content")[0],
        massiveClass = elem.classList;
    massiveClass.add("opacityNone");
    elem.addEventListener("transitionend", addHiddenClass(), false);
}
function addHiddenClass() {
    setTimeout(function () {
        var elem = document.querySelectorAll(".sign-content")[0],
            massiveClass = elem.classList;
        massiveClass.add("unvisible");
    }, 500);
}


function emailIsValid() {
    return document.getElementById("e-mail").checkValidity();
}

function passIsValid() {
    return document.getElementById("pass").checkValidity();
}

function confpassIsValid() {
    return document.getElementById("conf-pass").checkValidity();
}

function invalidMessageVisibility(value) {
    document.getElementsByClassName(value)[0].classList.remove("unvisible");
    setTimeout(function () {
        document.getElementsByClassName(value)[0].classList.add("unvisible");
    }, 3000);
}

function emailMessageVisibility() {
    if (!(emailIsValid())) {
        invalidMessageVisibility('email-message');
    }
}

function passMessageVisibility() {
    if (!(passIsValid() && confpassIsValid())) { }
    invalidMessageVisibility('pass-message');
}

function passMessageDoNotMatchVisible() {
    document.getElementsByClassName('pass-message-do-not-match')[0].classList.remove("unvisible");
}
function passMessageDoNotMatchUnvisible() {
    document.getElementsByClassName('pass-message-do-not-match')[0].classList.add("unvisible");
}


var formData = {
    Firstname: '',
    LastName: '',
    Nationality: '',
    Email: '',
    DataOne: '',
    DataTwo: '',
    DataThree: '',
    Gender: '',
    Pass: ''
};

function genderChecked() {
    if (document.getElementById("male").checked) {
        return "male"
    }
    if (document.getElementById("feamale").checked) {
        return "feamale"
    }
}

function someFunc() {
    formData.Firstname = document.getElementById("first-name").value;
    formData.LastName = document.getElementById("last-name").value;
    formData.Nationality = document.getElementById("nationality").value;
    formData.Email = document.getElementById("e-mail").value;
    formData.DataOne = document.getElementById("day").value;
    formData.DataTwo = document.getElementById("month").value;
    formData.DataThree = document.getElementById("year").value;
    formData.Gender = genderChecked();
    formData.Pass = document.getElementById("conf-pass").value;
}

var submit = function () {
    var payload = { firstname: formData.Firstname, lastname: formData.LastName, nationality: formData.Nationality, email: formData.Email, data: formData.DataOne + ' ' + formData.DataTwo + ' ' + formData.DataThree, gender: formData.Gender, pass: formData.Pass };
    fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(payload)
    });
}


function sendMessage() {
    if (!(formIsValid())) {
        shake();
        emailMessageVisibility();
        if (emailIsValid()) {
            passMessageVisibility();
        }

    } else {
        someFunc();
        submit();
        successMessage();
    }
}
