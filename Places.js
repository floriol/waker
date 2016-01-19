document.querySelector("div[role='main']").style.height = "" + (screen.height - 74) + "px";

document.addEventListener("DOMContentLoaded", function (event) {
    var saveButton = document.querySelector("save");
    
    document.getElementById("save").onclick = function () {
       
var today = new Date().getDate();
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) { // Success callback if the location is found.
                kiir('Latitude: ' + position.coords.latitude + '<br/> Longitude: ' + position.coords.longitude);
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            }, function (err) { // Error callback if the location cannot be found
                console.error('Failed to get user location', err);
                kiir('Failed to get user location: <i>' + err.message + '</i>');
            }, {"timeout": 5000});
        } else { // If the browser does not support Geolocation.
            kiir('You don\'t have GPS');
        }
    };

});

function kiir(szoveg) {
    var li = document.getElementById("gps");

    li.innerHTML = "" + szoveg;

    //document.getElementById("alarms").appendChild(li);
}
