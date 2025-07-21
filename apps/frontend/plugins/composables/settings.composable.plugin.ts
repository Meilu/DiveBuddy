import { useTheme } from 'vuetify';

export default defineNuxtPlugin(() => {
  const { $settingsStore } = useNuxtApp();
  
  const useSettings = useSettingsComposable({
    store: $settingsStore
  });

  return {
    provide: {
      settingsComposable: useSettings,
    },
  };
});
