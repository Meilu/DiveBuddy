import type { IDiveSite } from "@shared/dist";

export const diveSitesService = () => {
  const { $apiClient } = useNuxtApp();

  const getDiveSites = async () => {
    return (await $apiClient.get<IDiveSite[]>('/diveSites')).data;
  }

  return {
    getDiveSites
  };
};
