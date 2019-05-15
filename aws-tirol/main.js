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
            Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + 'km/h' : 'keine Daten'} <br>
            Relative Feuchte: ${layer.feature.properties.RH ? layer.feature.properties.RH + '%' : 'keine Daten'}
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

    // //Windrichtungen anzeigen mit schwarz und roten pfeilen
    // const windLayer = L.featureGroup();
    // L.geoJson(stations, {
    //     pointToLayer: function (feature, latlng) {
    //         if (feature.properties.WR) {
    //             let color = 'black';
    //             if (feature.properties.WG > 20) {
    //                 color = 'red';
    //             }
    //             return L.marker(latlng, {
    //                 icon: L.divIcon({
    //                     html: `<i style="color: ${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
    //                 })
    //             });
    //         }
    //     }
    // }).addTo(windLayer);
    // layerControl.addOverlay(windLayer, "Windrichtung");
    // //windLayer.addTo(karte);

    // //Windrichtungen anzeigen
    // const windLayer = L.featureGroup();
    // L.geoJson(stations, {
    //     pointToLayer: function (feature, latlng) {
    //         if (feature.properties.WR) {
    //             let color = 'black';
    //             if (feature.properties.WG < 19) {
    //                 color = '#00b900';
    //             }
    //             if (feature.properties.WG = 19 - 28) {
    //                 color = '#10cd24';
    //             }
    //             if (feature.properties.WG = 29 - 38) {
    //                 color = '#72d475';
    //             }
    //             if (feature.properties.WG = 39 - 49) {
    //                 color = '#fed6d3';
    //             }
    //             if (feature.properties.WG = 50 - 61) {
    //                 color = '#ffb6b3';
    //             }
    //             if (feature.properties.WG = 62 - 74) {
    //                 color = '#ff9e9a';
    //             }
    //             if (feature.properties.WG = 75 - 88) {
    //                 color = '#ff8281';
    //             }
    //             if (feature.properties.WG = 89 - 102) {
    //                 color = '#ff6160';
    //             }
    //             if (feature.properties.WG = 103 - 117) {
    //                 color = '#ff453c';
    //             }
    //             if (feature.properties.WG > 118) {
    //                 color = '#ff200e';
    //             }
    //             return L.marker(latlng, {
    //                 icon: L.divIcon({
    //                     html: `<i class="relativefeuchteLabel" style="color: ${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
    //                 })
    //             });
    //         }
    //     }
    // }).addTo(windLayer);
    // layerControl.addOverlay(windLayer, "Windrichtung");
    // //windLayer.addTo(karte);

    //Windgeschwindigkeitslayer hinzufügen
    const windLayer = L.featureGroup();
    const windfarbPalette = [
        [3.60, "#00b900"],
        [8.23, "#10cd24"],
        [11.32, "#72d475"],
        [14.40, "#fed6d3"],
        [17.49, "#ffb6b3"],
        [21.09, "#ff9e9a"],
        [24.69, "#ff8281"],
        [28.81, "#ff6160"],
        [32.96, "#ff453c"],
        [999, "#ff200e"],
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = windfarbPalette[windfarbPalette.length - 1][1];
                for (let i = 0; i < windfarbPalette.length; i++) {
                    if (feature.properties.WG < windfarbPalette[i][0]) {
                        color = windfarbPalette[i][1];
                        break;
                    } else {}
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style= "color: ${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    windLayer.addTo(karte);

    //Feuchtelayer hinzufügen
    const feuchteLayer = L.featureGroup();
    const feuchtefarbPalette = [
        [30, "#EEE"],
        [40, "#DDD"],
        [50, "#C6C9CE"],
        [60, "#BBB"],
        [70, "#AAC"],
        [80, "#9998DD"],
        [90, "#8788EE"],
        [100, "#7677E1"],
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.RH) {
                let color = feuchtefarbPalette[feuchtefarbPalette.length - 1][1];
                for (let i = 0; i < feuchtefarbPalette.length; i++) {
                    console.log(feuchtefarbPalette[i], feature.properties.RH);
                    if (feature.properties.RH < feuchtefarbPalette[i][0]){
                        color = feuchtefarbPalette[i][1]
                    break;
                } else {}
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="relativefeuchteLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                    })
                });
            }
        }
    }).addTo(feuchteLayer);
    layerControl.addOverlay(feuchteLayer, "Relative Feuchte");
    feuchteLayer.addTo(karte);

    //schneehöhenlayer hinzufügen
    const schneeLayer = L.featureGroup();
    const schneefarbPalette = [
        [10, "#adbd63"],
        [20, "#ff7b00"],
        [30, "#42ef42"],
        [50, "#63ffc6"],
        [75, "#21bdff"],
        [100, "#396bbd"],
        [150, "#ff63ff"],
        [200, "#ffff00"],
        [250, "#ffbd00"],
        [300, "#ff0084"],
        [400, "#7b0084"],
        [9999, "#000000"],
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.HS) {
                if (feature.properties.HS >= 0) {
                    let color = schneefarbPalette[schneefarbPalette.length - 1][1];
                    for (let i = 0; i < schneefarbPalette.length; i++) {
                        console.log(schneefarbPalette[i], feature.properties.HS);
                        if (feature.properties.RH < schneefarbPalette[i][0]){
                            color = schneefarbPalette[i][1]
                        break;
                    } else {}
                    }
                    return L.marker(latlng, {
                        icon: L.divIcon({
                            html: `<div class="schneehoeheLabel" style= "background-color: ${color}"> ${feature.properties.HS}</div>`
                        })

                    });
                }
            }
        }
    }).addTo(schneeLayer);
    layerControl.addOverlay(schneeLayer, "Schneehöhe");
    schneeLayer.addTo(karte);

    //Temperaturlayer hinzufügen
    const temperaturLayer = L.featureGroup();
    const farbPalette = [
        [-28, "#646664"],
        [-26, "#8c8a8c"],
        [-24, "#b4b2b4"],
        [-22, "#cccecc"],
        [-20, "#e4e6e4"],
        [-18, "#772d76"],
        [-16, "#b123b0"],
        [-14, "#d219d1"],
        [-12, "#f0f"],
        [-10, "#ff94ff"],
        [-8, "#3800d1"],
        [-6, "#325afe"],
        [-4, "#2695ff"],
        [-2, "#00cdff"],
        [0, "#00fffe"],
        [2, "#007800"],
        [4, "#009d00;"],
        [6, "#00bc02"],
        [8, "#00e200"],
        [10, "#0f0"],
        [12, "#fcff00"],
        [14, "#fdf200"],
        [16, "#fde100;"],
        [18, "#ffd100"],
        [20, "#ffbd00"],
        [22, "#ffad00"],
        [24, "#ff9c00"],
        [26, "#ff7800"],
        [28, "red"],
        [30, "#f30102"],
        [32, "#d20000"],
        [34, "#c10000"],
        [36, "#b10000"],
        [38, "#a10000"],
        [40, "#900000"],
        [42, "#770100"],
        [44, "#5f0100"],
        [46, "#460101"],
        [48, "#2e0203"],
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                let color = 'red'
                for (let i = 0; i < farbPalette.length; i++) {
                    console.log(farbPalette[i], feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0]) {
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
    }).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);
}
loadStations();