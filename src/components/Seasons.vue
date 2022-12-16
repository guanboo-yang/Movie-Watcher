<template v-if="season && id">
	<v-tabs v-model="tab" style="margin: 20px 0 5px 0">
		<v-tab v-for="season in seasons" :key="season.name" :value="season.season_number" style="margin: 0">
			{{ season.name }}
		</v-tab>
	</v-tabs>
	<v-window v-model="tab" :touch="false">
		<v-window-item v-for="season in seasons" :key="season.name" :value="season.season_number">
			<my-suspense>
				<episodes :season="season" :id="id" />
			</my-suspense>
		</v-window-item>
	</v-window>
</template>

<script setup lang="ts">
	import { useUrlSearchParams } from '@vueuse/core'
	import { ref, watch } from 'vue'
	import type { Season } from '../interfaces'
	import Episodes from './Episodes.vue'
	import MySuspense from './MySuspense.vue'

	const tab = ref(1)
	const params = useUrlSearchParams<{ tmdb: number; s: number; e: number }>('hash')

	defineProps<{
		seasons?: Season[]
		key?: number
		id: number
	}>()

	watch(
		() => params.s,
		value => (tab.value = Number(value) || 1),
		{ immediate: true }
	)
</script>

<style scoped>
	.v-slide-group__content {
		flex: 0 1 auto !important;
		overflow-x: auto;
		scrollbar-width: none;
	}
	.v-slide-group__content::-webkit-scrollbar {
		display: none;
	}
</style>
