<script setup lang="ts">
import { ref } from 'vue';
//import axios from 'axios';
import { useRouter } from 'vue-router'; 

// Stati del form (nota: badgeNumber al posto di email)
const badgeNumber = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

// Funzione di Login Dipendente
const handleEmployeeLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;
  router.push('/jobs'); 

  // try {
  //   // Chiama l'endpoint specifico per i dipendenti
  //   const response = await axios.post('http://localhost:3000/api/auth/employee-login', {
  //     badgeNumber: badgeNumber.value,
  //     password: password.value
  //   });

  //   if (response.data.success) {
  //     // Reindirizza alla dashboard dipendenti (es. pannello di controllo)
  //     router.push('/jobs'); 
  //   }
  // } catch (error: any) {
  //   if (error.response && error.response.status === 401) {
  //     errorMessage.value = 'Numero badge o password errati.';
  //   } else {
  //     errorMessage.value = 'Errore del server.';
  //   }
  // } finally {
  //   isLoading.value = false;
  // }
};

// Navigazione per tornare al Login Utente
const goToUserLogin = () => {
  router.push('/login-user'); // Assumiamo che '/login' sia la rotta utente
};
</script>

<template>
  <div class="main-container">
    
    <div class="login-card">
      
      <div class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </div>

      <div class="form-group">
        <label for="badge">Numero Badge</label>
        <input 
          id="badge" 
          type="text" 
          v-model="badgeNumber" 
          placeholder="Value" 
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input 
          id="password" 
          type="password" 
          v-model="password" 
          placeholder="Value" 
        />
      </div>

      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

      <button class="btn-primary" @click="handleEmployeeLogin" :disabled="isLoading">
        {{ isLoading ? 'Accesso in corso...' : 'Sign In' }}
      </button>

      </div>

    <div class="user-login-section">
      <button class="btn-user-login" @click="goToUserLogin">
        <span class="icon-arrow">➜</span> Log In utente
      </button>
    </div>

  </div>
</template>

<style scoped>
/* STILI IDENTICI AL LOGIN UTENTE */
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
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
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

.form-group input::placeholder { color: #bfbfbf; }

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

.btn-primary:hover { background-color: #000; }

/* STILE BOTTONE LOGIN UTENTE (Bottom) */
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.btn-user-login:hover {
  background-color: #f3f4f6;
  border-color: #8c959f;
}

.icon-arrow {
  font-size: 1.2em; /* Freccia leggermente più grande */
}
</style>