<script setup lang="ts">
import { ref, /*computed*/ } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- DATI DIPENDENTE (Mock) ---
const employeeName = ref('Mario Rossi');
const badgeNumber = ref('BDG-8854');

// --- DATI LAVORI (Mock come da immagine) ---
const jobs = ref([
  {
    id: 155,
    status: 'da fare',
    startTime: '11:00',
    task: 'Pneumatici',
    estimated: '30 min',
    plate: 'AB 123DR'
  },
  {
    id: 275,
    status: 'in corso',
    startTime: '9:00',
    task: 'cambio batteria',
    estimated: '15 min',
    plate: 'CR 123BQ'
  }
]);

// IDs dei lavori selezionati
const selectedJobIds = ref<number[]>([]);

// --- LOGICA AZIONI ---
const handleAction = (action: string) => {
  if (selectedJobIds.value.length === 0) {
    alert("Seleziona almeno un lavoro dalla tabella.");
    return;
  }
  
  const ids = selectedJobIds.value.join(', ');
  
  switch(action) {
    case 'start':
      alert(`Lavoro avviato per ID: ${ids}`);
      // Qui chiameresti l'API per aggiornare lo stato a "in corso"
      break;
    case 'finish':
      alert(`Lavoro terminato per ID: ${ids}`);
      // Qui chiameresti l'API per completare il lavoro
      // E magari rimuoverlo dalla lista
      break;
    case 'suspend':
      alert(`Lavoro sospeso per ID: ${ids}`);
      break;
  }
};

const handleLogout = () => {
  // Logica di logout
  router.push('/login-user'); // O la pagina di login corretta
};
</script>

<template>
  <div class="page-container">
    <div class="dashboard-layout">
      
      <aside class="sidebar-card">
        <div class="user-info">
          <h2 class="user-name">{{ employeeName }}</h2>
          <p class="user-badge">Numero Badge: {{ badgeNumber }}</p>
        </div>

        <hr class="divider" />

        <div class="actions-section">
          <h3 class="actions-title">Azioni</h3>
          
          <button class="btn-action" @click="handleAction('start')">
            <span class="icon">›</span> Inizia lavoro
          </button>

          <button class="btn-action" @click="handleAction('finish')">
            <span class="icon">✓</span> Termina lavoro
          </button>

          <button class="btn-action" @click="handleAction('suspend')">
            <span class="icon">⊗</span> Sospendi lavoro
          </button>
        </div>

        <div class="logout-wrapper">
          <button class="btn-logout" @click="handleLogout">
            ← Logout
          </button>
        </div>
      </aside>

      <main class="main-table-card">
        <div class="table-responsive">
          <table class="jobs-table">
            <thead>
              <tr>
                <th>ID Lavoro</th>
                <th>Stato</th>
                <th>Data-Ora Inizio previsto</th>
                <th>Lavoro da effettuare</th>
                <th>Tempo stimato</th>
                <th>Targa Veicolo</th>
                <th class="text-center">Selezione</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobs" :key="job.id" :class="{'selected-row': selectedJobIds.includes(job.id)}">
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
      </main>

    </div>
  </div>
</template>

<style scoped>
.page-container {
  background-color: #f0f6fc;
  min-height: 85vh; /* Lascia spazio a header/footer */
  padding: 40px 20px;
  font-family: 'Segoe UI', sans-serif;
}

.dashboard-layout {
  display: flex;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: flex-start;
}

/* --- SIDEBAR --- */
.sidebar-card {
  background-color: white;
  width: 300px;
  padding: 30px;
  border-radius: 8px; /* Angoli leggermente arrotondati */
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.user-info {
  text-align: center;
  margin-bottom: 20px;
}

.user-name {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: #333;
}

.user-badge {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.divider {
  border: 0;
  border-top: 1px solid #eee;
  margin: 20px 0;
}

.actions-section {
  flex-grow: 1;
}

.actions-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
}

.btn-action {
  width: 100%;
  background-color: #e0e0e0; /* Grigio chiaro come immagine */
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background 0.2s;
}

.btn-action:hover {
  background-color: #d0d0d0;
}

.icon {
  font-weight: bold;
  font-size: 16px;
}

/* Bottone Rosso Logout */
.logout-wrapper {
  margin-top: 30px;
}

.btn-logout {
  width: 100%;
  background-color: #d9534f; /* Rosso spento */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #c9302c;
}

/* --- TABELLA --- */
.main-table-card {
  flex-grow: 1;
  background-color: white; /* Sfondo bianco per la tabella */
  /* Se vuoi l'effetto "tabella volante" senza card dietro, rimuovi background, padding e shadow qui */
  padding: 0; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

.jobs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.jobs-table th {
  background-color: #e6e6e6; /* Intestazione grigia */
  font-weight: 700;
  padding: 12px;
  border: 1px solid #ccc;
  color: #333;
}

.jobs-table td {
  border: 1px solid #ccc;
  padding: 10px;
  vertical-align: middle;
}

.text-center { text-align: center; }

/* Checkbox Blu */
.custom-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #0084ff;
  cursor: pointer;
}

/* Evidenzia riga selezionata */
.selected-row {
  background-color: #f0f8ff;
}

/* RESPONSIVE */
@media (max-width: 800px) {
  .dashboard-layout {
    flex-direction: column;
  }
  .sidebar-card {
    width: 100%;
    min-height: auto;
  }
}
</style>