<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const bookingId = route.params.id;

const headerInfo = ref('Caricamento...');
const jobs = ref<any[]>([]);
const isLoading = ref(true);

// Array per tenere traccia degli ID dei lavori selezionati tramite checkbox
const selectedJobIds = ref<number[]>([]);

onMounted(async () => {
  try {
    // --- DATI DI ESEMPIO ---
    const dateTimeStr = new Date().toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit'
});
    headerInfo.value = "Benvenuto" +/*" " +*/ "\nJonathan\t" +  dateTimeStr + " " + "Veicolo AC 325ER";
    jobs.value = [
      { id: 155, status: 'da fare', startTime: '11:00', task: 'Pneumatici', estimated: '30 min', plate: 'AB 123DR' },
      { id: 275, status: 'in corso', startTime: '09:00', task: 'Cambio batteria', estimated: '15 min', plate: 'CR 123BQ' },
      { id: 290, status: 'da fare', startTime: '12:00', task: 'Controllo Freni', estimated: '45 min', plate: 'AB 123DR' }
    ];
  } catch (error) {
    console.error("Errore caricamento", error);
    headerInfo.value = "Impossibile recuperare i dati.";
  } finally {
    isLoading.value = false;
  }
});

// Testo dinamico del bottone
const buttonText = computed(() => {
  if (selectedJobIds.value.length > 0) {
    return `Cancella ${selectedJobIds.value.length} Lavori Selezionati`;
  }
  return 'Cancella Intera Prenotazione';
});

// Gestione Azione Principale
const handleAction = async () => {
  // CASO 1: Ci sono righe selezionate -> Rimuovi solo quelle
  if (selectedJobIds.value.length > 0) {
    const confirmed = confirm(`Vuoi davvero rimuovere i ${selectedJobIds.value.length} lavori selezionati?`);
    if (!confirmed) return;

    // Logica Backend simulata: Filtriamo la lista locale rimuovendo quelli selezionati
    jobs.value = jobs.value.filter(job => !selectedJobIds.value.includes(job.id));
    
    // Resetta la selezione
    selectedJobIds.value = [];
    alert("Righe rimosse con successo.");
  } 
  // CASO 2: Nessuna selezione -> Cancella tutto
  else {
    const confirmed = confirm("Sei sicuro di voler cancellare TUTTA la prenotazione?");
    if (!confirmed) return;

    try {
      // await axios.delete(...);
      alert("Prenotazione interamente cancellata.");
      router.push('/user-dashboard'); 
    } catch (error) {
      alert("Errore durante la cancellazione.");
    }
  }
};
</script>

<template>
  <div class="page-container">
    <h1 class="page-title">Rivedi l’appuntamento</h1>

    <div class="details-card">
      <h2 class="card-subtitle">{{ headerInfo }}</h2>

      <div class="table-responsive">
        <table class="jobs-table">
          <thead>
            <tr>
              <th>Prenotazione</th>
              <th>Stato</th>
              <th>Data-Ora Inizio</th>
              <th>Lavoro da effettuare</th>
              <th>Tempo</th>
              <th>Targa</th>
              <th class="text-center">Seleziona</th> </tr>
          </thead>
          <tbody>
            <tr v-if="jobs.length === 0">
              <td colspan="7" class="empty-state">Nessun lavoro presente in questa prenotazione.</td>
            </tr>
            <tr v-else v-for="job in jobs" :key="job.id" :class="{ 'row-selected': selectedJobIds.includes(job.id) }">
              <td>{{ job.id }}</td>
              <td>{{ job.status }}</td>
              <td>{{ job.startTime }}</td>
              <td>{{ job.task }}</td>
              <td>{{ job.estimated }}</td>
              <td>{{ job.plate }}</td>
              <td class="text-center">
                <input 
                  type="checkbox" 
                  :value="job.id" 
                  v-model="selectedJobIds" 
                  class="custom-checkbox"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="action-container">
      <button class="btn-cancel" @click="handleAction">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:8px"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        {{ buttonText }}
      </button>
    </div>

  </div>
</template>

<style scoped>
.page-container {
  background-color: #f0f6fc;
  min-height: 85vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 30px;
  color: #000;
  text-align: center;
}

.details-card {
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 1100px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  min-height: 400px;
}

.card-subtitle {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #000;
}

.table-responsive { width: 100%; overflow-x: auto; }

.jobs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  color: #333;
}

.jobs-table th {
  background-color: #ededed;
  font-weight: 700;
  text-align: left;
  padding: 12px;
  border: 1px solid #ccc;
}

.jobs-table td {
  border: 1px solid #ccc;
  padding: 12px;
  vertical-align: middle;
}

.text-center { text-align: center; }

/* CHECKBOX PERSONALIZZATO */
.custom-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #0084ff; /* Colore blu quando selezionato */
}

/* EVIDENZIA LA RIGA SELEZIONATA */
.row-selected {
  background-color: #f0f8ff; /* Azzurro chiarissimo */
}

.empty-state { text-align: center; padding: 20px; color: #666; font-style: italic; }

.action-container {
  margin-top: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.btn-cancel {
  background-color: #0084ff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 40px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  transition: background 0.2s;
}

.btn-cancel:hover {
  background-color: #006bcf;
}
</style>