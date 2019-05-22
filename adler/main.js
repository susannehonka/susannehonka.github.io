// Skript für Adlerweg;

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

// console.log(breite,laenge,titel);
// alert(breite);
// alert(laenge);
// alert(titel);

// Karte initialisieren
let karte = L.map("map");
//console.log(karte);

// // auf Ausschnitt zoomen
// karte.setView(
//     [47.2, 11.2],
//     8
// );

const kartenLayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a>, under <a href="https://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="https://stamen.com">Stamen Design</a>, under <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="https://www.openstreetmap.org/#map=8/47.714/13.349">OpenStreetMap</a>, under <a href="https://creativecommons.org/licenses/by-sa/3.0"CC BY SA</a>.'
    })
};

// Openstreetmap einbauen; s=Server, z=zoom, x=laenge, y=breite ... s wird ersetzt durch abc, subdomains macht das
// ).addTo(karte);

//kartenLayer.osm.addTo(karte);
kartenLayer.bmapoberflaeche.addTo(karte);

//Auswahlmenü hinzufügen
L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland High Dpi": kartenLayer.bmaphidpi,
    "Geoland Orthofoto 30cm": kartenLayer.bmaporthofoto30cm,
    "Geoland Gelände": kartenLayer.bmapgelaende,
    "Geoland Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);


// Positionsmarker 1 hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

// Positionsmarker 2 hinzufügen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

// Popup zum pin 1 und 2 hängen
pin1.bindPopup(titel1).openPopup();
pin2.bindPopup(titel2).openPopup();

//Exceltabelle übernehmen

//Marker wo Tabelle im objekt platziert wird + Popup
//let pin3 = L.marker(
//    [blick1.lat, blick1.lng]
//).addTo(karte);
//pin3.bindPopup(
//    `<h1>Standort ${blick1.standort}</h1>
//    <p>Höhe: ${blick1.seehoehe}</p>
//    <em>Kunde: ${blick1.kunde}</em>`
//);

let blickeGruppe = L.featureGroup().addTo(karte);

for (let blick of ADLERBLICKE) {
    console.log(blick);
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe}</p>
        <em>Kunde: ${blick.kunde}</em>`
    )
}

//Pins zum Ausschnitt hinzufügen zum zoomen
let ausschnitt = (blickeGruppe.getBounds());
ausschnitt.extend(pin1.getLatLng());
ausschnitt.extend(pin2.getLatLng());

console.log(blickeGruppe.getBounds());
karte.fitBounds(ausschnitt);

//Icon für Vollbild erscheint
karte.addControl(new L.Control.Fullscreen());

//wenn Kartenausschnitt verändert wird, bleibt neuer Ausschnitt nach aktualisieren vorhanden
//var hash = new L.Hash(karte);

//Plugin Control coordinates initialisiert und an Karte gehängt, Durch Klick wegen Koordinaten augegeben
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});

//gpx track laden
new L.GPX("AdlerwegEtappeO4.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'images/pin-icon-start.png',
        endIconUrl: 'images/pin-icon-end.png',
        shadowUrl: 'images/pin-shadow.png'
    }
}).on('loaded', function (e) {
    karte.fitBounds(e.target.getBounds());
}).on('addline', function (e) {
    console.log('linie geladen');
    const controlElevation = L.control.elevation({
        detachedView: true,
        elevationDiv: "#elevation-div",
    });
    controlElevation.addTo(karte);
    controlElevation.addData(e.line);
}).addTo(karte);