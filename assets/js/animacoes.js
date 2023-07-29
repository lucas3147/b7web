let body = document.querySelector('body');
let clouds = document.querySelectorAll('.section-hot-cloud');
let sun = document.querySelector('.section-hot-sun');
let snows = document.querySelectorAll('.section-cold-snow');

function showAnimation(temperature) {
    if (temperature > 22) {
        clearTempCold();
        addTempHot();
    } else {
        clearTempHot();
        addTempCold();
    }
}

/* Clima quente */
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

function addClouds() {
    clouds.forEach((item) => {
        item.style.display = 'block';
    });
}

function clearClouds() {
    clouds.forEach((item) => {
        item.style.display = 'none';
    });
}

/* Clima frio */
function addTempCold() {
    body.className = 'section-cold';
    addSnows();
}

function clearTempCold() {
    body.className = '';
    clearSnows();
}

function addSnows() {
    snows.forEach((item) => {
        item.style.display = 'block';
    });
}

function clearSnows() {
    snows.forEach((item) => {
        item.style.display = 'none';
    });
}

