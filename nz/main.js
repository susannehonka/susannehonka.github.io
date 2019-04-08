// Skript für Neuseelandreise;

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

// console.log(breite,laenge,titel);

// alert(breite);
// alert(laenge);
// alert(titel);



// Karte initialisieren
let karte = L.map("map");
//console.log(karte);


// auf Ausschnitt zoomen
karte.setView(
    [breite, laenge],
    13
);

// Openstreetmap einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

// Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);

// Popup zum pin hängen
pin.bindPopup(titel).openPopup();

//Icon für Vollbild erscheint
karte.addControl(new L.Control.Fullscreen());

//Plugin Control coordinates initialisiert und an Karte gehängt, Durch Klick wegen Koordinaten augegeben
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});