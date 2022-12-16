<script setup lang="ts">
	import { ref } from 'vue'

	defineProps<{ msg: string }>()

	const count = ref(0)
</script>

<template>
	<h1>{{ msg }}</h1>
	<div>
		<a href="https://vitejs.dev" target="_blank">
			<img src="/vite.svg" class="logo" alt="Vite logo" />
		</a>
		<a href="https://vuejs.org/" target="_blank">
			<img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
		</a>
	</div>
</template>
