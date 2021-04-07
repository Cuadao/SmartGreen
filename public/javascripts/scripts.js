/* Pop up Confirmation*/
function areYouSure(){
    return confirm('Are you sure to delete this register?')
}

function imgSlider(anything) {
    document.querySelector(".start").src = anything;
}

function changeCircleColor(color) {
    const circle = document.querySelector(".circle");
    circle.style.background = color;
}
