function guiaPagina(className){
    let element = document.querySelector(className);
    window.scrollTo({
        top: getPosition(element).y - 100,
        behavior: 'smooth'
    });
    console.log('Passou por aqui!');
}

function getPosition(el){
    // default positions
    var xPos = 0,
        yPos = 0;
    // loop
    while (el) {
        if ( el.tagName === "BODY" ){
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft,
                yScroll = el.scrollTop  || document.documentElement.scrollTop;
            xPos += ( el.offsetLeft - xScroll + el.clientLeft );
            yPos += ( el.offsetTop  - yScroll + el.clientTop );
        } else {
           // for all other non-BODY elements
           xPos += ( el.offsetLeft - el.scrollLeft + el.clientLeft );
           yPos += ( el.offsetTop  - el.scrollTop  + el.clientTop );
        }
        el = el.offsetParent;
    }
    return {
       x: xPos,
       y: yPos
    };
};