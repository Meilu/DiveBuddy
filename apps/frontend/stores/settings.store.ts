import { DiveUnit, Theme } from "@shared/dist";
import { defineStore } from "pinia";
import { ref } from "vue";

export const createSettingsStore = (storageKey: string) => {
  return defineStore(
    storageKey,
    () => {

      const theme = ref<Theme>(Theme.Auto);
      const diveUnit = ref<DiveUnit>(DiveUnit.Metric);

      const setUnitPreference = (unit: DiveUnit) => {
        diveUnit.value = unit;
      };

      const resetSettings = () => {
        theme.value = Theme.Light;
        diveUnit.value = DiveUnit.Metric;
      };

      return {
        theme,
        diveUnit,
        setUnitPreference,
        resetSettings,
      };
    },
    {
      persist: {
        key: storageKey,
      },
    }
  );
};

export type SettingsStore = ReturnType<ReturnType<typeof createSettingsStore>>;
