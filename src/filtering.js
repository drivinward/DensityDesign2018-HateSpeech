var curvesArray = document.querySelectorAll('.graph-curve');
var graphContainer = document.getElementById('curve-graph-container');

//------listeners
for (i = 0; i < curvesArray.length; i++) {
    curvesArray[i].addEventListener('mouseover', highlightOn, false);
    //usare nuova funzione per reverse + nascondere tooltip
    curvesArray[i].addEventListener('mouseout', highlightOff, false);
}

graphContainer.addEventListener('mouseenter', offsetOn, false);
graphContainer.addEventListener('mouseleave', offsetOff, false);

//------one time offset

window.onload = offsetOff();


//------functions

var curves, lower, higher, arrow, x;

function offsetOff() {
    curves = document.querySelectorAll('.graph-curve');
    lower = document.getElementById('x-axis');
    higher = document.querySelectorAll('.higher');
    // arrow = document.getElementById('y-axis');
    x = -100;

    lower.style.transform = "translateX(" + ((x*-1) + 46) + "px)";
    // arrow.style.transitionDelay = 0 + "s"; 
    // arrow.style.transitionDuration = .25 + "s";   
    // arrow.style.opacity = 0;

    for (t = 0; t < higher.length; t++) {
        higher[t].style.transform = "translateX(" + x + "px)";
    }

    for (i = 0; i < curves.length; i++) {
        curves[i].style.transform = "translateX(" + x + "px)";
        x += 9;
    }
}

function offsetOn() {
    curves = document.querySelectorAll('.graph-curve');
    lower = document.getElementById('x-axis');
    higher = document.querySelectorAll('.higher');
    // arrow = document.getElementById('y-axis');
    x = 0;

    lower.style.transform = "translateX(" + x + "px)";
    // arrow.style.transitionDelay = .2 + "s";  
    // arrow.style.transitionDuration = .3 + "s";  
    // arrow.style.opacity = 1;

    for (t = 0; t < higher.length; t++) {
        higher[t].style.transform = "translateX(" + x + "px)";
    }

    for (i = 0; i < curves.length; i++) {
        curves[i].style.transform = "translateX(" + x + "px)";
        x -= .1;
    }
}

function highlightOn() {
    var curves = document.querySelectorAll('.graph-curve');
    var curveToIgnore;

    //------controlla se tutti gli altri dots hanno la categoria del dot sul quale si trova il mouse
    for (t = 0; t < curves.length; t++) {

        //------controlla su quale pallino è hover
        if (curves[t].matches('.graph-curve:hover')) {
            curveToIgnore = t;
            lastCurveIgnored = curveToIgnore;
        } else if (t != curveToIgnore) {
            curves[t].classList.add("disappear");
        }
    }
}

function highlightOff() {
    var curves = document.querySelectorAll('.graph-curve');
    for (i = 0; i < curves.length; i++) {
        curvesArray[i].classList.remove('disappear');
        // curvesArray[i].style.transform = "";

        // if (i == lastDotIgnored) {
        //     dots[i].classList.remove("onn");
        //     console.log('Rimuovo onn da ' + lastDotIgnored);
        //     this.style.transform = "";
        // }
    }
}