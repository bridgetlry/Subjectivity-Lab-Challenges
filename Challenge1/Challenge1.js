// create global variables for each trial
var targetSide;
var distractorColor;
var rt;
var response;
var correct;

// create global variables for all trials
const iti = 500; //ms
const startDelay = 2000; //ms
var currentTrial = -1;
var targetSides = [];
var distractorColors = [];
var rts = [];
var responses = [];
var corrects = [];
var trials = [];
var expData = {};

// constructs the trials immediately
$(document).ready(function() {
    createTrials();   
});

// sets up the interface for the experiment
function startTrial() {

    $("#instructions").hide(); // hides instructions
    $("#trial").show(); // shows new screen

    $("body").css("background-color","#7F7F7F"); // changes background to gray

    setTimeout(nextTrial, startDelay); // starts
}

// constructs the different trials for the experiment
function createTrials() {
    targetSide = ["left", "right"];
    distractorColor = ["green", "red"];
    var newTrial;
    var numRep = 2; // 2 repetitions, as there are only 4 combinations and we need 8 trials

    // Create min combinations
    for (i = 0; i < targetSide.length; i++) { // goes through the different sides
        for (j = 0; j < distractorColor.length; j++) { // goes through the different colors
            for (k = 0; k < numRep; k++) { // creates each unique trial twice
                newTrial = [targetSide[i], distractorColor[j]];
                trials.push(newTrial); // adds to existing trials
            }
        }

    }

    randomize(trials);

    return trials;

}

// randomizes trial order
function randomize(array) {
    var numElements = array.length, temp, i;

    // while there are still remanining elements
    while (numElements) {
        
        // choose a random index of array
        i = Math.floor(Math.random() * numElements--);

        // swap
        temp = array[numElements]; // gets the last value in the array
        array[numElements] = array[i]; // reassigns the last value to the random value
        array[i] = temp;
        
    }
    return array;
}

// hides the squares of the previous shows the squares of the new trial
function nextTrial() {
    $(".square").hide(); // hide squares currently present
    currentTrial += 1;
    
    if (currentTrial < trials.length) { // still trials to be done
        setTimeout(presentStimuli, iti) // start a trial
    } else { // trials are over, save
        $("#trial").hide();
        $("#endingScreen").show();
        $("body").css("background-color", "white");
        saveAllData();
    }

}

// shows the new squares and records the previous trial's responses
function presentStimuli() {
    targetSide = trials[currentTrial][0]; // first item in specific trial (gets the target side)
    distractorColor = trials[currentTrial][1]; // second item in specific trial (gets the color)
    if (targetSide == "left") {
        distractorSide = "right";
    } else if (targetSide == "right") {
        distractorSide = "left";
    }
    
    $("#" + targetSide + "Square").css("background-color","white"); // creates white target square
    $("#" + distractorSide + "Square").css("background-color",distractorColor); // creates distractor square
    $("#" + targetSide + "Square").show();    
    $("#" + distractorSide + "Square").show();  

    recordResponse();

    // shows new stimuli
    setTimeout(function(){
        $("#" + targetSide + "Square").hide();    
        $("#" + distractorSide + "Square").hide();    
    }, 250);
}

// records and saves reaction time for trial
function recordResponse() {
    var startRTclock = performance.now(); 
    document.addEventListener('keydown', function recordKeyDown(event) {
        if (event.code == "KeyL" || event.code == "KeyR") { // keypress detected
            rt = performance.now() - startRTclock;
            document.removeEventListener('keydown', recordKeyDown);            
            response = event.code[3];
            if (response.toLowerCase() == targetSide[0].toLowerCase()) { // key press same as correct side
                correct = true;
            } else {
                correct = false;
            }
            // console.log(event.code + " was pressed");
            saveTrial ();
        }
    })    
}


function saveTrial() {
    targetSides.push(targetSide); // save side
    distractorColors.push(distractorColor); // save color
    responses.push(response); // save response
    rts.push(rt); // save reaction time
    corrects.push(correct); // save response accuracy
    nextTrial(); // begin next trial
}

function saveAllData() {
    expData.targetSide = targetSides;
    expData.distractorColor = distractorColors;
    expData.response = responses;
    expData.rt = rts;
    expData.correct = corrects;
}