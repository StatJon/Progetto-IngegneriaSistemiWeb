<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

// Definiamo l'interfaccia basandoci esattamente sul tuo SQL
interface Service {
  Service_ID: number;
  Minutes: number;
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
        const response = await axios.get("/api/service/motorcycle");
        console.log(response.status);
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
    <h1 class="page-title">Selezionare i servizi per Moto da prenotare</h1>

    <div class="services-grid">
      <div class="service-column">
        <h2 class="column-title">Manutenzione Moto</h2>
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
             <span>{{ service.Minutes }} min</span>
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
             <span>🕒 {{ service.Minutes }} min</span>
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
             <span>🕒 {{ service.Minutes }} min</span>
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
<style scoped>
/* CONTAINER GENERALE */
.page-container {
  background-color: #f0f6fc; /* Colore sfondo azzurrino */
  min-height: 100vh;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Segoe UI', sans-serif;
}

.page-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: #000;
}

/* GRIGLIA */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonne uguali */
  gap: 20px;
  width: 100%;
  max-width: 1200px;
}

/* Responsive: diventa 1 colonna su cellulare */
@media (max-width: 900px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

.column-title {
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin-bottom: 25px;
  color: #000;
}

/* STILE CARD */
.service-card {
  background-color: white; /* Sfondo bianco */
  border: 1px solid #c0c0c0; /* Bordo grigio */
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  min-height: 190px;
  position: relative;
}

/* Hover sulla card */
.service-card:hover {
  border-color: #0084ff;
  box-shadow: 0 4px 10px rgba(0, 132, 255, 0.1);
}

/* Stato SELEZIONATO */
.service-card.selected {
  border: 2px solid #0084ff; /* Bordo blu */
  background-color: #ffffff;
}

/* HEADER CARD (Checkbox + Prezzo) */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

/* Checkbox personalizzato */
.checkbox-custom {
  width: 24px;
  height: 24px;
  background-color: #c0c0c0; /* Grigio spento */
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.2s;
}

.service-card.selected .checkbox-custom {
  background-color: #0084ff; /* Blu acceso quando selezionato */
}

/* Prezzo */
.price-tag {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

/* TESTI */
.service-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #222;
}

.service-desc {
  font-size: 14px;
  color: #555;
  line-height: 1.4;
  margin-bottom: 15px;
  flex-grow: 1; /* Spinge il footer in basso */
}

/* FOOTER (Orologio + Durata) */
.service-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 13px;
  font-weight: 500;
}

/* BARRA DELLE AZIONI (Bottone blu in fondo) */
.action-bar {
  margin-top: 40px;
  text-align: center;
}

.btn-confirm {
  background-color: #0084ff; /* Blu brillante */
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px 40px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: background 0.2s;
}

.btn-confirm:hover {
  background-color: #006bcf;
}
</style>