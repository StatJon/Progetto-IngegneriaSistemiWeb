<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async submitLogin() {
      this.errorMessage = "";
      try {
        const response = await axios.post("/api/auth/loginCustomer", {
          Email: this.email,
          Password: this.password,
        });
        sessionStorage.setItem("firstName", response.data.firstName);
        sessionStorage.setItem("lastName", response.data.lastName);
        this.$router.push("/user-dashboard");
      } catch (error: any) {
        if (error.response?.status === 400) {
          this.errorMessage = "Credenziali errate, si prega di riprovare"
        } else {
          this.errorMessage = "Errore del server";
        }
      }
    },
    goToCreateProfile() {
      this.$router.push("/create-profile");
    },
    goToEmployeeLogin() {
      this.$router.push("/login-employee");
    },
  },
});
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
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email" placeholder="supermario@mail.com" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password" @keyup.enter="submitLogin" placeholder="password" />
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button class="btn-user-login" @click="submitLogin">Accedi</button>

      <button class="btn-secondary" @click="goToCreateProfile">
        Crea Account
      </button>
      
    </div>
    <div class="employee-section" style="margin-top: 0px;">
      <button class="btn-employee"style="margin-bottom: 10px;" @click="goToEmployeeLogin">
        ➜ Log In dipendente
      </button>
    </div>

    
  </div>
</template>
