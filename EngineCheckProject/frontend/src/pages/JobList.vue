<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Job } from '../types';

export default defineComponent({
  data() {
    return {
      errorMessage: '',
      employeeName: '',
      badgeNumber: '',
      jobs: [] as Job[],
      selectedJobId: null as Job | null,

      sortKey: '' as string,
      sortAsc: true,
    }
  },
  computed: {
    sortedJobs(): Job[] {
      if (!this.sortKey) {
        return this.jobs;
      }
      const key = this.sortKey as keyof Job;
      return [...this.jobs].sort((a, b) => {
        const result = String(a[key] ?? '').localeCompare(String(b[key] ?? ''), undefined, { numeric: true });
        return this.sortAsc ? result : -result;
      });
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
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async setStatusJob(action: string) {
      this.errorMessage = '';
      try {
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
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    async logout() {
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
    },
    helperSortBy(key: string) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },
    helperSortArrow(key: string): string {
      if (this.sortKey !== key) return '';
      return this.sortAsc ? ' ▲' : ' ▼';
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
                <th @click="helperSortBy('Job_ID')" style="cursor: pointer;">
                  ID Lavoro{{ helperSortArrow('Job_ID') }}</th>
                <th @click="helperSortBy('JobService_Status')" style="cursor: pointer;">
                  Stato{{ helperSortArrow('JobService_Status') }}</th>
                <th @click="helperSortBy('Date_Time')" style="cursor: pointer;">
                  Data-Ora Inizio previsto{{ helperSortArrow('Date_Time') }}</th>
                <th @click="helperSortBy('Title')" style="cursor: pointer;">
                  Lavoro da effettuare{{ helperSortArrow('Title') }}</th>
                <th @click="helperSortBy('Minutes')" style="cursor: pointer;">
                  Tempo stimato{{ helperSortArrow('Minutes') }}</th>
                <th @click="helperSortBy('License_Plate')" style="cursor: pointer;">
                  Targa Veicolo{{ helperSortArrow('License_Plate') }}</th>
                <th @click="helperSortBy('Model')" style="cursor: pointer;">
                  Nome Veicolo{{ helperSortArrow('Model') }}</th>
                <th @click="helperSortBy('CustomerPhone')" style="cursor: pointer;">
                  Telefono{{ helperSortArrow('CustomerPhone') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="job in sortedJobs" :key="`${job.Job_ID}-${job.Service_ID}`"
                :class="{ 'selected-row': selectedJobId === job }">
                <td class="text-center">
                  <input type="radio" name="jobSelect" :value="job" v-model="selectedJobId" class="custom-checkbox" />
                </td>
                <td>{{ job.Job_ID }}-{{ job.Service_ID }}</td>
                <td>{{ job.JobService_Status }}</td>
                <td>{{ helperFormatDate(job.Date_Time) }}</td>
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


.logout-wrapper {
  margin-top: 30px;
}

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

.btn-logout:hover {
  background-color: #c9302c;
}


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