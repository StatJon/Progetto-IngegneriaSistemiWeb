<script lang="ts">

import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      errorMessage: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
    }
  },
  mounted() {

  },
  methods: {
    async submitUserData() {
      this.errorMessage = '';
      try {
        await axios.post("/api/auth/registerCustomer", {
          Email: this.email,
          First_Name: this.firstName,
          Last_Name: this.lastName,
          Password: this.password,
          Phone: this.phone
        })
        sessionStorage.setItem("firstName", this.firstName);
        sessionStorage.setItem("lastName", this.lastName);

        this.$router.push('/user-dashboard')

      } catch (error: any) {
        this.errorMessage = error.response.data.message
      }
    }
  }
}
)
</script>

<template>
  <div class="main-container">

    <div class="register-card">

      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>

      <div class="form-group">
        <label for="Name">Nome</label>
        <input id="Name" type="text" v-model="firstName" placeholder="Mario" />
      </div>

      <div class="form-group">
        <label for="Cognome">Cognome</label>
        <input id="Last_Name" type="text" v-model="lastName" placeholder="Rossi" />
      </div>

      <div class="form-group">
        <label for="Numero">Numero di telefono (10 cifre)</label>
        <input id="Number" type="text" v-model="phone" placeholder="333 1234567 " />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" placeholder="mario.rossi@email.com" />
      </div>

      <div class="form-group">
        <label for="Password">Password</label>
        <input id="password" type="password" v-model="password" @keyup.enter="submitUserData" placeholder="Password" />
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button class="btn-primary" @click="submitUserData">
        {{ 'Crea Profilo' }}
      </button>

    </div>

  </div>
</template>

<style scoped>
/* STILI CONDIVISI (Uguali alle altre pagine per coerenza) */
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #f0f6fc;
  padding: 20px;
}

.register-card {
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e4e8;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.icon-wrapper {
  margin-bottom: 25px;
  color: #24292f;
  display: flex;
  justify-content: center;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d1d5da;
  border-radius: 6px;
  outline: none;
  background-color: white;
  color: #333;
}

.form-group input::placeholder {
  color: #bfbfbf;
}

.form-group input:focus {
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.1);
}

.error-text {
  color: #cf222e;
  font-size: 13px;
  margin-bottom: 15px;
}

.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #24292f;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #000;
}
</style>