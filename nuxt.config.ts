// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: [
  '~/assets/scss/style.scss' 
],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
          `
        }
      }
    }
  },

  modules: ["@nuxt/icon", "nuxt-swiper", "@pinia/nuxt", '@pinia-plugin-persistedstate/nuxt'],
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons'
      },
    ],
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  swiper: {
    // Optional Swiper options
    prefix: 'Swiper',
    styleLang: 'css',
    modules: ['navigation', 'thumbs'], // Importing only the needed modules
  },
  build:{
      // vue-toastification - old commonjs module 
      transpile: ['vue-toastification'],
  },

  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL,
      ACF_URL: process.env.ACF_URL,
      COMMERCE_URL: process.env.COMMERCE_URL,
      CONSUMER_KEY: process.env.CONSUMER_KEY,
      CONSUMER_SECRET: process.env.CONSUMER_SECRET,
      DOMAIN: process.env.DOMAIN
    },
  },
  router: {
    middleware: ['changeLoad']
  },
  server: {
    port: 3000, // Укажите порт, если он отличается
    host: '0.0.0.0', // Или 'localhost'
  },
})
