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
    [breite,laenge],
    13
);
