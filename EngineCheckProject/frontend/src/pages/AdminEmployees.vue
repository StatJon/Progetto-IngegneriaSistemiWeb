<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import type { Employee } from '../types';

export default defineComponent({
  data() {
    return {
      employeeName: '',
      badgeNumber: '',
      errorMessage: '',
      employees: [] as Employee[],
      selectedEmployee: null as Employee | null,
    }
  },

  async mounted() {
    this.getEmployeeNameAndBadge();
    this.getEmployees();
  },

  methods: {
    getEmployeeNameAndBadge() {
      const firstName = sessionStorage.getItem('firstName');
      const lastName = sessionStorage.getItem('lastName');
      this.employeeName = `${firstName} ${lastName}`.trim();
      this.badgeNumber = sessionStorage.getItem('badgeNumber') || "";
    },
    async getEmployees() {
      try {
        const response = await axios.get('/api/admin/listAllEmployees');
        this.employees = response.data;
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    goToAddEmployee() {
      this.$router.push('/add-employee');
    },
    async removeEmployee() {
      try {
        if (!this.selectedEmployee) {
          this.errorMessage = "Nessun dipendente selezionato"
          return;
        }
        this.errorMessage = '';
        await axios.post('/api/admin/removeEmployee', { ID_Badge_Number: this.selectedEmployee.ID_Badge_Number })
        await this.getEmployees();
      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    },
    goToJobsTable() {
      this.$router.push('/admin-jobs');
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

          <button class="btn-action" @click="goToAddEmployee">
            <span class="icon">›</span> Aggiungi dipendente
          </button>

          <button class="btn-action" @click="removeEmployee">
            <span class="icon">✓</span> Rimuovi dipendente
          </button>
        </div>

        <div class="bottom-buttons">
          <button class="btn-blue" @click="goToJobsTable">
            ← Passa a lavori
          </button>

          <button class="btn-logout-admin" @click="logout">
            ← Logout
          </button>
        </div>
      </aside>

      <main class="main-table-card">
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th class="text-center">Selezione</th>
                <th>Badge ID</th>
                <th>Nome</th>
                <th>Cognome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in employees" :key="employee.ID_Badge_Number"
                :class="{ 'selected-row': selectedEmployee === employee }">
                <td>
                  <input type="radio" :value="employee.ID_Badge_Number" v-model="selectedEmployee"
                    class="custom-checkbox" />
                </td>
                <td>{{ employee.ID_Badge_Number }}</td>
                <td>{{ employee.First_Name }}</td>
                <td>{{ employee.Last_Name }}</td>

              </tr>
            </tbody>
          </table>
        </div>
      </main>

    </div>
  </div>
</template>

