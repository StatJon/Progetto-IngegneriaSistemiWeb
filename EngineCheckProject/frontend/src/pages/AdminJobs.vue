<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Employee, Job } from '../types';

export default defineComponent({
  data() {
    return {
      errorMessage: '',
      employeeName: '',
      badgeNumber: '',
      jobs: [] as Job[],
      selectedJobId: null as Job | null,
      employees: [] as Employee[],
      selectedEmployee: null as Employee | null,
    }
  },
  async mounted() {
    this.getEmployeeNameAndBadge();
    await this.getJobs();
    await this.getEmployees();
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
        const response = await axios.get('/api/job/listAllJobs');
        this.jobs = response.data;
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async getEmployees() {
      try {
        const response = await axios.get('/api/admin/listWorkerEmployees');
        this.employees = response.data;
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async setStatusJob(action: string) {
      this.errorMessage = '';
      try {
        if (!this.selectedJobId) {
          this.errorMessage = "Nessun lavoro selezionato"
          return;
        }
        let jobStatus = '';
        switch (action) {
          case 'unassign':
            jobStatus = 'Pending';
            break;
          case 'delete':
            jobStatus = 'Cancelled';
            break;
          case 'finish':
            jobStatus = 'Completed';
            break;
        }
        if (jobStatus === 'Pending') {
          await axios.post('/api/admin/unSetEmployeeJob', {
            Job_ID: this.selectedJobId.Job_ID,
            Service_ID: this.selectedJobId.Service_ID,
          });
        } else {
          await axios.post('/api/job/setStatusJobService', {
            Job_ID: this.selectedJobId.Job_ID,
            Service_ID: this.selectedJobId.Service_ID,
            Job_Status: jobStatus
          });
        }
        await this.getJobs();
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async setEmployeeJob() {
      this.errorMessage = '';
      try {
        if (!this.selectedJobId) {
          this.errorMessage = "Nessun lavoro selezionato"
          return;
        }
        if (!this.selectedEmployee) {
          this.errorMessage = "Nessun dipendente selezionato"
          return;
        }
        await axios.post('/api/admin/setEmployeeJob', {
          Job_ID: this.selectedJobId.Job_ID,
          Service_ID: this.selectedJobId.Service_ID,
          EMPLOYEE_Badge_Number: this.selectedEmployee.ID_Badge_Number
        });
        await this.getJobs();
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    goToEmployeeTable() {
      this.$router.push('/admin-employees');
    },
    async logout() {
      this.errorMessage = '';
      try {
        await axios.get('/api/auth/logout');
        sessionStorage.clear()
        this.$router.push('/login-employee');
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
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
          <button class="btn-action" @click="setStatusJob('unassign')">
            <span class="icon">›</span> Rimuovi assegnazione lavoratore
          </button>
          <button class="btn-action" @click="setStatusJob('delete')">
            <span class="icon">✓</span> Elimina lavoro
          </button>
          <button class="btn-action" @click="setStatusJob('finish')">
            <span class="icon">⊗</span> Termina lavoro
          </button>
        </div>
        <div>
          <h3> Assegna Dipendente</h3>
          <label>Nome Dipendente</label>
          <select v-model="selectedEmployee" class="input-group">
            <option v-for="employee in employees" :key="employee.ID_Badge_Number" :value="employee">
              {{ employee.First_Name }} {{ employee.Last_Name }}
            </option>
          </select>
          <button class="btn-action" @click="setEmployeeJob">
            <span class="icon">+</span> Assegna Lavoro
          </button>
        </div>
        <div class="bottom-buttons">
          <button class="btn-blue" @click="goToEmployeeTable">
            ← Passa a dipendenti
          </button>
          <button class="btn-logout" @click="logout">
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
                <th>Dipendente Assegnato</th>
                <th>Data-Ora Inizio previsto</th>
                <th>Lavoro da effettuare</th>
                <th>Tempo stimato</th>
                <th>Targa Veicolo</th>
                <th>Veicolo</th>
                <th>Telefono</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in jobs" :key="`${job.Job_ID}-${job.Service_ID}`"
                :class="{ 'selected-row': selectedJobId === job }">
                <td class="text-center">
                  <input type="radio" name="jobSelect" :value="job" v-model="selectedJobId" class="custom-checkbox" />
                </td>
                <td>{{ job.Job_ID }}-{{ job.Service_ID }}</td>
                <td>{{ job.JobService_Status }}</td>
                <td>{{ job.Worker_Name }} {{ job.Worker_Last_Name }}</td>
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
/* STILI GENERALI */
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 550px;
  /* Un po' più alta per contenere i nuovi bottoni */
}

.input-group {
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;

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

/* Bottoni Azione (Grigi) */
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

.btn-action:hover {
  background-color: #d0d0d0;
}

.icon {
  font-weight: bold;
  font-size: 16px;
}

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
  /* Blu accesso */
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.btn-blue:hover {
  background-color: #006bcf;
}

.btn-logout {
  width: 100%;
  background-color: #d9534f;
  /* Rosso */
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

.custom-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #0084ff;
  cursor: pointer;
}

.selected-row {
  background-color: #f0f8ff;
}

/* Responsive */
@media (max-width: 900px) {
  .dashboard-layout {
    flex-direction: column;
  }

  .sidebar-card {
    width: 100%;
    min-height: auto;
  }
}
</style>