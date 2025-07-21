<template>
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12" sm="12" md="7">
        <v-card class="mx-auto pa-5" subtitle="Find the best dive locations and connect with fellow divers">
          <template v-slot:title>
            <span class="font-weight-black">Welcome to DivevBuddy!</span>
          </template>
          <v-form fast-fail @submit.prevent>
            <v-card-item>
              <v-sheet class="mx-auto">
                <v-text-field type="email" v-model="email" label="Email"></v-text-field>
                <v-text-field type="password" v-model="password" label="Password"></v-text-field>
              </v-sheet>
            </v-card-item>
            <v-card-actions>
              <v-btn @click="login" type="submit" color="primary" class="sign-in-with-microsoft-button">Sign in</v-btn>
              <v-btn @click="register" type="submit" color="primary" class="sign-in-with-microsoft-button"> Register</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <Loader :is-loading="isLoading" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const { $userComposable } = useNuxtApp()
const { loginWithEmailAndPasswordAction, registerWithEmailAndPasswordAction, loginError } = $userComposable;

const router = useRouter();
const email = ref<string>('klikop@signin.com')
const password = ref<string>('123456')
const isLoading = ref<boolean>(false)
const showErrorDialog = ref(false)

const login = async () => {
  isLoading.value = true

  await loginWithEmailAndPasswordAction(email.value, password.value)

  isLoading.value = false
  if (!loginError.value) {
    router.push({ name: 'index' })
    return
  }

  showErrorDialog.value = true
}

const register = async () => {
  isLoading.value = true

  await registerWithEmailAndPasswordAction(email.value, password.value)

  isLoading.value = false

  // if (!loginError.value) {
  //   router.push({ name: 'index' }) // Redirect to the root page
  //   return
  // }

  showErrorDialog.value = true
}
</script>

<style>
</style>
