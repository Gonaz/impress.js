(function ( document, window ) {
'use strict';

    var Action = {
        previous: -1,
        next: 1,
        overview: 10,
        invalid: 0
    }

    function getHighlights (currentStep) {
        var pattern = new RegExp(currentStep.id+"-[0-9]+$");

        var possibleHighlights = currentStep.getElementsByTagName("span");
        var highlights = new Array();

        for (var i = possibleHighlights.length - 1; i >= 0; i--) {
            if (pattern.test(possibleHighlights[i].id)) {
                highlights.push(possibleHighlights[i]);
            }
        };
        return highlights;
    }

    // Prevent default keydown action when one of supported key is pressed.
    document.addEventListener("keydown", function ( event ) {
        if ( event.keyCode === 9 || event.keyCode === "27" || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
            event.preventDefault();
        }
    }, false);
    
    // Trigger impress action (next or prev) on keyup.
    document.addEventListener("keyup", function ( event ) {
        if ( event.keyCode === 9 || event.keyCode === 27 || ( event.keyCode >= 32 && event.keyCode <= 34 ) || (event.keyCode >= 37 && event.keyCode <= 40) ) {
            switch( event.keyCode ) {
                case 27: //esc
                    action = Action.overview;
                    break;
                case 33: // pg up
                case 37: // left
                case 38: // up
                    action = Action.previous;
                    break;
                case 9:  // tab
                case 32: // space
                case 34: // pg down
                case 39: // right
                case 40: // down
                    action = Action.next;
                    break;
            }
            
            event.preventDefault();
        }

        if (action === Action.next) {
            action = Action.invalid;
            var currentStep = document.getElementsByClassName("present")[0];
            var highlights = getHighlights(currentStep);
            currentHighlight++;

            var highlightedSomething = false;
            for (var i = highlights.length - 1; i >= 0; i--) {
                if (highlights[i].id === currentStep.id + "-" + currentHighlight) {
                    highlights[i].classList.add("highlighted");
                    highlightedSomething = true;
                } else {
                    highlights[i].classList.remove("highlighted");
                }
            };

            if (!highlightedSomething) {
                currentHighlight = 0;
                impress().next();
            }
        } else if (action === Action.previous) {
            action = Action.invalid;
            var currentStep = document.getElementsByClassName("present")[0];
            var highlights = getHighlights(currentStep);
            --currentHighlight;

            var highlightedSomething = false;
            for (var i = highlights.length - 1; i >= 0; i--) {
                if (highlights[i].id === currentStep.id + "-" + currentHighlight) {
                    highlights[i].classList.add("highlighted");
                    highlightedSomething = true;
                } else {
                    highlights[i].classList.remove("highlighted");
                }
            };

            if (!highlightedSomething) {
                currentHighlight = 0;
                impress().prev();
            }
        } else if (action === Action.overview) {
            impress().goto("overview");
        }
    }, false);

    var currentHighlight = 0;
    var action = Action.invalid;
})(document, window);