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
          this.navText = 'Login / Registrati';
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

        
        <input type="checkbox" id="nav-toggle" class="nav-toggle-input" />

       
        <label for="nav-toggle" class="hamburger" aria-label="Menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </label>

        
        <label for="nav-toggle" class="nav-overlay"></label>

        <nav class="nav-links">
          <a href="/#dove-siamo" class="nav-item">
            <span class="material-symbols-outlined icon">location_on</span>
            Dove siamo
          </a>

          <a href="/#contatti" class="nav-item">
            <span class="material-symbols-outlined icon">call</span>
            Contatti
          </a>

          <router-link to="/booking/car" class="nav-item">
            <span class="material-symbols-outlined icon">directions_car</span>
            Prenotazione per Auto
          </router-link>

          <router-link to="/booking/motorcycle" class="nav-item">
            <span class="material-symbols-outlined icon">two_wheeler</span>
            Prenotazione per Moto
          </router-link>

          <router-link :to="selectUserRoute()" class="nav-item highlight">
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
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


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
  font-size: 20px;
}

.nav-item.highlight {
  font-weight: bold;
}


.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}


.site-footer {

  color: rgb(141, 141, 141);
  text-align: center;
  padding: 20px;
  margin-top: auto;
  background-color: white;

}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.nav-toggle-input {
  display: none;
}


.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 28px;
  height: 20px;
  cursor: pointer;
  z-index: 1001;
}

.hamburger .bar {
  display: block;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}


.nav-toggle-input:checked~.nav-overlay {
  display: block;
}

.nav-toggle-input:checked~.nav-links {
  right: 0;
}

.nav-toggle-input:checked~.hamburger .bar:nth-child(1) {
  transform: translateY(9px) rotate(45deg);
}

.nav-toggle-input:checked~.hamburger .bar:nth-child(2) {
  opacity: 0;
}

.nav-toggle-input:checked~.hamburger .bar:nth-child(3) {
  transform: translateY(-9px) rotate(-45deg);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100dvh;
    background: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 80px 24px 32px;
    gap: 8px;
    z-index: 1000;
    transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
  }

  .nav-overlay {
    display: block;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.35s ease;
  }

  .nav-toggle-input:checked~.nav-overlay {
    opacity: 1;
    pointer-events: all;
  }
}
</style>