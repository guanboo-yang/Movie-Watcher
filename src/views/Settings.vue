<template>
	<v-container>
		<div style="text-align: center; padding: 64px 0">
			<h1 v-html="h1" style="font-weight: 400" />
			<h1>SETTINGS</h1>
		</div>
		<div style="display: flex; gap: 12px; flex-direction: column; align-items: center">
			<p>API provided by:</p>
			<img src="../assets/tmdb.svg" alt="TMDB logo" width="80" />
			<div>
				Color Mode:
				<v-btn @click="nextMode()" size="small" style="margin-left: 4px">
					{{ mode }}
				</v-btn>
			</div>
			<div>
				Language:
				<language>
					<v-btn size="small" style="margin-left: 4px"> choose </v-btn>
				</language>
			</div>
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import { useMyTheme } from '../hooks'
	import Language from '../components/Language.vue'

	const h1 = import.meta.env.VITE_APP_TITLE
	const { mode, nextMode } = useMyTheme()
</script>

<style scoped></style>
