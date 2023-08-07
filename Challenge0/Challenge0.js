$(document).ready(function() {
    
    var dt = new Date();
    $("#currentDateTime").html(dt.toLocaleDateString() + " " + dt.toLocaleTimeString());

});

function addCity() {
    var city = $("#cityBox").val();    
    $("#citySentence").html("Bridget was born in " + city + ". ");

    dt = new Date();
    $("#currentDateTime").html(dt.toLocaleDateString() + " " + dt.toLocaleTimeString());

}

var nightModeStatus = false
function nightMode() {
    if (nightModeStatus == false) {
        $("#nightModeButton").css("background-color", "white");
        $("#nightModeButton").css("color", "black");
        $("#nightModeButton").html("Day Mode");
        $("body").css("background-color", "black");
        $("body").css("color", "white");
        nightModeStatus = true;
    } else if (nightModeStatus == true) {
        $("#nightModeButton").css("background-color", "black");
        $("#nightModeButton").css("color", "white");
        $("#nightModeButton").html("Night Mode");
        $("body").css("background-color", "white");
        $("body").css("color", "black");
        nightModeStatus = false;
    }

    dt = new Date();
    $("#currentDateTime").html(dt.toLocaleDateString() + " " + dt.toLocaleTimeString());

}

