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

          <button class="btn-logout" @click="logout">
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  min-height: 500px;
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

.btn-blue:hover {
  background-color: #006bcf;
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


.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 11px;
}

.status-badge.green {
  background-color: #d4edda;
  color: #155724;
}

.status-badge.orange {
  background-color: #fff3cd;
  color: #856404;
}


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