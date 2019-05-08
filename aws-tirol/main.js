const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

// Karte initialisieren
let karte = L.map("map");


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

kartenLayer.geolandbasemap.addTo(karte);

//Auswahlmenü hinzufügen
const layerControl = L.control.layers({
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


karte.setView(
    [47.267222, 11.392778],
    15
);

//ausgabe in Konsole
//console.log(AWS);

//aktuelle Stationsdaten werden geladen, vom Server
async function loadStations() {
    //function für zugriff auf daten
    const response = await fetch("https://aws.openweb.cc/stations");
    //programm sagen das mit geojson gearbeitet wird, daten umwandeln
    const stations = await response.json();
    //feature Guppe erstellt
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        //bindPopup kann direkt Text sein oder eine Funktion um bestimmte Sachen anzuzeigen, Layer zeigt alles an
        .bindPopup(function (layer) {
            //console.log("Layer: ", layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum: ", date);
            //in return angeben was man als ausgabe in popup haben will, in der klammer ist der pfad bis zum erwünschten wert
            return `<h4>${layer.feature.properties.name}</h4>
            Höhe: ${layer.feature.geometry.coordinates[2]} m <br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
            Datum: ${date.toLocaleDateString("de-AT")}
            ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + 'km/h' : 'keine Daten'}
            <hr>
            <footer>Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a>
            </footer>
            `;
            //if funktion mit ?, wenn vorhanden anzeigen, wenn nicht vorhanden, dann keine daten ausgeben; Zeichenkette mit +
        })
        .addTo(awsTirol);
    //awsTirol.addTo(karte);
    //Zoomt auf alle Punkte im ogd.geojson
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");

    //Windrichtungen anzeigen
    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            if (feature.properties.WR) {
                let color = 'black';
                if (feature.properties.WG > 20) {
                    color = 'red';
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    //windLayer.addTo(karte);

    //Temperaturlayer hinzufügen
    const temperaturLayer = L.featureGroup();
    const farbPalette = [
        [0, "blue"],
        [1, "yellow"],
        [5, "orange"],
        [10, "red"],
    ];

    L.geoJson(stations, {
        pointToLayer: function(feature, latlng) {
            let color = 'red'
            for (let i=0; i<farbPalette.length; i++) {
                console.log(farbPalette[i], feature.properties.LT);
                if(feature.properties.LT < farbPalette[i][0]) {
                    color = farbPalette[i][1];
                    break;
                }
            }
            //if (feature.properties.LT) {
              //  let color = 'blue';
                //if (feature.properties.LT > 0) {
                //    color = 'red';
                //}
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color: ${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    ).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);
}
loadStations();
