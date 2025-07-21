import { createApiClient } from "@/services/apiClient.service";

export default defineNuxtPlugin(() => {
  const { $firebase } = useNuxtApp();
  const config = useRuntimeConfig();

  const getAccessToken = async (): Promise<string | undefined> => {
    const currentUser = $firebase.auth.currentUser;

    if (!currentUser) {
      return undefined;
    }

    return await currentUser.getIdToken();
  };

  const apiBaseUrl = config.public.apiBaseUrl;
  const apiClient = createApiClient(<string>apiBaseUrl, getAccessToken);

  return {
    provide: {
      apiClient,
    },
  };
});
