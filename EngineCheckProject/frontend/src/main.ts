import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
//import './style.css'
import './global.css'
import App from './App.vue'
import axios from 'axios'

axios.defaults.withCredentials = true //Necessario per passaggio automatico JWT a backend nelle richieste

// Importazione pagine
import HomePage from './pages/HomePage.vue'
import UserLogin from './pages/UserLogin.vue'
import EmployeeLogin from './pages/EmployeeLogin.vue'
import CreateProfile from './pages/CreateProfile.vue'
import UserPage from './pages/UserPage.vue'
import JobList from './pages/JobList.vue'
import AdminJobs from './pages/AdminJobs.vue'
import AdminEmployees from './pages/AdminEmployees.vue'
import ServiceBooking from './pages/ServiceBooking.vue'
import BookingConfirmation from './pages/BookingConfirmation.vue'
import FinalConfirmation from './pages/FinalConfirmation.vue'
import AddEmployee from './pages/AddEmployee.vue'
import NotFound from './pages/NotFound.vue'

// Definizione Rotte
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/login-user', component: UserLogin, name: 'UserLogin' },
  { path: '/login-employee', component: EmployeeLogin, name: 'EmployeeLogin' },
  { path: '/create-profile', component: CreateProfile, name: 'CreateProfile' },
  { path: '/user-dashboard', component: UserPage, meta: { requiresAuth: true }, name: 'UserDashboard' },
  { path: '/jobs', component: JobList, meta: { requiresAuth: true }, name: 'JobList' },
  { path: '/admin-jobs', component: AdminJobs, meta: { requiresAuth: true }, name: 'AdminJobs' },
  { path: '/admin-employees', component: AdminEmployees, meta: { requiresAuth: true }, name: 'AdminEmployees' },
  { path: '/booking/:vehicleType', component: ServiceBooking, meta: { requiresAuth: true }, name: 'Booking'},
  { path: '/booking-confirm', component: BookingConfirmation, meta: { requiresAuth: true }, name: 'Confirmation'},
  { path: '/booking-final-confirmation', component: FinalConfirmation, meta: { requiresAuth: true }, name: 'FinalConfirmation' },
  { path: '/add-employee', component: AddEmployee, meta: { requiresAuth: true }, name: 'AddEmployee' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) =>{
if (!to.meta.requiresAuth) {
    next();
    return;
  }
  try {
    await axios.get('/api/auth/whoami');
    next();
  } catch {
    next('/login-user');
  }
})

createApp(App)
  .use(router)
  .mount('#app')