let totalSlides = document.querySelectorAll('.slider--item').length;
let currentSlide = 0;

document.querySelector('.slider--width').style.width = 
`calc(100vw * ${totalSlides})`;
document.querySelector('.slider--controls').style.height = 
`${document.querySelector('.slider').clientHeight}px`;


document.querySelector('.voltar').addEventListener('click', goPrev);

document.querySelector('.proximo').addEventListener('click', goNext);

function updateMargin() {
    let sliderItemWidth = document.querySelector('.slider--item').clientWidth;
    let nextMargin = (currentSlide * sliderItemWidth);
    document.querySelector('.slider--width').style.marginLeft = `-${nextMargin}px`;
}

function goPrev() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateMargin();
}

function goNext() {
    currentSlide++;
    if (currentSlide > (totalSlides-1)){
        currentSlide = 0;
    }
    updateMargin();
}

setInterval(goPrev, 5000);
