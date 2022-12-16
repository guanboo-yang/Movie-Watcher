<template>
  <v-card max-width="640" class="mx-auto" id="display" style="background: transparent">
    <v-responsive :aspect-ratio="16 / 9">
      <!-- player -->
    </v-responsive>
  </v-card>
  <div class="text-center mb-6">
    <v-btn icon="mdi-play" />
  </div>
</template>

<script setup lang="ts">
  const prod = import.meta.env.PROD
</script>

<style scoped>
  p {
    position: absolute;
    top: 50%;
    width: 100%;
    padding: 20px;
    text-align: center;
    translate: 0 -50%;
  }
</style>
