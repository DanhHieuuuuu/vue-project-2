import './assets/style/base.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import vi from '@vee-validate/i18n/dist/locale/vi.json'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)
// Cấu hình ngôn ngữ mặc định là tiếng Việt
configure({
  generateMessage: localize({
    vi,
  }),
})
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
// Đặt locale hiện tại
localize('vi')

app.use(router)
app.use(PrimeVue)
app.mount('#app')
