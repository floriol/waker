document.querySelector("div[role='main']").style.height = "" + (screen.height - 74) + "px";

document.addEventListener("DOMContentLoaded", function (event) {
    var newItem = [
        {hours: 0, minutes: 0, aktive: "no", device: "", days: "", alarmId: 0}
    ];

    ;

    //var request = navigator.m;
    var alarms = [];

    var device_name = navigator.userAgent;
    var time = document.getElementById("timer");
     var date = document.getElementById("dater");
    function kiir(szoveg) {
        var li = document.getElementById("alarms");
        li.innerHTML = "" + szoveg;

        //document.getElementById("list").appendChild(li);
    }
    function beir(hours, minutes, aktive, device, days, longitude, latitude, alarmid) {
        var Alarms = window.indexedDB;
        var DBOpenRequest = Alarms.open("Alarms", 1);

        DBOpenRequest.onerror = function (event) {
            alert("Database error");
        };


        DBOpenRequest.onsuccess = function () {
            db = DBOpenRequest.result;
            var AlarmsTransaction = db.transaction("Alarms", "readwrite");
            var AlarmsObjectStore = AlarmsTransaction.objectStore("Alarms");
            var AlarmsRequest = AlarmsObjectStore.add({Hours: hours, Minutes: minutes, Device: device, Days: days, Latitude: latitude, Longitude: longitude, Id: alarmid});
            AlarmsRequest.onsuccess = function (event) {

            };
            AlarmsTransaction.oncomplete = function () {
                db.close();
                console.log("Bezárult az adatbázis!!!");
            };
        };
    }
    ;

    document.getElementById("Confirm").onclick = function () {
    console.log(date.value[5],date.value[6]);
        var Alarms = window.indexedDB;
        var DBOpenRequest = Alarms.open("Alarms", 1);
        var index;
        DBOpenRequest.onerror = function (event) {
            alert("Database error");
        };
        DBOpenRequest.onsuccess = function () {
                var lang;
                var lat;
                if (!navigator.mozAlarms) {
                    console.log('You don\'t have notification');
                }
                else {
                        var alarm = {
                            date: new Date((date.value[0]+date.value[1]+date.value[2]+date.value[3]),(date.value[5]+date.value[6])-1,date.value[8]+date.value[9], (time.value[0] + time.value[1]),( time.value[3] + time.value[4]), 0),
                            respectTimezone: 'ignoreTimezone',
                            data: {
                                message: "Do something dude!"
                            }
                        };
                        console.log(alarm.date);
                        var request = navigator.mozAlarms.add(alarm.date, alarm.respectTimezone, alarm.data);

                        request.onsuccess = function () {
                            console.log('A new alarm has been set:' + alarm.date);
                            alarm.id = this.result; // get the id of the new alarm.
                            
                    if ('geolocation' in navigator) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                                beir(time.value[0] + time.value[1], time.value[3] + time.value[4], "yes", device_name, date.value, position.coords.latitude, position.coords.longitude, alarm.id);
                               
                            lang=ez//position.coords.longitude;
                            lat=az//position.coords.latitude;
                                console.log(lang,lat);
                            console.log('Latitude: ' + position.coords.latitude + '<br/> Longitude: ' + position.coords.longitude);
                            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        }, function (err) { // Error callback if the location cannot be found
                            console.error('Failed to get user location', err);
                            kiir('Failed to get user location: <i>' + err.message + '</i>');
                        }, {"timeout": 5000});
                    } else {
                         lang=ez//position.coords.longitude;
                            lat=az// If the browser does not support Geolocation.
                        kiir('You don\'t have GPS');
                    }console.log(fos,szar);
                            console.log(alarm.id);
                            
                            navigator.mozSetMessageHandler("alarm", function (mozAlarm) {
                                alert("alarm fired: " + JSON.stringify(mozAlarm.data.message));
                                window.navigator.vibrate(200);
                                
                            });
                            
                            navigator.mozHasPendingMessage("alarm");
                        };
                        request.onerror = function () {

                            console.log('operation failed: ' + this.error);
                        };

                    // If the browser does not support Geolocation.

                }
            };
  
    };
});