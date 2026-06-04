<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Job {
  Job_ID: number;
  Service_ID: number;
  JobService_Status: string;
  Model: string;
  Vehicle_Type: string;
  License_Plate: string;
  Date_Time: string;
  Title: string;
  Description: string;
  Minutes: number;
  CustomerEmail: string;
  CustomerPhone: string;
}

export default defineComponent({
  data() {
    return {
      errorMessage: '',
      employeeName: '',
      badgeNumber: '',
      jobs: [] as Job[],
      selectedJobId: null as Job | null,
    }
  },
  async mounted() {
    this.getEmployeeNameAndBadge();
    await this.getJobs();
  },
  methods: {
    getEmployeeNameAndBadge() {
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      this.employeeName = `${firstName} ${lastName}`.trim();
      this.badgeNumber = sessionStorage.getItem('badgeNumber') || "";
    },
    async getJobs() {
      try {
        const response = await axios.get('/api/job/listEmployeeJobs');
        this.jobs = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async setStatusJob(action: string) {
      if (!this.selectedJobId) {
        this.errorMessage = "Nessun lavoro selezionato"
        return;
      }
      this.errorMessage = '';
      let jobStatus = '';
      switch (action) {
        case 'start':
          jobStatus = 'Working';
          break;
        case 'finish':
          jobStatus = 'Completed';
          break;
        case 'suspend':
          jobStatus = 'Assigned';
          break;
      }
      await axios.post('/api/job/setStatusJobService', { Job_ID: this.selectedJobId.Job_ID, Service_ID: this.selectedJobId.Service_ID, Job_Status: jobStatus });
      await this.getJobs();
    },
    async logout() {
      await axios.get('/api/auth/logout');
      sessionStorage.clear()
      this.$router.push('/login-employee');
    },
  }
}
)
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
          <p v-if="errorMessage" style="color: red; font-size: 13px;">{{ errorMessage }}</p>
          <h3 class="actions-title">Azioni</h3>

          <button class="btn-action" @click="setStatusJob('start')">
            <span class="icon">›</span> Inizia lavoro
          </button>

          <button class="btn-action" @click="setStatusJob('finish')">
            <span class="icon">✓</span> Termina lavoro
          </button>

          <button class="btn-action" @click="setStatusJob('suspend')">
            <span class="icon">⊗</span> Sospendi lavoro
          </button>
        </div>

        <div class="logout-wrapper">
          <button class="btn-logout" @click="logout()">
            ← Logout
          </button>
        </div>
      </aside>

      <main class="main-table-card">
        <div class="table-responsive">
          <table class="jobs-table">
            <thead>
              <tr>
                <th class="text-center">Selezione</th>
                <th>ID Lavoro</th>
                <th>Stato</th>
                <th>Data-Ora Inizio previsto</th>
                <th>Lavoro da effettuare</th>
                <th>Tempo stimato</th>
                <th>Targa Veicolo</th>
                <th>Nome Veicolo</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobs" :key="`${job.Job_ID}-${job.Service_ID}`" :class="{ 'selected-row': selectedJobId === job }">
                 <td class="text-center">
                  <input type="radio" name="jobSelect" :value="job" v-model="selectedJobId" class="custom-checkbox" />
                </td>
                <td>{{ job.Job_ID }}-{{ job.Service_ID }}</td>
                <td>{{ job.JobService_Status }}</td>
                <td>{{ job.Date_Time }}</td>
                <td>{{ job.Title }}</td>
                <td>{{ job.Minutes }}</td>
                <td>{{ job.License_Plate }}</td>
                <td>{{ job.Model }}</td>
                <td>{{ job.CustomerPhone }}</td>
               
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
  min-height: 85vh;
  /* Lascia spazio a header/footer */
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
  /* Angoli leggermente arrotondati */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  background-color: #e0e0e0;
  /* Grigio chiaro come immagine */
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
  background-color: #d9534f;
  /* Rosso spento */
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
  background-color: white;
  /* Sfondo bianco per la tabella */
  /* Se vuoi l'effetto "tabella volante" senza card dietro, rimuovi background, padding e shadow qui */
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  background-color: #e6e6e6;
  /* Intestazione grigia */
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

.text-center {
  text-align: center;
}

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