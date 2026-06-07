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
  
    <main class="main-content">
      <div class="register-card">

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

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
        <button class="btn-employee" @click="addEmployee">Aggiungi Dipendente</button>
        <button class="btn-back" @click="goBack">Torna a Dashboard</button>


      </div>
    </main>


</template>
