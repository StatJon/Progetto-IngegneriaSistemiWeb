<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 1. DATI STATICI (Copiati esattamente dalla tua immagine)
const servicesData = [
  // COLONNA 1: Manutenzione Auto
  {
    id: 1,
    category: 'Manutenzione Auto',
    title: 'Tagliando completo',
    description: 'Controllo e sostituzione di filtri (aria, olio, carburante), olio motore, controllo freni, luci e liquidi.',
    priceRange: '100 - 200 €',
    duration: '1,5 - 3 ore'
  },
  {
    id: 2,
    category: 'Manutenzione Auto',
    title: 'Sostituzione pastiglie dei freni',
    description: 'Smontaggio e sostituzione delle pastiglie dei freni anteriori o posteriori.',
    priceRange: '80 - 150 €',
    duration: '1 - 2 ore'
  },
  {
    id: 3,
    category: 'Manutenzione Auto',
    title: 'Revisione e manutenzione',
    description: 'Controllo e riparazione del sistema di scarico, inclusa la sostituzione del catalizzatore o del silenziatore.',
    priceRange: '150 - 400 €',
    duration: '1 - 3 ore'
  },
  // COLONNA 2: Pneumatici
  {
    id: 4,
    category: 'Pneumatici',
    title: 'Pneumatici',
    description: 'Montaggio, equilibratura e, se necessario, sostituzione di pneumatici usurati.',
    priceRange: '20 - 50 €/p',
    duration: '30 - 60 minuti per pneumatico'
  },
  {
    id: 5,
    category: 'Pneumatici',
    title: 'Diagnosi elettronica (OBD)',
    description: 'Collegamento della centralina per individuare malfunzionamenti elettronici o guasti.',
    priceRange: '300 - 600 €',
    duration: '3 - 6 ore'
  },
  {
    id: 6,
    category: 'Pneumatici',
    title: 'Cinghia di distribuzione',
    description: 'Rimozione e sostituzione della cinghia di distribuzione, fondamentale per il sincronismo del motore.',
    priceRange: '60 - 120 €',
    duration: '30 - 60 minuti'
  },
  // COLONNA 3: Cura del veicolo
  {
    id: 7,
    category: 'Cura del veicolo',
    title: 'Manutenzione impianto di climatizzazione',
    description: 'Ricarica gas refrigerante, controllo e pulizia del sistema aria condizionata.',
    priceRange: '80 - 150 €',
    duration: '1 - 2 ore'
  },
  {
    id: 8,
    category: 'Cura del veicolo',
    title: 'Riparazione impianto frenante',
    description: 'Sostituzione o riparazione di dischi, tubi freno o cambio del liquido freni.',
    priceRange: '100 - 300 €',
    duration: '2 - 4 ore'
  },
  {
    id: 9,
    category: 'Cura del veicolo',
    title: 'Sostituzione batteria',
    description: 'Rimozione e installazione di una nuova batteria fornita da noi, controllo del sistema di ricarica.',
    priceRange: '80 - 150 €',
    duration: '15 - 30 minuti'
  }
];

// Stato per tenere traccia degli ID selezionati
const selectedServices = ref<number[]>([]); 
const router = useRouter();

// 2. FILTRI PER COLONNA (Computed properties)
const maintenanceServices = computed(() => servicesData.filter(s => s.category === 'Manutenzione Auto'));
const tireServices = computed(() => servicesData.filter(s => s.category === 'Pneumatici'));
const careServices = computed(() => servicesData.filter(s => s.category === 'Cura del veicolo'));

// 3. LOGICA DI SELEZIONE (Toggle)
const toggleService = (id: number) => {
  if (selectedServices.value.includes(id)) {
    // Rimuovi se già presente
    selectedServices.value = selectedServices.value.filter(sId => sId !== id);
  } else {
    // Aggiungi se non presente
    selectedServices.value.push(id);
  }
};

// 4. NAVIGAZIONE ALLA PROSSIMA PAGINA
const confirmSelection = () => {
  if (selectedServices.value.length === 0) {
    alert("Per favore, seleziona almeno un servizio per procedere.");
    return;
  }
  
  // Passiamo gli ID dei servizi scelti via URL (Query Params)
  // Esempio URL finale: /booking-date?services=1,4,7
  router.push({ 
    path: '/booking-car-confirm', 
    query: { services: selectedServices.value.join(',') } 
  });
};
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Selezionare i servizi per auto da prenotare</h1>

    <div class="services-grid">
      
      <div class="service-column">
        <h2 class="column-title">Manutenzione Auto</h2>
        <div 
          v-for="service in maintenanceServices" 
          :key="service.id" 
          class="service-card" 
          :class="{ 'selected': selectedServices.includes(service.id) }"
          @click="toggleService(service.id)"
        >
          <div class="card-header">
            <div class="checkbox-custom">
              <span v-if="selectedServices.includes(service.id)">✔</span>
            </div>
            <span class="price-tag">{{ service.priceRange }}</span>
          </div>
          
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          
          <div class="service-footer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span class="duration-text">{{ service.duration }}</span>
          </div>
        </div>
      </div>

      <div class="service-column">
        <h2 class="column-title">Pneumatici</h2>
        <div 
          v-for="service in tireServices" 
          :key="service.id" 
          class="service-card"
          :class="{ 'selected': selectedServices.includes(service.id) }"
          @click="toggleService(service.id)"
        >
          <div class="card-header">
            <div class="checkbox-custom">
              <span v-if="selectedServices.includes(service.id)">✔</span>
            </div>
            <span class="price-tag">{{ service.priceRange }}</span>
          </div>
          
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          
          <div class="service-footer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span class="duration-text">{{ service.duration }}</span>
          </div>
        </div>
      </div>

      <div class="service-column">
        <h2 class="column-title">Cura del veicolo</h2>
        <div 
          v-for="service in careServices" 
          :key="service.id" 
          class="service-card"
          :class="{ 'selected': selectedServices.includes(service.id) }"
          @click="toggleService(service.id)"
        >
          <div class="card-header">
            <div class="checkbox-custom">
              <span v-if="selectedServices.includes(service.id)">✔</span>
            </div>
            <span class="price-tag">{{ service.priceRange }}</span>
          </div>
          
          <h3 class="service-title">{{ service.title }}</h3>
          <p class="service-desc">{{ service.description }}</p>
          
          <div class="service-footer">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            <span class="duration-text">{{ service.duration }}</span>
          </div>
        </div>
      </div>

    </div>

    <div class="action-bar">
      <button class="btn-confirm" @click="confirmSelection">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
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