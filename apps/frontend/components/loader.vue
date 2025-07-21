<template>
<v-dialog v-model="isLoading" persistent fullscreen>
  <div class="d-flex justify-center align-center fill-height">
    <img src="/images/loadingImages/fish_loader.png" alt="Loading" class="swim-fish" style="width: 90px;" />
  </div>
</v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{
  isLoading: boolean;
}>();

const { isLoading } = toRefs(props);
</script>

<style scoped>
@keyframes swim {
  0% {
    transform: translateX(-100%) translateY(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  50% {
    transform: translateX(0%) translateY(-5px);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(0);
    opacity: 0;
  }
}
.swim-fish {
  display: block;
  margin: 0 auto;
  animation: swim 2.5s ease-in-out infinite;
}
</style>
