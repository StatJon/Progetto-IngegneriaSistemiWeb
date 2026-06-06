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

      sortKey: '' as string,
      sortAsc: true,
    }
  },

  computed: {
    sortedEmployees(): Employee[] {
      if (!this.sortKey) {
        return this.employees;
      }
      const key = this.sortKey as keyof Employee;
      return [...this.employees].sort((a, b) => {
        const result = String(a[key] ?? '').localeCompare(String(b[key] ?? ''), undefined, { numeric: true });
        return this.sortAsc ? result : -result;
      });
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
                <th @click="helperSortBy('ID_Badge_Number')" style="cursor: pointer;">
                  Badge ID{{ helperSortArrow('ID_Badge_Number') }}</th>
                <th @click="helperSortBy('First_Name')" style="cursor: pointer;">
                  Nome{{ helperSortArrow('First_Name') }}</th>
                <th @click="helperSortBy('Last_Name')" style="cursor: pointer;">
                  Cognome{{ helperSortArrow('Last_Name') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in sortedEmployees" :key="employee.ID_Badge_Number"
                :class="{ 'selected-row': selectedEmployee === employee }">
                <td>
                  <input type="radio" :value="employee" v-model="selectedEmployee"
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

