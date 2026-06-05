<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  data() {
    return {
      role: '',
      navIcon: '',
      navText: '',
    }
  },
  async mounted() {
    await this.refreshNav();
  },
  watch: {
    async $route() {
      await this.refreshNav();
    }
  },
  methods: {
    async getRole() {
      try {
        const response = await axios.get('/api/auth/whoami');
        this.role = response.data.role;
      } catch (error) {
        this.role = '';
      }
    },
    getNavIconAndText() {
      switch (this.role) {
        case 'Customer':
          this.navIcon = 'person';
          this.navText = 'Profilo';
          break;
        case 'Worker':
          this.navIcon = 'laptop_car';
          this.navText = 'Lista Lavori';
          break;
        case 'Admin':
          this.navIcon = 'admin_panel_settings';
          this.navText = 'Admin';
          break;
        default:
          this.navIcon = 'login';
          this.navText = 'Login';
          break;
      }
    },
    selectUserRoute() {
      switch (this.role) {
        case 'Customer':
          return '/user-dashboard';
          
        case 'Worker':
          return '/jobs';
          
        case 'Admin':
          return '/admin-jobs';
          
        default:
          return '/login-user';
         
      }
    },
    async refreshNav() {
      await this.getRole();
      this.getNavIconAndText();
    },
  }
})

</script>

<template>
  <div class="app-layout">

    <header class="site-header">
      <div class="container navbar">
        <div class="logo">
          <a href="/">
            <img src="./icoHome.png" alt="icona" class="logo-img">
          </a>
        </div>

        <nav class="nav-links">
          <a href="/#dove-siamo" class="nav-item">
            <span class="material-symbols-outlined icon">location_on</span>
            Dove siamo
          </a>

          <a href="/#contatti" class="nav-item">
            <span class="material-symbols-outlined icon">call</span>
            Contatti
          </a>

          <router-link to="/booking/motorcycle" class="nav-item">
            <span class="material-symbols-outlined icon">two_wheeler</span>
            Prenotazione per Moto
          </router-link>

          <router-link to="/booking/car" class="nav-item">
            <span class="material-symbols-outlined icon">directions_car</span>
            Prenotazione per Auto
          </router-link>

         
          
           <router-link  :to= "selectUserRoute()" class="nav-item highlight">
            <span class="material-symbols-outlined icon">{{ navIcon }}</span>
            {{ navText }}
          </router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <RouterView />
    </main>

    <footer class="site-footer">
      <p>Hiba - Jonathan 2025/2026</p>
    </footer>

  </div>
</template>

<style>
/* Reset base */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* LAYOUT FLEXBOX: Questo è il trucco per il footer */
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Occupa almeno tutta l'altezza dello schermo */
}

/* Header */
.site-header {
  background-color: white;
  border-bottom: 1px solid #ddd;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.logo-img {
  height: 40px;
  /* Dimensione fissa per il logo */
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-item {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.nav-item.highlight {
  font-weight: bold;
}

/* MAIN CONTENT: Si espande per riempire lo spazio vuoto */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* FOOTER STYLES */
.site-footer {

  color: rgb(141, 141, 141);
  text-align: center;
  padding: 20px;
  margin-top: auto;
  /* Spinge il footer in basso se il contenuto è breve */
}

/* Transizioni */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>