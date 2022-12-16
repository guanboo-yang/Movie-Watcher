<template>
	<v-container>
		<div style="text-align: center; padding: 64px 0">
			<h1 v-html="h1" style="font-weight: 400" />
			<h1>404 NOT FOUND</h1>
		</div>
		<div style="text-align: center">
			<v-btn to="/">Home</v-btn>
		</div>
	</v-container>
</template>

<script setup lang="ts">
	const h1 = import.meta.env.VITE_APP_TITLE
</script>

<style scoped></style>
