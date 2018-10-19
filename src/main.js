// questa è la variabile globale dove andiamo a salvare il risultato dell'interpolazione del volume/percentuale
// var globalResult = 0;

var mouseX, mouseY;
var toc = document.getElementsByClassName("toc")[0];
// contiene tutti i titoli delle sezioni
var lis = [];
var line = document.getElementById("current-line");

var mouseX = 0;
var mouseY = 0;

var delay = 500;
// var updateInterval = 25;

var mp3 = document.getElementById("mp3");

// function to map some range of values to another range of values
function mapper(num, in_min, in_max, out_min, out_max) {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

// get mouse coordinates
document.addEventListener("mousemove", e => {
  mouseX = mapper(e.clientX / window.innerWidth, 0, 1, 0, 1.5);
  mouseY = mapper(e.clientY / window.innerHeight, 0, 1, 0, 0.35);
});

var points = 100;
// generate wave dots
function generateDots() {
  var svgNS = "http://www.w3.org/2000/svg",
    container = document.getElementById("wave");
  for (var i = 0; i <= points; i++) {
    var svgLine = document.createElementNS(svgNS, "line");
    var spacing = container.clientWidth / (points * 1.825);
    svgLine.setAttributeNS(null, "x1", 0 + spacing * i);
    svgLine.setAttributeNS(null, "x2", 0 + spacing * i);
    svgLine.setAttributeNS(null, "y1", 0 + spacing * i);
    svgLine.setAttributeNS(null, "y2", 0 + spacing * i);
    svgLine.classList.add("wave-line");
    container.appendChild(svgLine);
    // console.log(points[i]);
  }
}

// animating percentage values and waveform volume
var options_numAnim = {
  suffix: "%"
};
var numAnim = new CountUp("map-percentage", 0, 0, 0, 3, options_numAnim);
// console.log(numAnim.printValue);
// if (!numAnim.error) {
//     numAnim.start(console.log(numAnim));
// } else {
//     console.error(numAnim.error);
// }

// funzioni che prendono la percentuale dei dati nella mappa – grafico 1
var els = document.getElementsByClassName("graph1-area");
// console.log(els);
var oldp, newp, pct;
for (i = 0; i < els.length; i++) {
  els[i].onmouseenter = function() {
    newp = this.getAttribute("data-percentage");
    // norm controlla l'ampiezza dell'onda nella funzione *dalle un cazzo di nome però*
    // norm = newp / 100;
    // console.log(norm);
    pct = document.getElementById("map-percentage");
    mp3.play();

    pct.style.opacity = "1";

    // aggiorna il contatore percentuale
    numAnim.update(newp);
  };
}
for (i = 0; i < els.length; i++) {
  els[i].onmouseleave = function() {
    // riporta percentuale a zero
    numAnim.update(0);
  };
}

// animate the wave dots
var norm = 1;
setTimeout(function() {
  var el = document.getElementsByClassName("hide")[0];
  el.classList.remove("hide");
  el.classList.add("show");
  function anim() {
    document.querySelectorAll("svg line.wave-line").forEach((c, i) => {
      var amp = 1 - i / points;
      var freq = 1 / 50;
      var osc_freq = 0.15;
      var phase = osc_freq * i;
      var t = performance.now();
      // norm = 1;

      var maths = 50 + amp * 2 * norm * i * Math.sin(freq * t + phase);

      c.setAttribute("y1", maths);
      c.setAttribute("y2", maths);
    });
    requestAnimationFrame(anim);
  }
  requestAnimationFrame(anim);
}, delay);

// function jump(h) {
//     location.href = '';
//     var url = location.href;                     // Save down the URL without hash.
//     location.href = "#" + h;                     // Go to the target element.
//     // history.replaceState(null, null, url);    // Don't like hashes. Changing it back.
// }

// function scrollTo(element, to, duration) {
//   if (duration <= 0) return;
//   var difference = to - element.scrollTop;
//   var perTick = (difference / duration) * 10;

//   setTimeout(function() {
//     element.scrollTop = element.scrollTop + perTick;
//     if (element.scrollTop === to) return;
//     scrollTo(element, to, duration - 10);
//   }, 10);
// }

// prende tutti i titoli delle sezioni h1 e h2 con classe 'section-title'
// e li inserisce come tag <li> nell'indice dei contenuti
var where = [];
function tocTitles() {
  var ul = document.createElement("UL");
  toc.appendChild(ul);
  // HTMLCollection dei titoli nel documento HTML
  liTxt = document.getElementsByClassName("section-title");

  var li;
  // insieme di tutte le sezioni con testo
  var anchor = document.getElementsByClassName("text-section");

  for (i = 0; i < liTxt.length; i++) {
    li = document.createElement("li");
    // elemento link da inserire dentro ogni 'li'
    h = document.createElement("a");
    // setta il collegamento di ogni 'a'
    where.push(anchor[i].id);
    h.href = "#" + where[i];
    // prende il primo elemento figlio di 'section-title', cioè i titoli delle sezioni
    h.innerHTML = liTxt[i].childNodes[1].innerHTML;
    // inserisce il 'li' in 'ul'
    ul.appendChild(li);
    // inserisce il collegamento 'a' in 'li'
    li.appendChild(h);
    // scrivere funzione per ascoltare il click sui 'li' ed animare scroll verso sezione relativa
    // li.addEventListener("click", function () {
    //     scrollTo(document.body, sectionHeights[i], 600);
    //     console.log(where[i]);
    // });
    lis.push(li);
    // valore dato all'inizio
    if (liTxt[i] == liTxt[0]) {
      li.classList.add("current");
      //   console.log(li);
    }
  }
  // console.log(lis);
}

var sectionHeights = [];
var sections = document.getElementsByClassName("text-section");

function calcHeights() {
for (i = 0; i < sections.length; i++) {
  var height = sections[i].offsetTop;
    sectionHeights.push(height);
    // console.log(height);
  }
  // console.log(sections);
  // console.log(sectionHeights);
}

function updateIndicator() {
  var indicator = document.getElementById("current-line");
  var currentLi = document.getElementsByClassName("current")[0];
  var currentLiHeight = currentLi.getBoundingClientRect().top;
  // console.log(currentLiHeight.top);
  indicator.style.top = currentLiHeight;
}

function updateSection(e) {
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) + (window.innerHeight / 2);
  // var top = (window.pageYOFfset / window.innerHeight) / 2;
  // console.log(window.innerHeight);

  calcHeights();

  for (i = 0; i < sections.length; i++) {
    var currSectionHeight = sectionHeights[i];
    var nextSectionHeight = sectionHeights[i + 1];
    var oldSectionHeight = sectionHeights[i - 1] || sectionHeights[0];
    // console.log(oldSectionHeight);

    // var oldSection = sections[i - 1] || sections[0];
    // var currSection = sections[i];
    // var nextSection = sections[i + 1];

    var oldLi = document.querySelectorAll(".toc > ul > li")[i - 1];
    var currLi = document.querySelectorAll(".toc > ul > li")[i];
    var nextLi = document.querySelectorAll(".toc > ul > li")[i + 1];
    if (
      (top >= currSectionHeight && top < nextSectionHeight) ||
      (top >= currSectionHeight && top < document.body.scrollHeight)
    ) {
      // ora sai in quale sezione sei nel documento
      //   console.log('current section: ' + currSection.getAttribute('id') + '— next section: ' + nextSection.getAttribute('id'));

      // ora bisogna selezionare il 'li' corrispondente e mettergli la classe 'current'
      if (typeof oldLi === "undefined") {
        document.querySelectorAll(".toc > ul > li")[0].classList.add("current");
      } else {
        oldLi.classList.remove("current");
      }
      currLi.classList.add("current");
      // console.log(currLi);
    } else if (top <= currSectionHeight && top > oldSectionHeight) {
      oldLi.classList.add("current");
      currLi.classList.remove("current");
      oldLi = currLi;
    }
  }
  updateIndicator();
}

