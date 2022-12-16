<script setup lang="ts">
  // This starter template is using Vue 3 <script setup> SFCs
  // Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
  import HelloWorld from './components/HelloWorld.vue'
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
  import './App.css'
</script>

<template>
  <v-app>
    <navbar />
    <v-main>
      <!-- <hello-world msg="Vite + Vue" /> -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
    <footer />
  </v-app>
</template>

<style>
  html {
    scroll-behavior: smooth;
  }
  body {
    font-family: /* 'Baloo 2', */ Metropolis, Avenir, Helvetica, Arial, sans-serif;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 0.2rem;
  }
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  .gallery {
    margin-top: 15px;
    gap: 1rem;
    display: flex;
    flex-direction: row;
    overflow: auto;
    scrollbar-width: none;
  }
  .gallery::-webkit-scrollbar {
    display: none;
  }
  .gallery > * {
    width: 270px;
    min-width: 270px;
  }
  .gallery.small > * {
    width: 270px;
    min-width: 270px;
  }
</style>
