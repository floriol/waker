function kiir(szoveg, kell) {
    document.querySelector("div[role='main']").style.height = "" + (screen.height - 74) + "px";
    var li = document.createElement("li");
    li.innerHTML = "Yo have " + szoveg + kell;
    document.getElementById("alarms").appendChild(li);
}

var Alarms = window.indexedDB;
var DBOpenRequest = Alarms.open("Alarms", 1);

DBOpenRequest.onerror = function (event) {
    alert("Database error");
};


DBOpenRequest.onsuccess = function () {
    db = DBOpenRequest.result;
    var AlarmsTransaction = db.transaction("Alarms", "readwrite");
    var AlarmsObjectStore = AlarmsTransaction.objectStore("Alarms");
    var Request = AlarmsObjectStore.count();
    Request.onsuccess = function () {
        if (this.result <= 1) {
            kiir(this.result, " alarm");
        }
        else {
            kiir(this.result, " alarms");
        }
    };
    Request.onerror = function () {
        alert("Hiba történt rekord kivételekor: " + this.error);

    };
};


DBOpenRequest.onupgradeneeded = function (evt) {
    kiir("Adatbázis Létrehozása!!!");
    var IDBDatabase_db = evt.currentTarget.result;
    //IDBDatabase_db: createObjectStore (), deleteObjectStore (), transaction ()


    var IDBObjectStore_objectStoreWT = IDBDatabase_db.createObjectStore("Alarms", {keyPath: "Id"});
    //var IDBObjectStore_objectStoreDevice = IDBDatabase_db.createObjectStore ("Devices", { keyPath: "Id" });
    //var IDBObjectStore_objectStorePlaces = IDBDatabase_db.createObjectStore ("Places", { keyPath: "Id" });
    //IDBObjectStore_objektumTaroloTarnzakcioNelkuli: put (), add (), delete (), get (), openCursor (), createIndex (), index (), deleteIndex ()

    var IDBIndex_Index1 = IDBObjectStore_objectStoreWT.createIndex("Id", "Id", {unique: false});

};
