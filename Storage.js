function kiir (szoveg) {
	var li = document.createElement ("li");
	li.innerHTML = "" + szoveg;
	document.getElementById ("storage").appendChild (li);
}

var IDBFactory_Adatbazis = window.indexedDB;

//IDBFactory_Adatbazis: open (), deleteDatabase ()
var IDBOpenDBRequest_AdatbazisNyitas = IDBFactory_Adatbazis.open ("Teszt_Adatbazis", 1);

IDBOpenDBRequest_AdatbazisNyitas.onsuccess = function () {
	kiir ("Adatbázis sikeresen megnyitva");
	var IDBDatabase_db = this.result;
	
	var IDBTransaction_Tranzakcio = IDBDatabase_db.transaction ("Tabla_1", "readwrite");
	IDBTransaction_Tranzakcio.oncomplete = function () {
		IDBDatabase_db.close ();
		kiir ("Bezárult az adatbázis!!!");
	};
	
	var IDBObjectStore_ObjektumTaroloTarnzakcioval = IDBTransaction_Tranzakcio.objectStore ("Tabla_1");
	
	//Rekordok bevitele
	var IDBRequest_Breq1 = IDBObjectStore_ObjektumTaroloTarnzakcioval.add ({Id: "1", Name: "Fülöp József"});
	var IDBRequest_Breq2 = IDBObjectStore_ObjektumTaroloTarnzakcioval.add ({Id: "2", Name: "Fülöp János"});
	
	//Egy rekord kikérése
	
	var IDBRequest_Kreq1 = IDBObjectStore_ObjektumTaroloTarnzakcioval.get ("1");
	IDBRequest_Kreq1.onsuccess = function () {
		kiir ("Egy rekord kivétele");
		kiir (this.result.Name);
	};
	
	IDBRequest_Kreq1.onerror = function () {
		kiir ("Hiba történt rekord kivételekor: " + this.error);
		
	};
	
	//Összes rekord kikérése:
	var IDBIndex_idx1 = IDBObjectStore_ObjektumTaroloTarnzakcioval.index ("Id");
	var IDBRequest_Kreq2 = IDBIndex_idx1.openCursor ();
	
	IDBRequest_Kreq2.onsuccess = function (evt) {
		var IDBCusorWithValue_cursor = evt.target.result;
		if (IDBCusorWithValue_cursor) {
			kiir ("Id: " + IDBCusorWithValue_cursor.value.Id + " Name: " + IDBCusorWithValue_cursor.value.Name);
			IDBCusorWithValue_cursor.continue ();
		}
		
		else {
			kiir ("A megjelenítés végetért :-)");
		}
		
	};
	
	IDBRequest_Kreq2.onerror = function () {
		kiir ("Összes rekord kilistázása nem járt sikerrel!!!");
	};
	
	
};

IDBOpenDBRequest_AdatbazisNyitas.onerror = function () {
	kiir ("Hiba történt az adatbázis megnyitásakor/létrehozásakor");
	
};

IDBOpenDBRequest_AdatbazisNyitas.onupgradeneeded = function (evt) {
	kiir ("Adatbázis Létrehozása!!!");
	var IDBDatabase_db = evt.currentTarget.result;
	//IDBDatabase_db: createObjectStore (), deleteObjectStore (), transaction ()
	
	
	var IDBObjectStore_objectStoreWT = IDBDatabase_db.createObjectStore ("Tabla_1", { keyPath: "Id" });
	//IDBObjectStore_objektumTaroloTarnzakcioNelkuli: put (), add (), delete (), get (), openCursor (), createIndex (), index (), deleteIndex ()
	
	var IDBIndex_Index1 = IDBObjectStore_objectStoreWT.createIndex ("Id", "Id", {unique:false});
	
};

var IDBOpenDBRequest_AdatbazisTorles = IDBFactory_Adatbazis.deleteDatabase ("Teszt_Adatbazis");
IDBOpenDBRequest_AdatbazisTorles.onsuccess = function () {
	kiir ("Sikeres az adatbázis törlése");
};

IDBOpenDBRequest_AdatbazisTorles.onerror = function () {
	kiir ("Sikertelen az adatbázis törlése");
};