// ////////////////// START ////////////////// //
// //////// SCROLLMAGIC + GSAP SCENES //////// //
// /////////////////////////////////////////// //

var waveformController = new ScrollMagic.Controller();
var mapScene = new ScrollMagic.Scene({
  triggerElement: "#map-percentage",
  triggerHook: 0.35,
  duration: "200%"
})
  .setPin("#main-question") // pins the element for the the scene's duration
  .addTo(waveformController); // assign the scene to the controller

mapScene.on("enter", function(event) {
  // console.log("Scene started.");
  document.getElementById("section-1").classList.add("bg", "dark");
  document.getElementById("main-question-paragraph").classList.add("dark");
  document.getElementById("wave").classList.add("focus");
  numAnim.update(100);
});
mapScene.on("leave", function(event) {
  // console.log("Scene left.");
  document.getElementById("section-1").classList.remove("bg", "dark");
  document.getElementById('main-question-paragraph').classList.remove("dark");
  document.getElementById("main-question-paragraph").style.marginBottom = "0";
  document.getElementById("wave").classList.remove("focus");
  numAnim.update(0);
});

var timelineController = new ScrollMagic.Controller();

// define movement of panels
var wipeAnimation = new TimelineMax().fromTo(
  "#timeline",
  1,
  { x: "0%" },
  { x: "-100%", ease: Linear.easeNone }
); // in from left

// console.log(document.getElementById('graph-scroller'));

var timelineScene = new ScrollMagic.Scene({
  triggerElement: "#section-3",
  triggerHook: 0,
  duration: "200%"
})
  .setPin("#section-3")
  .setTween(wipeAnimation)
  //   .addIndicators()
  .addTo(timelineController);

timelineScene.on("enter", function(event) {
  // console.log("entered");
});

// /////////////////////////////////////////// //
// //////// SCROLLMAGIC + GSAP SCENES //////// //
// /////////////////// END /////////////////// //

// apertura/chiusura indice dei contenuti
var line = document.getElementById("current-line");
document.addEventListener("mousemove", e => {
  mouseX = e.clientX / window.innerWidth;
  // mouseY = e.clientY / window.innerHeight;
  // console.log(mouseX);
  if (mouseX > 0.85) {
    toc.classList.add("summon");
    line.classList.add("active");
  }
});
toc.addEventListener("mouseleave", e => {
  toc.classList.remove("summon");
  line.classList.remove("active");
});

// /////////////////////////////////////////// //
// ///////// GESTIONE EVENTI PAGINA ////////// //
// /////////////////////////////////////////// //

window.onload = function(e) {
  generateDots();
  tocTitles();
  updateSection(e);
};
document.addEventListener("scroll", e => {
  updateSection(e);
});
