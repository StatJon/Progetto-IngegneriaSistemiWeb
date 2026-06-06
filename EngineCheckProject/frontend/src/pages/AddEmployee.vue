<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      errorMessage: '',
      firstName: '',
      lastName: '',
      password: '',
      role: 'Worker',
    }
  },
  mounted() {

  },
  methods: {
    async addEmployee() {
      this.errorMessage = '';
      try {
        if (!this.firstName || !this.lastName || !this.password || !this.role) {
          this.errorMessage = "Tutti i campi sono obbligatori";
          return;
        }
        await axios.post('/api/admin/registerEmployee', {
          First_Name: this.firstName,
          Last_Name: this.lastName,
          Password: this.password,
          Role: this.role
        })
        this.$router.push('/admin-employees')
      } catch (error: any) {
        this.errorMessage = error.response.data.message;
      }
    },
    async goBack() {
      this.$router.back();
    }
  }
  
}
)

</script>

<template>
  <div class="page-container">
    <main class="main-content">
      <div class="Info-card">

        <p v-if="errorMessage" style="color: red; font-size: 13px;">{{ errorMessage }}</p>

        <div class="form-group">
          <label>Nome del dipendente</label>
          <input type="text" v-model="firstName" placeholder="Mario" />
        </div>

        <div class="form-group">
          <label>Cognome del dipendente</label>
          <input type="text" v-model="lastName" placeholder="Rossi" />
        </div>

        <div class="form-group">
          <label>Password </label>
          <input type="password" v-model="password" @keyup.enter="addEmployee" placeholder="PasswordBella" />
        </div>

        <div class="form-group">
          <label>Ruolo</label>
          <select v-model="role" name="fascia-oraria" id="orari">
            <optgroup label="Ruoli">
              <option value="Worker">Worker</option>
              <option value="Admin">Admin</option>
            </optgroup>
          </select>
        </div>

      </div>
      <button class="btn-signin" @click="addEmployee">Aggiungi Dipendente</button>
      <button class="btn-signin" @click="goBack">Torna a Dashboard</button>
    </main>

  </div>
</template>

<style scoped>
.form-group label {
  display: block;
  margin-bottom: 0.8rem;
 
  font-weight: 600;
  color: #000000;

  
  letter-spacing: 0.5px;
  
  text-transform: uppercase;
  
  font-size: 0.85rem;
  
  width: 100%;
  
}

.Info-card {
  background: white;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
 
  border: 1px solid #e2e8f0;
}


.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
}

.main-content {
  flex-grow: 1;
  background-color: #f0f7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
}

.btn-signin {

  padding: 0.8rem;
  background-color: #2d3748;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
}

.footer {
  text-align: center;
  padding: 2rem;
  background-color: #ffffff;
  color: #718096;
  font-size: 0.85rem;
}
</style>