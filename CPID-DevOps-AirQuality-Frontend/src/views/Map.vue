<template>
  <div>
    <div class="container">
      <div class="header-home">
        <HeaderHome />
      </div>
      <div class="button-filter">
        <button @click="show()">
          <img
            src="@/assets/icons/Eye.svg"
            alt="eye-visible"
            width="20"
            height="20"
          />
          {{ textButton }}
        </button>
      </div>
    </div>

    <div class="container-header">
      <header v-if="showHeader">
        <nav>
          <ul>
            <div>
              Selecione a data
              <InputComponent
                type="date"
                :value="currentDate"
                id="datePicker"
              />
            </div>
            <div>
              Hora Inicial
              <InputComponent
                type="time"
                value="00:00:00"
                id="initialTime"
                step="1"
              />
            </div>
            <div>
              Hora Final
              <InputComponent
                type="time"
                value="20:59:59"
                id="finalTime"
                step="1"
              />
            </div>

            <div>
              <ButtonComponent
                id="btn-submit"
                text="Confirmar"
                @click="updateFilterMap"
              />
            </div>
          </ul>
        </nav>
        <div></div>
      </header>
    </div>
    <div id="map"></div>
    <button @click="toogleLegend()" id="btn-legend">
      <img
        src="@/assets/icons/Eye.svg"
        alt="eye-visible"
        width="20"
        height="20"
      />
    </button>
    <AqiLegend class="legend" v-if="showLegend" />
    <Footer />
  </div>
</template>

<script>
import { initMap, updateMap } from "@/utilities/Utilities.vue";
import ButtonComponent from "@/components/Button.vue";
import InputComponent from "@/components/Inputs.vue";
import AqiLegend from "@/components/AqiLegend.vue";
import HeaderHome from "../components/HeaderHome.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    ButtonComponent,
    InputComponent,
    AqiLegend,
    HeaderHome,
    Footer,
  },
  data() {
    return {
      map: null,
      markersGroup: null,
      currentDate: this.getCurrentDate(),
      showHeader: true,
      showLegend: true,
      textButton: "Esconder Filtro",
      tempIcon: "../assets/icons/Temperature.svg",
    };
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async updateFilterMap() {
      const selectedDate = document.getElementById("datePicker").value;
      const initialTime = document.getElementById("initialTime").value;
      const finalTime = document.getElementById("finalTime").value;

      // Adiciona 3 horas ao horário para corrigir temporariamente
      const initialTimeFixed = this.subtractHours(initialTime, 3);
      const finalTimeFixed = this.subtractHours(finalTime, 3);

      // const intervalHour = [initialTimeFixed, finalTimeFixed];
      // console.log(intervalHour);

      const hostname = "localhost:18003";

      const query = `?date_reference=${selectedDate}&start_time=${initialTimeFixed}&end_time=${finalTimeFixed}`;

      const url = `http://${hostname}/sensorData/${query}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });

        const data = await response.json();
        updateMap(this.markersGroup, selectedDate, data);
      } catch (error) {
        console.error("Erro ao buscar coordenadas:", error);
      }
    },
    subtractHours(time, hours) {
      const [hour, minute, second] = time.split(":").map(Number);
      const date = new Date();
      date.setHours(hour, minute, second);
      date.setHours(date.getHours() + hours);
      return date.toTimeString().split(" ")[0];
    },
    show() {
      if (this.showHeader === false) {
        this.textButton = "Esconder Filtro";
        this.showHeader = true;
      } else {
        this.textButton = "Mostrar Filtro";
        this.showHeader = false;
      }
    },
    toogleLegend() {
      if (this.showLegend === false) {
        this.showLegend = true;
      } else {
        this.showLegend = false;
      }
    },
  },
  mounted() {
    const { map, markersGroup } = initMap("map");
    this.map = map;
    this.markersGroup = markersGroup;

    this.updateFilterMap();
    // Atualiza o mapa a cada 5 segundos
    // setInterval(this.updateFilterMap, 5000);
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #bfbea0;
}

.header-home {
  width: 100%;
}

.button-filter {
  position: absolute;
  right: 30px;
  top: 20px;
}
.container-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bfbea0;
  position: absolute;
  z-index: 1;
  width: 100%;
}

header {
  background-color: #bfbea0;
  color: rgb(0, 0, 0);
  font-weight: bold;
  padding: 10px;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: center;
  border-top: solid 1px black;
}

nav ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  list-style: none;
  padding: 0;
}

nav ul div {
  display: flex;
  align-items: center;
  gap: 10px;
}

nav ul div input {
  padding: 5px;
}

nav ul div input[type="date"],
nav ul div input[type="time"] {
  width: 150px;
  border-radius: 4px;
  border: none;
}

nav ul div button {
  padding: 5px;
  background-color: #ffffff;
  color: #000000;
  font-weight: bold;
  border: 1px solid #bfbea0;
  border-radius: 5px;
  width: 100px;
  height: 35px;
  cursor: pointer;
}

.button-filter button {
  /* width: 100px;*/
  height: 35px;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
  color: #000;
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
}

#map {
  height: 87vh;
  width: 100%;
  position: relative;
  z-index: 0;
}

.legend {
  position: absolute;
  bottom: 5vh;
  right: 0;
  z-index: 1;
}

#btn-legend {
  position: absolute;
  bottom: 32vh;
  width: 50px;
  height: 50px;
  right: 1px;
  z-index: 2;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>
