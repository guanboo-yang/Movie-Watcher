<template>
	<div v-if="data">
		<v-divider class="my-5" />
		<h3>Collections</h3>
		<div class="gallery">
			<CardLink
				v-for="(item, index) in data.parts"
				:key="index"
				:image="toImagePath(item.backdrop_path, 500)"
				:aspect-ratio="16 / 9"
				icon="mdi-movie"
				:to="{
					name: 'Watch',
					params: { type: 'movie', tmdb: item.id },
				}"
			>
				<b>{{ item.title }}</b>
			</CardLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount } from 'vue'
	import { useFetch } from '@vueuse/core'
	import CardLink from './CardLink.vue'
	import type { ItemMovie } from '../interfaces'
	import { useLang } from '../hooks'
	import { toImagePath } from '../utils'

	const { lang } = useLang()

	const { id } = defineProps<{
		id: number
	}>()

	const collectionUrl = `https://api.themoviedb.org/3/collection/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${lang.value}`

	const { data, canAbort, abort } = await useFetch(collectionUrl).json<{ parts: ItemMovie[] }>()

	onBeforeUnmount(() => canAbort && abort())
</script>
