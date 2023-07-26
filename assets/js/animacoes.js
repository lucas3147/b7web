let body = document.querySelector('body');
let clouds = document.querySelectorAll('.section-hot-cloud');
let sun = document.querySelector('.section-hot-sun');

function showAnimation(temperature) {

    if (temperature > 22) {
        addTempHot();
    } else {
        clearTempHot();
    }
}

function addTempHot() {
    body.className = 'section-hot';
    addClouds();
    sun.style.display = 'block';
}

function clearTempHot() {
    body.className = '';
    clearClouds();
    sun.style.display = 'none';
}

function clearClouds() {
    clouds.forEach((item) => {
        item.style.display = 'none';
    });
}

function addClouds() {
    clouds.forEach((item) => {
        item.style.display = 'block';
    });
}