<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({

  data() {
    return {
      badgeNumber: '',
      password: "",
      errorMessage: "",
    }
  },
  methods: {
    async submitEmployeeLogin() {
      this.errorMessage = "";
      try {
        const response = await axios.post('/api/auth/loginEmployee', {
          BadgeNumber: this.badgeNumber,
          Password: this.password
        });
        sessionStorage.setItem('firstName', response.data.firstName)
        sessionStorage.setItem('lastName', response.data.lastName)
        sessionStorage.setItem('badgeNumber', response.data.badgeNumber)

        //Redirect Worker/Admin
        const responseIdentity = await axios.get('/api/auth/whoami')
        const role = responseIdentity.data.role
        if (role === 'Admin') {
          this.$router.push('/admin-jobs');
        } else {
          this.$router.push('/jobs');
        }

      } catch (error: any) {
        if (error.response?.status === 400) {
          this.errorMessage = "Credenziali errate, si prega di riprovare"
        } else {
          this.errorMessage = "Errore del server";
        }
      }
    },
    goToUserLogin() {
      this.$router.push('/login-user')
    }
  }
})

</script>

<template>
  <div class="main-container">

    <div class="login-card">

      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>

      <div class="form-group">
        <label for="badge">Numero Badge</label>
        <input id="badge" type="text" v-model="badgeNumber" placeholder="3" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" @keyup.enter="submitEmployeeLogin" placeholder="password" />
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button class="btn-employee" @click="submitEmployeeLogin">
        Accedi
      </button>

    </div>

    <div class="user-login-section">
      <button class="btn-user-login" @click="goToUserLogin">
        <span class="icon-arrow">➜</span> Log In utente
      </button>
    </div>

  </div>
</template>
