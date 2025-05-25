// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  build: {
    transpile: ["vuetify"],
  },
    plugins: [
    '~/plugins/0-firebase.ts',
    '~/plugins/vuetify',
    '~/plugins/services/authentication.service.plugin.ts',
    '~/plugins/stores/user.store.plugin.ts',
    '~/plugins/composables/user.composable.plugin.ts',
  ],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  piniaPluginPersistedstate: {
    storage: 'sessionStorage',
    debug: true
  },
  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBaseUrl: '',
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      firebaseMeasurementId: ''
    }
  }
});
