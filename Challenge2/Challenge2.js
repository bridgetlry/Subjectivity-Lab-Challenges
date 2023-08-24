// global variables for each trial
var colorWord;
var fontColor;
var startRTclock;
var finalRT;
var partialRT = [];
var response;
var partialResponse = [];
var numberError;
var congruency;
var circleColors;
const colors = ["red","green", "blue", "yellow"];
const red = "rgb(255, 0, 0)";
const green = "rgb(127, 255, 0)";
const blue = "rgb(28, 191, 255)";
const yellow = "rgb(255, 255, 0)";


// create global variables for all trials
const iti = 500; //ms
const startDelay = 2000; //ms
var currentTrial = -1;
var colorWords = [];
var fontColors = [];
var finalRTs = [];
var finalResponses = [];
var partialRTs = [];
var partialResponses = [];
var numberErrors = [];
var congruencies = [];
var trials = [];
var expData = {};

// constructs the trials immediately
$(document).ready(function() {
    createTrials();  
    determinecircleColors();    
    document.querySelector('video').playbackRate = .60; 
});

// determine the order of the circle answers
function determinecircleColors () {
    circleColors = shuffle(colors);
    for (i = 0; i < circleColors.length; i++) {
        $("#circle" + (i + 1)).css("background-color",eval(circleColors[i])) 
    }
}

// shows the demonstration of examples
function showDemo() {
    $("#instructions").hide();
    $("#demoBox").show();
}

// sets up the interface for the experiment
function startTrial() {
    $("#demoBox").hide();
    setTimeout(nextTrial, startDelay); // starts
}

// constructs the different trials for the experiment
// congruent: 4 possible combos
// incongruent: 4 * 3 = 12

function createTrials() {
    let possibleColorWords = colors;
    let possibleFontColors = colors;
    var newTrial;
    var numRep = possibleFontColors.length - 1;


    // create congruent combinations
    for (i = 0; i < possibleColorWords.length; i++) { // goes through the colors
        for (j = 0; j < numRep; j++) { // repeats it to make the correct number of combinations
            newTrial = [possibleColorWords[i], possibleFontColors[i], "congruent"];
            trials.push[newTrial]; // add to trials
        }
    }

    // create incongruent combinations
    for (i = 0; i < possibleColorWords.length; i++) {
        for (j = 0; j < possibleFontColors.length; j++) {
            if (possibleColorWords[i].toLowerCase() != possibleFontColors[j].toLowerCase()) { // if the word and the font color aren't congruent
                newTrial = [possibleColorWords[i], possibleFontColors[j], "incongruent"];
                trials.push[newTrial]; // add to trials
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

// shows word
function nextTrial() {
    // if it is the first trial
    if (currentTrial == -1) {
        $("#experiment").show();
    }

    $("#trialWord").css("color","black");

    currentTrial += 1;
    
    if (currentTrial < trials.length) { // still trials to be done
        // clears
        partialResponse = [];
        partialRT = [];
        setTimeout(presentStimuli, iti) // start a trial
    } else { // trials are over, save
        $("#experiment").hide();
        $("#endingScreen").show();
        saveAllData();
    }

}

// shows the new word and records the previous trial's responses
function presentStimuli() {
    colorWord = trials[currentTrial][0]; // first item in specific trial (gets the actual word)
    fontColor = trials[currentTrial][1]; // second item in specific trial (gets the color of the font)
    congruency = trials[currentTrial][2]; // third item in specific trial (whether or not the color and word are the same)

    $("#trialWord").text(colorWord);
    $("#trialWord").css("color", eval(fontColor)); //  sets the word to the font color for the trial
    $("#trialWord").show();

    if (currentTrial == 0) {
        $("#colorSamples").css("display", "grid");
    }

    startRTclock = performance.now();

}

// determines whether or not the participant clicked on the correct circle
function evaluateResponse(circleNumber) {
    if ($("#" + circleNumber).css("background-color")== eval(fontColor)) { // if the circle is the same color as the font color
        finalRT = performance.now() - startRTclock;   
        finalResponse = fontColor;    
        numberError = partialResponse.length;    
        saveTrial ();    
    } else {
        partialRT.push(performance.now() - startRTclock); // saves the response time
        for (i=0;i<colors.length;i++) {
            if ($("#" + circleNumber).css("background-color")== eval(colors[i])) { // saves the color they clicked
                partialResponse.push(colors[i]);
            }
        }        
    }
}

// saves the word and font color as well as response data, begins the next trial
function saveTrial() {
    colorWords.push(colorWord);
    fontColors.push(fontColor);
    finalResponses.push(response);
    finalRTs.push(finalRT);
    partialResponses.push(partialResponse);
    partialRTs.push(partialRT);
    numberErrors.push(numberError);
    congruencies.push(congruency);
    nextTrial();
}

// saves data from all trials
function saveAllData() {
    expData.colorWord = colorWords;
    expData.fontColor = fontColors;
    expData.finalResponse = finalResponses;
    expData.finalRT = finalRTs;
    expData.partialResponse = partialResponses;
    expData.partialRT = partialRTs;
    expData.numberError = numberErrors;
    expData.congruency = congruencies;
}