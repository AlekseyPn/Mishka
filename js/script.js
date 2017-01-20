var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");
var modalCart = document.querySelector(".modal-cart");
var overlay = document.querySelector(".overlay");
var toggleSize = document.querySelectorAll(".modal-cart__size-btn");
var callModal = document.querySelector(".modal-call");
var submitToAdd = document.querySelector(".modal-cart__submit");
var submit = document.querySelector(".order-form__text-input--valid");
var invalidList = document.querySelectorAll(".order-form__text-input--valid--error");
var i;

navMain.classList.remove("main-nav--no-js");

navToggle.addEventListener("click", function() {
    if (navMain.classList.contains("main-nav--closed")) {
        navMain.classList.remove("main-nav--closed");
        navMain.classList.add("main-nav--opened");
    } else {
        navMain.classList.add("main-nav--closed");
        navMain.classList.remove("main-nav--opened");
    }
});

callModal.addEventListener("click", function() {
    event.preventDefault();
    modalCart.classList.add("modal-cart--show");
    overlay.classList.add("overlay--show");
});

submitToAdd.addEventListener("click", function() {
    event.preventDefault();
    modalCart.classList.remove("modal-cart--show");
    overlay.classList.remove("overlay--show");
});

overlay.addEventListener("click", function() {
    modalCart.classList.remove("modal-cart--show");
    overlay.classList.remove("overlay--show");
});

window.addEventListener("keydown", function(event) {
    if (event.keyCode === 27) {
        if (modalCart.classList.contains("modal-cart--show")) {
            modalCart.classList.remove("modal-cart--show");
            overlay.classList.remove("overlay--show");
        };
    };
});


for (i = 0; i < toggleSize.length; i++) {
    toggleSize[i].addEventListener("click", function() {
        event.preventDefault();
        if (this.classList.contains("modal-cart__size-btn--active")) {
            this.classList.remove("modal-cart__size-btn--active");
        } else {
            this.classList.add("modal-cart__size-btn--active");
        };
    });
};


if (submit) {
    submit.addEventListener("click", function(event) {
        for (index = 0; index < invalidList.length; index++) {
            invalidList[index].classList.add("form-section__submitting")
        }
    })
};