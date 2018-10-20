var socialLabels = document.querySelectorAll('.social-label');
var fbElements = document.querySelectorAll(".graph-section-fb");
var twElements = document.querySelectorAll(".graph-section-tw");
var ytElements = document.querySelectorAll(".graph-section-yt");

var fbBox = document.getElementById("fb-box");
var twBox = document.getElementById("tw-box");
var ytBox = document.getElementById("yt-box");
var fbText = document.getElementById("fb-text");
var twText = document.getElementById("tw-text");
var ytText = document.getElementById("yt-text");

var bar1red = document.getElementById("bar1-red");

window.onload = fbText.classList.add("blue-text"),
                fbBox.classList.add("white-box"),
                fbElements[0].classList.add("on"),
                fbElements[1].classList.add("on"),
                fbElements[2].classList.add("on");
                

for (i = 0; i < socialLabels.length; i++) {
    socialLabels[i].addEventListener('click', highlightsocialLabelsOn, false);
    // socialLabels[i].addEventListener('mouseout', highlightsocialLabelsOff, false);
}

function highlightsocialLabelsOn() {
    for (i = 0; i < 3; i++) {
        fbElements[i].classList.remove("on");
        twElements[i].classList.remove("on");
        ytElements[i].classList.remove("on");
        fbText.classList.remove("blue-text");
        fbBox.classList.remove("white-box");
        twText.classList.remove("blue-text");
        twBox.classList.remove("white-box");
        ytText.classList.remove("blue-text");
        ytBox.classList.remove("white-box");
    }
    // fbValues.classList.remove("on");
    // twValues.classList.remove("on");
    // ytValues.classList.remove("on");

    if (this.classList.contains('fb-label')) {
        // fbValues.classList.add("on");
        fbText.classList.add("blue-text");
        fbBox.classList.add("white-box");
        for (i = 0; i < 3; i++) {
            fbElements[i].classList.add("on");
        }
    } else if (this.classList.contains('tw-label')) {
        twText.classList.add("blue-text");
        twBox.classList.add("white-box");
        for (i = 0; i < 3; i++) {
            twElements[i].classList.add("on");
        }
    } else if (this.classList.contains('yt-label')) {
        ytText.classList.add("blue-text");
        ytBox.classList.add("white-box");
        for (i = 0; i < 3; i++) {
            ytElements[i].classList.add("on");
        }
    } 

}


function highlightsocialLabelsOff() {
    for (i = 0; i < socialLabels.length; i++) {
        socialLabels[i].classList.remove("highlight-socialLabels");
    }
}