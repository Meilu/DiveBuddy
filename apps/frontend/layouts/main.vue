<template>
  <v-layout>
    <v-navigation-drawer permanent v-model="drawer" @click="hideIfSmallScreen" :rail="rail">
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
          <v-list-item class="text-subtitle-1" title="Leagues" @click="router.push({ path: '/tools/fpl/classic-leagues' })">
            <template v-slot:prepend>
              <v-icon icon="mdi-account"></v-icon>
            </template>
          </v-list-item>

          <v-list-subheader>TOOLS</v-list-subheader>
        </template>
        <v-list-subheader>OTHER</v-list-subheader>
        <template v-if="isAuthenticated && isClient">
          <v-list-item class="text-subtitle-1" title="Settings" @click="router.push({ path: '/tools/fpl/settings' })">
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
          <!-- <vue-json-pretty :data="gitInfo" :deep="4" :key-name-as-string="true" /> -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="showBuildInfoDialog = false">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useRouter } from "vue-router";

const { $userComposable } = useNuxtApp();
const { logOutUserAction, loginError, isAuthenticated, user } = $userComposable;

const router = useRouter();
const display = useDisplay();

const drawer = ref(false);
const rail = ref(false);
const isClient = ref(false);
const showBuildInfoDialog = ref(false);

watch(
  () => display.smAndUp.value,
  (isLarge) => {
    drawer.value = isLarge;
  },
  { immediate: true }
);

const hideIfSmallScreen = () => {
  if (display.xs.value) drawer.value = false;
};

const toggleMenu = () => {
  drawer.value = !drawer.value;
};

const goBack = () => router.back();

const logOut = async () => {
  await logOutUserAction();
  router.push({ path: "/login" });
};

onMounted(() => {
  isClient.value = true;
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
