<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

// Definiamo l'interfaccia basandoci esattamente sul tuo SQL
interface Service {
  Service_ID: number;
  Estimated_Duration_Minutes: number;
  Title: string;
  Description: string;
  Price: number;
  Vehicle_Type: 'car' | 'motorcycle';
  Category: 'maintenance' | 'repair' | 'tyres';
} 

export default defineComponent({
  data() {
    return {
      servicesCar: [] as Service[],
      selectedServices: [] as number[],
    };
  },
  computed: {
    // Filtri basati sui vincoli CHECK del tuo database
    maintenanceServices() {
      return this.servicesCar.filter(s => s.Category === 'maintenance');
    },
    tireServices() {
      return this.servicesCar.filter(s => s.Category === 'tyres');
    },
    repairServices() {
      return this.servicesCar.filter(s => s.Category === 'repair');
    }
  },
  methods: {
    async getServicesCar() {
      try {
        // Questa chiamata ora punta al tuo router Express
        const response = await axios.get("/api/service/car");
        this.servicesCar = response.data;
      } catch (error) {
        console.error("Errore nel recupero dei servizi:", error);
      }
    },
    toggleService(id: number) {
      const index = this.selectedServices.indexOf(id);
      if (index > -1) {
        this.selectedServices.splice(index, 1);
      } else {
        this.selectedServices.push(id);
      }
    },
    confirmSelection() {
      if (this.selectedServices.length === 0) {
        alert("Seleziona almeno un servizio per continuare.");
        return;
      }
      // Navigazione verso la conferma/scelta data
      this.$router.push({ 
        path: '/booking-car-confirm', 
        query: { services: this.selectedServices.join(',') } 
      });
    }
  },
  mounted() {
    this.getServicesCar();
  }
});
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Selezionare i servizi per auto da prenotare</h1>

    <div class="services-grid">
      <div class="service-column">
        <h2 class="column-title">Manutenzione Auto</h2>
        <div 
          v-for="service in maintenanceServices" 
          :key="service.Service_ID" 
          class="service-card" 
          :class="{ 'selected': selectedServices.includes(service.Service_ID) }"
          @click="toggleService(service.Service_ID)"
        >
          <div class="card-header">
            <div class="checkbox-custom">
              <span v-if="selectedServices.includes(service.Service_ID)">✔</span>
            </div>
            <span class="price-tag">{{ service.Price }} €</span>
          </div>
          <h3 class="service-title">{{ service.Title }}</h3>
          <p class="service-desc">{{ service.Description }}</p>
          <div class="service-footer">
             <i class="clock-icon">🕒</i> 
             <span>{{ service.Estimated_Duration_Minutes }} min</span>
          </div>
        </div>
      </div>

      <div class="service-column">
        <h2 class="column-title">Pneumatici</h2>
        <div 
          v-for="service in tireServices" 
          :key="service.Service_ID" 
          class="service-card"
          :class="{ 'selected': selectedServices.includes(service.Service_ID) }"
          @click="toggleService(service.Service_ID)"
        >
          <div class="card-header">
            <div class="checkbox-custom">
              <span v-if="selectedServices.includes(service.Service_ID)">✔</span>
            </div>
            <span class="price-tag">{{ service.Price }} €</span>
          </div>
          <h3 class="service-title">{{ service.Title }}</h3>
          <p class="service-desc">{{ service.Description }}</p>
          <div class="service-footer">
             <span>🕒 {{ service.Estimated_Duration_Minutes }} min</span>
          </div>
        </div>
      </div>

      <div class="service-column">
        <h2 class="column-title">Riparazioni / Cura</h2>
        <div 
          v-for="service in repairServices" 
          :key="service.Service_ID" 
          class="service-card"
          :class="{ 'selected': selectedServices.includes(service.Service_ID) }"
          @click="toggleService(service.Service_ID)"
        >
          <div class="card-header">
            <div class="checkbox-custom">
              <span v-if="selectedServices.includes(service.Service_ID)">✔</span>
            </div>
            <span class="price-tag">{{ service.Price }} €</span>
          </div>
          <h3 class="service-title">{{ service.Title }}</h3>
          <p class="service-desc">{{ service.Description }}</p>
          <div class="service-footer">
             <span>🕒 {{ service.Estimated_Duration_Minutes }} min</span>
          </div>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <button class="btn-confirm" @click="confirmSelection">
        Conferma servizi e scegli data
      </button>
    </div>
  </div>
</template>