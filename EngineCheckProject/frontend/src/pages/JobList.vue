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

      <aside style="position: sticky;" class="sidebar-card">
        <div class="user-info">
          <h2 class="user-name">{{ employeeName }}</h2>
          <p class="user-badge">Numero Badge: {{ badgeNumber }}</p>
        </div>

        <hr class="divider" />

        <div class="actions-section">
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
          <button class="btn-logout-admin" @click="logout()">
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
                  <input type="radio" name="jobSelect" :value="job" v-model="selectedJobId" class="custom-checkbox"
                    :aria-label="`Seleziona lavoro ${job.Job_ID}-${job.Service_ID}`" />
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
