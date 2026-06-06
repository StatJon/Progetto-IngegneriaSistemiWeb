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
            default:
              this.errorMessage = "Erorre: Azione non valida";
              return
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
        this.selectedJobId = null
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
        this.selectedJobId = null
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
    helperFormatDate(dateString: string): string {
      const date = new Date(dateString);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      const hh = String(date.getHours()).padStart(2, '0');
      const min = String(date.getMinutes()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
    }
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
          <button class="btn-logout-admin " @click="logout">
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
                <td>{{ helperFormatDate(job.Date_Time) }}</td>
                <td>{{ job.Description }}</td>
                <td>{{ job.Minutes }} minuti</td>
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

 