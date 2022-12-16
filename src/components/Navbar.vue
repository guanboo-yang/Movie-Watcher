<template>
	<v-app-bar style="opacity: 0.9">
		<v-app-bar-title>
			<!-- <b>MOVIE<sup>+</sup></b> -->
			<img src="../assets/movie+.svg" alt="TMDB logo" width="100" style="display: block" />
		</v-app-bar-title>
		<v-btn v-for="link in links" :key="link.text" :to="link.to" class="d-none d-sm-flex">
			{{ link.text }}
		</v-btn>
		<v-btn @click="nextMode()" :icon="icon()" />
		<language>
			<v-btn icon="mdi-web" />
		</language>
	</v-app-bar>
	<v-bottom-navigation color="primary" grow class="d-sm-none">
		<v-btn v-for="link in links" :key="link.text" :to="link.to" max-width="120px">
			<v-icon>{{ link.icon }}</v-icon>
			<span class="text-uppercase">{{ link.text }}</span>
		</v-btn>
	</v-bottom-navigation>
</template>

<script setup lang="ts">
	import { useMyTheme } from '../hooks'
	import Language from './Language.vue'

	const { mode, nextMode } = useMyTheme()
	const links = [
		{ text: 'home', icon: 'mdi-home', to: '/' },
		// { text: 'watch', icon: 'mdi-movie', to: '/watch' },
		{ text: 'search', icon: 'mdi-magnify', to: '/search' },
		{ text: 'settings', icon: 'mdi-cog', to: '/settings' },
	]

	const icon = () => (mode.value === 'dark' ? 'mdi-brightness-2' : mode.value === 'light' ? 'mdi-white-balance-sunny' : '')
</script>
