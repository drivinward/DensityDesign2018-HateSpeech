// window.onload = offsetOff();

var socialNetworks = document.querySelectorAll('.social');

//------listeners
for (i = 0; i < socialNetworks.length; i++) {
    socialNetworks[i].addEventListener('mouseover', highlightSociaOn, false);
    //usare nuova funzione per reverse + nascondere tooltip
    socialNetworks[i].addEventListener('mouseout', highlightSociaOff, false);
}

function highlightSociaOn() {
    var social = document.querySelectorAll('.social');
    //------controlla se il social su cui sono hover ha categorie in comune
    for (i = 0; i < social.length; i++) {
        //------controlla su quale pallino è hover
        if (social[i].matches('.facebook:hover')) {
            // console.log("Facebook");
            var twitterLines = document.querySelectorAll('.tw-paths');
            var youtubeLines = document.querySelectorAll('.yt-paths');
            var facebookLines = document.querySelectorAll('.fb-paths');
            var categoryWords = document.querySelectorAll('.category-words');

            for (l = 0; l < twitterLines.length; l++) {
                twitterLines[l].classList.add("social-disappear");
            };

            for (m = 0; m < youtubeLines.length; m++) {
                youtubeLines[m].classList.add("social-disappear");
            }

            for (n = 0; n < categoryWords.length; n++) {
                if (categoryWords[n].classList.contains('facebook') == false) {
                    categoryWords[n].classList.add("social-disappear");
                }
            }
        } else if (social[i].matches('.twitter:hover')) {
            // console.log("Twitter");
            var twitterLines = document.querySelectorAll('.tw-paths');
            var youtubeLines = document.querySelectorAll('.yt-paths');
            var facebookLines = document.querySelectorAll('.fb-paths');
            var categoryWords = document.querySelectorAll('.category-words');

            for (l = 0; l < facebookLines.length; l++) {
                facebookLines[l].classList.add("social-disappear");
            };

            for (m = 0; m < youtubeLines.length; m++) {
                youtubeLines[m].classList.add("social-disappear");
            }

            for (n = 0; n < categoryWords.length; n++) {
                if (categoryWords[n].classList.contains('twitter') == false) {
                    categoryWords[n].classList.add("social-disappear");
                }
            }
        } else if (social[i].matches('.youtube:hover')) {
            // console.log("Youtube");
            var twitterLines = document.querySelectorAll('.tw-paths');
            var youtubeLines = document.querySelectorAll('.yt-paths');
            var facebookLines = document.querySelectorAll('.fb-paths');
            var categoryWords = document.querySelectorAll('.category-words');

            for (l = 0; l < facebookLines.length; l++) {
                facebookLines[l].classList.add("social-disappear");
            };

            for (m = 0; m < twitterLines.length; m++) {
                twitterLines[m].classList.add("social-disappear");
            }

            for (n = 0; n < categoryWords.length; n++) {
                if (categoryWords[n].classList.contains('youtube') == false) {
                    categoryWords[n].classList.add("social-disappear");
                }
            }
        }
    }

    var categoryWords = document.querySelectorAll('.category-words'); //--------------------------------------------------------------------------------------
    for (i = 0; i < social.length; i++) {
        //------controlla su quale pallino è hover
        if (social[i].matches('.category-words:hover')) {
            // console.log("Facebook");
            var twitterLines = document.querySelectorAll('.tw-paths');
            var youtubeLines = document.querySelectorAll('.yt-paths');
            var facebookLines = document.querySelectorAll('.fb-paths');
            var categoryWords = document.querySelectorAll('.category-words');

            for (l = 0; l < twitterLines.length; l++) {
                twitterLines[l].classList.add("social-disappear");
            };

            for (m = 0; m < youtubeLines.length; m++) {
                youtubeLines[m].classList.add("social-disappear");
            }

            for (n = 0; n < categoryWords.length; n++) {
                if (categoryWords[n].classList.contains('facebook') == false) {
                    categoryWords[n].classList.add("social-disappear");
                }
            }
        }
    }

}

function highlightSociaOff() {
    var socialAll = document.querySelectorAll('.social-all');
    for (i = 0; i < socialAll.length; i++) {
        socialAll[i].classList.remove('social-disappear');
    }
}