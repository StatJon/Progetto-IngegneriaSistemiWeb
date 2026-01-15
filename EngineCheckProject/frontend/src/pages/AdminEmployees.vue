<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// --- DATI ADMIN ---
const adminName = ref('Admin User');
const badgeNumber = ref('ADM-001');

// --- DATI DIPENDENTI (Mock) ---
// Ho sostituito i dati dei lavori con quelli dei dipendenti per coerenza con i bottoni
const employees = ref([
  {
    id: 1,
    firstName: 'Mario',
    lastName: 'Rossi',
    badge: 'BDG-101',
    role: 'Meccanico Senior',
    status: 'Attivo'
  },
  {
    id: 2,
    firstName: 'Luigi',
    lastName: 'Verdi',
    badge: 'BDG-102',
    role: 'Elettrauto',
    status: 'In Ferie'
  },
  {
    id: 3,
    firstName: 'Giovanni',
    lastName: 'Bianchi',
    badge: 'BDG-103',
    role: 'Gommista',
    status: 'Attivo'
  }
]);

// IDs selezionati
const selectedEmpIds = ref<number[]>([]);

// --- LOGICA AZIONI ---
const handleAction = (action: string) => {
  if (action === 'remove' && selectedEmpIds.value.length === 0) {
    alert("Seleziona almeno un dipendente da rimuovere.");
    return;
  }

  switch(action) {
    case 'add':
      // Qui apriresti un modale o andresti a una pagina di creazione
      const newName = prompt("Inserisci nome del nuovo dipendente:");
      if (newName) {
        employees.value.push({
          id: Date.now(),
          firstName: newName,
          lastName: 'Nuovo',
          badge: `BDG-${Math.floor(Math.random()*1000)}`,
          role: 'Apprendista',
          status: 'Attivo'
        });
      }
      break;
      
    case 'remove':
      if(confirm(`Sei sicuro di voler rimuovere ${selectedEmpIds.value.length} dipendenti?`)) {
        employees.value = employees.value.filter(e => !selectedEmpIds.value.includes(e.id));
        selectedEmpIds.value = [];
      }
      break;
  }
};

const goToJobsList = () => {
  router.push('/admin-jobs'); // Torna alla dashboard lavori
};

const handleLogout = () => {
  router.push('/login-user');
};
</script>

<template>
  <div class="page-container">
    <div class="dashboard-layout">
      
      <aside class="sidebar-card">
        <div class="user-info">
          <h2 class="user-name">{{ adminName }}</h2>
          <p class="user-badge">Numero Badge: {{ badgeNumber }}</p>
        </div>

        <hr class="divider" />

        <div class="actions-section">
          <h3 class="actions-title">Azioni</h3>
          
          <button class="btn-action" @click="handleAction('add')">
            <span class="icon">›</span> Aggiungi dipendente
          </button>

          <button class="btn-action" @click="handleAction('remove')">
            <span class="icon">✓</span> Rimuovi dipendente
          </button>
        </div>

        <div class="bottom-buttons">
          <button class="btn-blue" @click="goToJobsList">
            ← Passa a lavori
          </button>
          
          <button class="btn-logout" @click="handleLogout">
            ← Logout
          </button>
        </div>
      </aside>

      <main class="main-table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cognome</th>
                <th>Badge</th>
                <th>Ruolo</th>
                <th>Stato</th>
                <th class="text-center">Selezione</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emp in employees" :key="emp.id" :class="{'selected-row': selectedEmpIds.includes(emp.id)}">
                <td>{{ emp.id }}</td>
                <td>{{ emp.firstName }}</td>
                <td>{{ emp.lastName }}</td>
                <td>{{ emp.badge }}</td>
                <td>{{ emp.role }}</td>
                <td><span class="status-badge" :class="emp.status === 'Attivo' ? 'green' : 'orange'">{{ emp.status }}</span></td>
                <td class="text-center">
                  <input 
                    type="checkbox" 
                    :value="emp.id" 
                    v-model="selectedEmpIds" 
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
/* STILI GENERALI (Identici a AdminDashboard) */
.page-container {
  background-color: #f0f6fc;
  min-height: 85vh;
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
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.user-info { text-align: center; margin-bottom: 20px; }
.user-name { font-size: 22px; font-weight: 700; margin: 0 0 5px 0; color: #333; }
.user-badge { font-size: 14px; color: #666; margin: 0; }
.divider { border: 0; border-top: 1px solid #eee; margin: 20px 0; }

.actions-section { flex-grow: 1; }
.actions-title { font-size: 18px; font-weight: 700; margin-bottom: 15px; text-align: center; }

/* Bottoni Azione */
.btn-action {
  width: 100%;
  background-color: #e0e0e0;
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
.btn-action:hover { background-color: #d0d0d0; }
.icon { font-weight: bold; font-size: 16px; }

/* Bottoni in basso */
.bottom-buttons {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn-blue {
  width: 100%;
  background-color: #0084ff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-blue:hover { background-color: #006bcf; }

.btn-logout {
  width: 100%;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.btn-logout:hover { background-color: #c9302c; }

/* --- TABELLA --- */
.main-table-card {
  flex-grow: 1;
  background-color: white;
  padding: 0; 
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.table-responsive { width: 100%; overflow-x: auto; }

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.data-table th {
  background-color: #e6e6e6;
  font-weight: 700;
  padding: 12px;
  border: 1px solid #ccc;
  color: #333;
}

.data-table td {
  border: 1px solid #ccc;
  padding: 10px;
  vertical-align: middle;
}

.text-center { text-align: center; }
.custom-checkbox { width: 18px; height: 18px; accent-color: #0084ff; cursor: pointer; }
.selected-row { background-color: #f0f8ff; }

/* Badge stato */
.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}
.status-badge.green { background-color: #d4edda; color: #155724; }
.status-badge.orange { background-color: #fff3cd; color: #856404; }

/* Responsive */
@media (max-width: 900px) {
  .dashboard-layout { flex-direction: column; }
  .sidebar-card { width: 100%; min-height: auto; }
}
</style>