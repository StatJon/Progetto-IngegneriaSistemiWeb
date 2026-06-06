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
        <input id="badge" type="text" v-model="badgeNumber" placeholder="Value" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" placeholder="Value" />
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

<!-- <style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  background-color: #f0f6fc;
  padding: 20px;
}

.login-card {
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

.user-login-section {
  margin-top: 30px;
}

.btn-user-login {
  background-color: white;
  border: 1px solid #d1d5da;
  color: #24292f;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
}

.btn-user-login:hover {
  background-color: #f3f4f6;
  border-color: #8c959f;
}

.icon-arrow {
  font-size: 1.2em;
}
</style> -->