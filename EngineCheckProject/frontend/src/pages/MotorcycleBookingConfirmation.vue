<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();

// --- 1. RECUPERO DATI SERVIZI (Copia statica per visualizzazione) ---
// In un'app reale, questi dati potrebbero venire da uno Store (Pinia) o ricaricati dal Backend
const allServices = [
  { id: 1, title: 'Tagliando completo', description: 'Controllo filtri, olio, freni...', priceRange: '100 - 200 €', duration: '1,5 - 3 ore' },
  { id: 2, title: 'Sostituzione pastiglie freni', description: 'Sostituzione anteriore/posteriore.', priceRange: '80 - 150 €', duration: '1 - 2 ore' },
  { id: 3, title: 'Revisione e manutenzione', description: 'Controllo scarico e catalizzatore.', priceRange: '150 - 400 €', duration: '1 - 3 ore' },
  { id: 4, title: 'Pneumatici', description: 'Montaggio ed equilibratura.', priceRange: '20 - 50 €/p', duration: '30 - 60 min' },
  { id: 5, title: 'Diagnosi elettronica (OBD)', description: 'Check centralina errori.', priceRange: '300 - 600 €', duration: '3 - 6 ore' },
  { id: 6, title: 'Cinghia di distribuzione', description: 'Sostituzione cinghia.', priceRange: '60 - 120 €', duration: '30 - 60 min' },
  { id: 7, title: 'Manutenzione clima', description: 'Ricarica gas e pulizia.', priceRange: '80 - 150 €', duration: '1 - 2 ore' },
  { id: 8, title: 'Riparazione freni', description: 'Dischi o tubi freno.', priceRange: '100 - 300 €', duration: '2 - 4 ore' },
  { id: 9, title: 'Sostituzione batteria', description: 'Nuova batteria e check.', priceRange: '80 - 150 €', duration: '15 - 30 min' },
];

const selectedServices = ref<any[]>([]);
const serviceIds = ref<number[]>([]);

// --- 2. STATO DEL FORM ---
const vehicleType = ref('');
const vehiclePlate = ref('');
const selectedYear = ref('');
const selectedMonth = ref('');
const selectedDay = ref('');
//const selectedTimeSlot = ref('');



// --- 3. LOGICA CALENDARIO (Semplificata per il mese corrente) ---

// --- 4. INIZIALIZZAZIONE ---
onMounted(() => {
  // Leggi query params dalla URL (es: ?services=1,4,7)
  const queryServices = route.query.services as string;

  if (queryServices) {
    const ids = queryServices.split(',').map(Number);
    serviceIds.value = ids;
    // Filtra i servizi completi basandosi sugli ID
    selectedServices.value = allServices.filter(s => ids.includes(s.id));
  } else {
    // Se non ci sono servizi, torna indietro
    router.push('/services-selection');
  }
});

//const goBack = () => {
// router.back();
//};

