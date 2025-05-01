<script>
import tempIcon from "../assets/icons/Temperature.svg";
import pmIcon from "../assets/icons/ParticulateMatter.svg";
import humidityIcon from "../assets/icons/Humidity.svg";
import particleIcon from "../assets/icons/Particles.svg";
import sensorIcon from "../assets/icons/Sensor.svg";
// Função para inicializar o mapa (chamado uma única vez)
function initMap(mapElementId) {
  //adiciona o mapa e as camadas de base

  var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });

  var osmHOT = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
    },
  );

  var map = L.map(mapElementId, {
    center: [-20.298157, -40.361637],
    zoom: 14,
    layers: [osm],
  });

  var baseMaps = {
    OpenStreetMap: osm,
    "OpenStreetMap.HOT": osmHOT,
  };

  var layerControl = L.control.layers(baseMaps).addTo(map);

  var openTopoMap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
    },
  );

  layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // Cria um grupo de camadas para os círculos
  const markersGroup = L.layerGroup().addTo(map);

  return { map, markersGroup };
}

// Função para atualizar o mapa com novos pontos
async function updateMap(markersGroup, selectedDate, data) {
  markersGroup.clearLayers();
  // Adiciona novos círculos ao mapa
  for (let i = 0; i < data.length; i++) {
    // console.log(data[i].latitude, data[i].longitude);
    let negativeLatitude = -Math.abs(data[i].latitude);
    let negativeLongitude = -Math.abs(data[i].longitude);
    const circle = L.circle([negativeLatitude, negativeLongitude], {
      color: `${getColor(data[i].aqi[1])}`,
      fillColor: `${getColor(data[i].aqi[1])}`,
      fillOpacity: 0.7,
      radius: 50,
    });
    // circle.bindPopup(`
    //   <b>Data: </b> ${selectedDate}<br>
    //   <b>Horário: </b> ${data[0].time}<br>
    //   <b>PM 2.5: </b> ${data[i].pm2_5}<br>
    //   <b>Temperatura: </b>${data[i].temperature}<br>
    //   <b>Humidade: </b>${data[i].humidity}<br>
    //   <b>Tamanho típico da partícula: </b>${data[i].typical_particle_size}<br>
    //   <b>Dispositivo de coleta: </b>${data[i].uid}<br>
    // `);
    circle.bindPopup(`
    <div style="display: flex; flex-direction: column; justify-content: center; gap: 15px;">
      <div style="display: flex; gap:10px; justify-content: space-between; width:100%;">
        <div style="display: flex;align-items: center;">
          <img src="${tempIcon}" alt="temperature icon" width="20" height="20">
          <b>Temperatura: </b>${data[i].temperature}°C
        </div>
        <div style="display: flex;align-items: center; gap: 5px;">
          <img src="${humidityIcon}" alt="temperature icon" width="20" height="20">
          <b>Humidade: </b>${data[i].humidity}%
        </div>
      </div>
      <div style="display: flex; gap:10px; justify-content: space-between; width:100%">
        <div style="display: flex; flex-direction: column;">
          <b>Dispositivo de<br>monitoramento:</b>
          <span style="display: flex;align-items: center;  gap: 5px;">
            <img src="${sensorIcon}" alt="temperature icon" width="20" height="20">${data[i].uid}
          </span>
        </div>
        <div style="display: flex; flex-direction: column; text-align: center;">
          <b>Tamanho típico<br>da partícula:</b>
          <span style="display: flex; justify-content: end; align-items: center;  gap: 5px;">
            ${data[i].typical_particle_size}<img src="${particleIcon}" alt="temperature icon" width="20" height="20">
          </span>
        </div>
      </div>
      <div style="display:flex; justify-content: center; width:100%">
        <div style="padding: 0.5rem; display: flex;align-items: center; gap: 5px;">
          <img src="${pmIcon}" width="20" height="20" alt="particulate matter icon">
          <b>PM 2.5:</b> <span style="font-size: 16px">${data[i].pm2_5} µg/m³</span>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; gap:10px; width:100%;">
        <div style="border: 1px solid #000; border-radius: 4px; padding: 2px 15px;">
          <b>${selectedDate}</b>
        </div>
        <div style="border: 1px solid #000; border-radius: 4px; padding: 2px 15px;">
          <b>${data[i].time}</b>
        </div>
      </div>
    </div>
    `);
    markersGroup.addLayer(circle);
  }
}

function getColor(aqiQuality) {
  switch (aqiQuality.toLowerCase()) {
    case "good":
      return "#3ab83a";
    case "moderate":
      return "#c2c200";
    case "unhealthy-for-sensitive-groups":
      return "#ff7e00";
    case "unhealthy":
      return "#ff0000";
    case "very-unhealthy":
      return "#8f3f97";
    case "hazardous":
      return "#7e0023";
  }
}

export { initMap, updateMap };
</script>
