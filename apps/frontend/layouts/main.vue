<template>
  <v-layout>
    <v-navigation-drawer permanent v-model="drawer" @click="hideIfSmallScreen" :rail="rail" class="scrollable-content">
      <template v-slot:prepend>
        <v-list-item v-if="isClient" lines="two" class="text-subtitle-2" :prepend-avatar="'https://ionicframework.com/docs/img/demos/avatar.svg'" :subtitle="user != null ? 'Logged In' : 'Logged Out'"
          ><span class="text-truncate d-inline-block" v-if="user?.email != null" style="max-width: 140px">
            {{ user?.email }}
          </span></v-list-item
        >
      </template>
      <v-divider></v-divider>
      <v-list>
        <v-list-subheader> GENERAL </v-list-subheader>
        <template v-if="isAuthenticated && isClient">
          <v-list-item class="text-subtitle-1" title="DiveMap" @click="router.push({ path: '/divemap' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-account"></v-icon>
            </template>
          </v-list-item>
        </template>
        <v-list-subheader>OTHER</v-list-subheader>
        <template v-if="isAuthenticated && isClient">
          <v-list-item class="text-subtitle-1" title="Settings" @click="router.push({ path: '/settings' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-cog"></v-icon>
            </template>
          </v-list-item>
        </template>
        <v-list-item v-if="isAuthenticated && isClient" prepend-icon="mdi-account" title="Logout" value="Logout" @click="logOut"></v-list-item>
        <v-list-item v-if="!isAuthenticated && isClient" prepend-icon="mdi-account" title="Login" value="Login" @click="router.push({ path: '/login' })"></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list density="compact" nav>
          <v-list-subheader>BUILD INFO</v-list-subheader>
          <v-list-item @click="showBuildInfoDialog = true">
            <pre>GITINFO</pre>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-app-bar prominent image="/public/images/header_coral.png">
      <v-app-bar-nav-icon variant="text" @click.stop="toggleMenu()" color="white"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-main class="scrollable-content">
      <NuxtPage />
    </v-main>
    <v-dialog v-model="showBuildInfoDialog" max-width="500px">
      <v-card>
        <v-card-title>Current Commit Info</v-card-title>
        <v-card-text>
          <vue-json-pretty :data="gitInfo" :deep="4" :key-name-as-string="true" />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showBuildInfoDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  <Loader :is-loading="!isMounted" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";
import VueJsonPretty from "vue-json-pretty";
import { useTheme } from "vuetify";
import "vue-json-pretty/lib/styles.css";

const { $userComposable, $settingsComposable, $settingsStore } = useNuxtApp();
const { logOutUserAction, isAuthenticated, user } = $userComposable;

const vuetifyTheme = useTheme();
const config = useRuntimeConfig();
const router = useRouter();
const display = useDisplay();

const drawer = ref(false);
const rail = ref(false);
const isClient = ref(false);
const showBuildInfoDialog = ref(false);
const isMounted = ref(false);

const gitInfo: any = config.public.gitInfo;

const hideIfSmallScreen = () => {
  if (display.xs.value) {
    drawer.value = false;
  }
};

const toggleMenu = () => {
  drawer.value = !drawer.value;
};

const logOut = async () => {
  await logOutUserAction();
  router.push({ path: "/login" });
};

onMounted(() => {
  isClient.value = true;

  watch(
    () => $settingsStore.theme,
    (newTheme) => {
      vuetifyTheme.global.name.value = $settingsComposable.resolveThemeName(newTheme);
    },
    { immediate: true }
  );

  watch(
    () => display.smAndUp.value,
    (isLarge) => {
      drawer.value = isLarge;
    },
    { immediate: true }
  );
  
  isMounted.value = true;
});
</script>

<style scoped>
.scrollable-content {
  height: calc(100vh);

  overflow-y: auto;
}
</style>

<style>
.vjs-tree-node.is-highlight,
.vjs-tree-node:hover {
  background-color: transparent;
}
</style>