// --- 5. INVIO PRENOTAZIONE ---
const bookingData = {
  vehicleType: vehicleType.value,
  vehiclePlate: vehiclePlate.value,
  date: {
    year: selectedYear.value,
    month: selectedMonth.value,
    day: selectedDay.value
  },
  //timeSlot: selectedTimeSlot.value,
  services: serviceIds.value // Gli ID recuperati nell'onMounted
};
const checkAvailable = async () => {
  try {
    const response = await axios.get(
      `/api/booking/checkDayAvailable/2026-01`
    );
    alert(response);
    /*
    // 1. Estraiamo i dati dal tuo oggetto bookingData
    // Usiamo il template literal per creare la stringa yearMonth
    // Esempio risultato: "2024-05"
    const yearMonthParam = `${bookingData.date.year}-${bookingData.date.month}`;

    // 2. Eseguiamo la GET passando il parametro nell'URL
    const response = await axios.get(
      `/api/booking/checkDayAvailable/${yearMonthParam}`
    );

    console.log("Risposta dal backend:", response.data);
    alert(response.data);
    // Qui potresti aggiornare la UI con i giorni disponibili ricevuti
    // es: availableDays.value = response.data;
    */
  } catch (error) {
    console.error("Errore durante il controllo disponibilità:", error);
    alert(error);
  }
};
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Selezionare la data dell’appuntamento</h1>

    <div class="layout-grid">

      <div class="left-column">
        <h2 class="section-title">Riepilogo servizi prenotati</h2>

        <div class="services-list">
          <div v-for="service in selectedServices" :key="service.id" class="summary-card">
            <div class="card-check">✔</div>
            <div class="card-content">
              <h3 class="s-title">{{ service.title }}</h3>
              <p class="s-desc">{{ service.description }}</p>
              <div class="s-footer">

                <span class="s-price">{{ service.priceRange }}</span>
              </div>
            </div>
          </div>
        </div>

        <button class="btn-back" @click="">
          ← Rivedi scelte
        </button>
      </div>

      <div class="right-column">
        <h2 class="section-title">Prenota l’appuntamento</h2>

        <div class="booking-form-card">

          <div class="form-group">
            <label>Tipo Veicolo</label>
            <input type="text" v-model="vehicleType" placeholder="Es. Moto, Auto, SUV" />
          </div>

          <div class="form-group">
            <label>Targa veicolo</label>
            <input type="text" v-model="vehiclePlate" placeholder="Inserisci targa" />
          </div>



          <hr class="divider" />


          <div calss="Calendar">
            <label>Anno</label>
            <input type="text" v-model="bookingData.date.year" @change="checkAvailable" placeholder="Anno">

            <label>Mese</label>
            <input type="text" v-model="bookingData.date.month" @change="checkAvailable" placeholder="mese">

            <label> giorno </label>
            <input type="text" v-model="selectedDay" placeholder="giorno">


          </div>



          <div class="time-selector">
            <label for="orari">Scegli una fascia oraria:</label>

            <select name="fascia-oraria" id="orari">
              <option value="08:30-09:00">08:30 - 09:00</option>
              <option value="09:00-09:30">09:00 - 09:30</option>
              <option value="09:30-10:00">09:30 - 10:00</option>
              <option value="10:00-10:30">10:00 - 10:30</option>
              <option value="10:30-11:00">10:30 - 11:00</option>
              <option value="11:00-11:30">11:00 - 11:30</option>
              <option value="11:30-12:00">11:30 - 12:00</option>
              <option value="12:00-12:30">12:00 - 12:30</option>
              <option value="12:30-13:00">12:30 - 13:00</option>
              <option value="13:00-13:30">13:00 - 13:30</option>
              <option value="13:30-14:00">13:30 - 14:00</option>
              <option value="14:00-14:30">14:00 - 14:30</option>
              <option value="14:30-15:00">14:30 - 15:00</option>
              <option value="15:00-15:30">15:00 - 15:30</option>
              <option value="15:30-16:00">15:30 - 16:00</option>
              <option value="16:00-16:30">16:00 - 16:30</option>
              <option value="16:30-17:00">16:30 - 17:00</option>
              <option value="17:00-17:30">17:00 - 17:30</option>
              <option value="17:30-18:00">17:30 - 18:00</option>
              <option value="18:00-18:30">18:00 - 18:30</option>
              <option value="18:30-19:00">18:30 - 19:00</option>
            </select>
          </div>

          <button class="btn-submit" @click="checkAvailable">
            Conferma prenotazione ✓
          </button>
          <button @click="checkAvailable"> controlla </button>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-color: #f0f6fc;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
}

.page-title {
  text-align: center;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 40px;
}

.layout-grid {
  display: flex;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
}

/* COLONNA SINISTRA */
.left-column {
  flex: 1;
  max-width: 400px;
}

.section-title {
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
}

.summary-card {
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  gap: 15px;
}

.card-check {
  background: #ccc;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
}

.s-title {
  font-size: 15px;
  font-weight: bold;
  margin: 0 0 5px 0;
}

.s-desc {
  font-size: 13px;
  color: #666;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.s-footer {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: bold;
  color: #444;
}

.btn-back {
  width: 100%;
  padding: 12px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
}

.btn-back:hover {
  background-color: #006bcf;
}


/* COLONNA DESTRA */
.right-column {
  flex: 2;
}

.booking-form-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.form-group textarea {
  height: 80px;
  resize: vertical;
}

.divider {
  margin: 30px 0;
  border: 0;
  border-top: 1px solid #eee;
}

/* CALENDARIO */
.calendar-wrapper {
  max-width: 350px;
  margin: 0 auto 30px auto;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px;
  background: #fff;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-weight: bold;
}

.calendar-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  text-align: center;
}

.day-name {
  font-size: 12px;
  color: #888;
  margin-bottom: 5px;
}

.day-number {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  font-size: 14px;
}

.day-number:hover {
  background-color: #f0f0f0;
}

.day-number.selected {
  background-color: #333;
  color: white;
}

/* TIME SELECTOR */
.time-selector {
  text-align: center;
  margin-bottom: 30px;
}

.time-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: #e0dcf5;
  /* Colore viola chiaro tipo immagine */
  padding: 10px;
  border-radius: 12px;
  width: fit-content;
  margin: 10px auto;
}

.time-inputs select {
  background: transparent;
  border: none;
  font-size: 32px;
  font-weight: bold;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.btn-submit {
  width: 100%;
  padding: 15px;
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #006bcf;
}

/* Responsive */
@media (max-width: 800px) {
  .layout-grid {
    flex-direction: column;
  }

  .left-column,
  .right-column {
    width: 100%;
    max-width: none;
  }
}
</style>