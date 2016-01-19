document.querySelector("div[role='main']").style.height = "" + (screen.height - 74) + "px";
function kiir2(szoveg, id) {
    var li = document.createElement("form");
    var del = document.createElement("BUTTON");
    theText = document.createTextNode("Delete");
    del.appendChild(theText);
    function myOnClick(evt) {
        var Alarms = window.indexedDB;
        var DBOpenRequest = Alarms.open("Alarms", 1);
        DBOpenRequest.onerror = function (event) {
            console.log("Database error");
        };
        DBOpenRequest.onsuccess = function () {
            db = DBOpenRequest.result;
            var AlarmsTransaction = db.transaction("Alarms", "readwrite");
            var AlarmsObjectStore = AlarmsTransaction.objectStore("Alarms");
            var Request = AlarmsObjectStore.get(id);
            Request.onsuccess = function (evt) {
                console.log("delete");
                //delete_ittem(Request.result);
                AlarmsObjectStore.delete(Request.result.Id);
            };
            AlarmsTransaction.oncomplete = function () {
                if (navigator.mozAlarms) {
                    navigator.mozAlarms.remove(Request.result.Id);
                }
                db.close();
                console.log("Bezárult az adatbázis!!!");
            };
        };

        alert("Sikeres törlés");
    }
    del.onclick = myOnClick;
    //var but = documet.createElement("button");
    li.innerHTML = "" + szoveg + "\n";
    document.getElementById("list").appendChild(li);
    document.getElementById("list").appendChild(del);
}
;/*
 function delete_ittem(deletended) {
 var deleter = deletended;
 var Alarms = window.indexedDB;
 var DBOpenRequest = Alarms.open("Alarms", 1);
 DBOpenRequest.onerror = function (event) {
 console.log("Database error");
 };
 DBOpenRequest.onsuccess = function () {
 db = DBOpenRequest.result;
 console.log(deleter)
 var AlarmsTransaction = db.transaction("Alarms", "readwrite");
 var AlarmsObjectStore = AlarmsTransaction.objectStore("Alarms");
 var Request2 = AlarmsObjectStore.delete(deleter.Id);
 Request2.onsuccess = function (evt) {
 console.log("deleted");
 };
 AlarmsTransaction.oncomplete = function () {
 db.close();
 console.log("Bezárult az adatbázis!!!");
 };
 alert("Sikeres törlés");
 
 };
 };*/

document.getElementById("List").onclick = function () {
    var Alarms = window.indexedDB;
    var DBOpenRequest = Alarms.open("Alarms", 1);
    DBOpenRequest.onerror = function (event) {
        console.log("Database error");
    };
    DBOpenRequest.onsuccess = function () {
        db = DBOpenRequest.result;
        var AlarmsTransaction = db.transaction("Alarms", "readwrite");
        var AlarmsObjectStore = AlarmsTransaction.objectStore("Alarms");
        var IDBIndex_idx1 = AlarmsObjectStore.index("Id");
        var Request = AlarmsObjectStore.openCursor();
        Request.onsuccess = function (evt) {
            var IDBCusorWithValue_cursor = evt.target.result;
            if (IDBCusorWithValue_cursor) {
                //kiir ("Hours: " + IDBCusorWithValue_cursor.value.hours + " Minutes: " + IDBCusorWithValue_cursor.value.minutes+ "Aktive:"+IDBCusorWithValue_cursor.value.aktive+"Device:"+IDBCusorWithValue_cursor.value.device+"Days"+IDBCusorWithValue_cursor.value.days);
                kiir2("Id: " + IDBCusorWithValue_cursor.value.Id + " Hours: " + IDBCusorWithValue_cursor.value.Hours + " Minutes: " + IDBCusorWithValue_cursor.value.Minutes + " Device: " + /*IDBCusorWithValue_cursor.value.Device+*/" Days " + IDBCusorWithValue_cursor.value.Days, IDBCusorWithValue_cursor.value.Id);
                IDBCusorWithValue_cursor.continue();
                console.log("Id: " + IDBCusorWithValue_cursor.value.Id + " Hours: " + IDBCusorWithValue_cursor.value.Hours + " Minutes: " + IDBCusorWithValue_cursor.value.Minutes + " Aktive: " + IDBCusorWithValue_cursor.value.Aktive + " Device: " + /*IDBCusorWithValue_cursor.value.Device+*/" Days " + IDBCusorWithValue_cursor.value.Days, IDBCusorWithValue_cursor.value.Longitude, IDBCusorWithValue_cursor.value.Latitude, IDBCusorWithValue_cursor.value.Id);
            }
            ;


        };
        AlarmsTransaction.oncomplete = function () {
            db.close();
            console.log("Bezárult az adatbázis!!!");
        };
    };
}
;
