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
    }catch(error: any){
      this.errorMessage = error.response.data.message
    }
    },
    async logout() {
      try {
      await axios.get('/api/auth/logout');
      sessionStorage.clear()
      this.$router.push('/login-employee');
    }catch(error: any){
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

