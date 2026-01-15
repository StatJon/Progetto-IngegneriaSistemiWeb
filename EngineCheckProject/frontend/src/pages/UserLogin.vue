<script setup lang="ts">
import { ref } from 'vue';
//import axios from 'axios';
import { useRouter } from 'vue-router'; 

// Stati del form
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const router = useRouter();

// Funzione di Login
const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;
   router.push('/user-dashboard');} 

//   try {
//     // Sostituisci con la porta corretta del tuo backend
//     const response = await axios.post('http://localhost:3000/api/auth/login', {
//       email: email.value,
//       password: password.value
//     });

//     if (response.data.success) {
//       // Login riuscito -> vai alla dashboard o home
//       router.push('/user-dashboard'); 
//     }
//   } catch (error: any) {
//     if (error.response && error.response.status === 401) {
//       errorMessage.value = 'Credenziali non valide.';
//     } else {
//       errorMessage.value = 'Errore del server. Riprova più tardi.';
//     }
//   } finally {
//     isLoading.value = false;
//   }
// };

// Navigazione verso registrazione
const goToRegister = () => {
  router.push('/create-profile'); 
};

// Navigazione verso login dipendente (se esiste la rotta)
const goToEmployeeLogin = () => {
  router.push('/login-employee');
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
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          v-model="email" 
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

      <button class="btn-primary" @click="handleLogin" :disabled="isLoading">
        {{ isLoading ? 'Accesso in corso...' : 'Sign In' }}
      </button>

      <button class="btn-secondary" @click="goToRegister">
        Crea Account
      </button>
    </div>

    <div class="employee-section">
      <button class="btn-employee" @click="goToEmployeeLogin">
        ➜ Log In dipendente
      </button>
    </div>

  </div>
</template>

<style scoped>
/* CONTENITORE PRINCIPALE */ 
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh; /* Occupa buona parte dello schermo verticale */
  background-color: #f0f6fc; /* Sfondo azzurrino chiaro */
  padding: 20px;
}

/* CARD BIANCA */
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

/* ICONA */
.icon-wrapper {
  margin-bottom: 25px;
  color: #24292f;
  display: flex;
  justify-content: center;
}

/* INPUT */
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

/* MESSAGGI ERRORE */
.error-text {
  color: #cf222e;
  font-size: 13px;
  margin-bottom: 15px;
}

/* BOTTONI PRINCIPALI */
.btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #24292f; /* Grigio scuro/Nero */
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 12px;
  transition: background 0.2s;
}

.btn-primary:hover {
  background-color: #000;
}

.btn-secondary {
  width: 100%;
  padding: 12px;
  background-color: white;
  color: #24292f;
  font-weight: 600;
  border: 1px solid #24292f;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-secondary:hover {
  background-color: #f6f8fa;
}

/* BOTTONE DIPENDENTE */
.employee-section {
  margin-top: 30px;
}

.btn-employee {
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

.btn-employee:hover {
  background-color: #f3f4f6;
  border-color: #8c959f;
}
</style>