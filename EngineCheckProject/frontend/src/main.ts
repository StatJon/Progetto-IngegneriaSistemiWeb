import { createApp } from 'vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import './style.css'
import App from './App.vue'

// Importazione pagine
import HomePage from './pages/HomePage.vue'
import UserLogin from './pages/UserLogin.vue'
import EmployeeLogin from './pages/EmployeeLogin.vue'
import CreateProfile from './pages/CreateProfile.vue'
import UserPage from './pages/UserPage.vue'
import JobList from './pages/JobList.vue'
import AdminJobs from './pages/AdminJobs.vue'
import AdminEmployees from './pages/AdminEmployees.vue'
import CarServiceBooking from './pages/CarServiceBooking.vue'
import CarBookingConfirmation from './pages/CarBookingConfirmation.vue'
import MotorcycleServiceBooking from './pages/MotorcycleServiceBooking.vue'
import MotorcycleBookingConfirmation from './pages/MotorcycleBookingConfirmation.vue'
import EditBooking from './pages/EditBooking.vue'
import FinalConfirmation from './pages/FinalConfirmation.vue'
import NotFound from './pages/NotFound.vue'

// Definizione Rotte
const routes: Array<RouteRecordRaw> = [
  { path: '/', component: HomePage, name: 'Home' },
  { path: '/login-user', component: UserLogin, name: 'UserLogin' },
  { path: '/login-employee', component: EmployeeLogin, name: 'EmployeeLogin' },
  { path: '/create-profile', component: CreateProfile, name: 'CreateProfile' },
  { path: '/user-dashboard', component: UserPage, name: 'UserDashboard' },
  { path: '/jobs', component: JobList, name: 'JobList' },
  { path: '/admin-jobs', component: AdminJobs, name: 'AdminJobs' },
  { path: '/admin-employees', component: AdminEmployees, name: 'AdminEmployees' },
  { path: '/booking-car', component: CarServiceBooking, name: 'CarBooking' },
  { path: '/booking-car-confirm', component: CarBookingConfirmation, name: 'CarBookingConfirm' },
  { path: '/booking-motorcycle', component: MotorcycleServiceBooking, name: 'MotoBooking' },
  { path: '/booking-motorcycle-confirm', component: MotorcycleBookingConfirmation, name: 'MotoBookingConfirm' },
  { path: '/booking-edit/:id', component: EditBooking, name: 'EditBooking' },
  { path: '/booking-final-confirmation', component: FinalConfirmation, name: 'FinalConfirmation' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App)
  .use(router)
  .mount('#app')