<template>
	<div v-if="data">
		<v-divider class="my-5" />
		<h3>{{ title }}</h3>
		<div class="gallery">
			<CardLink
				v-for="(item, index) in data.results"
				:key="index"
				:image="toImagePath(item.backdrop_path, 500)"
				:aspect-ratio="16 / 9"
				:icon="textToIcon(item.media_type)"
				:to="{
					name: 'Watch',
					params: { type: item.media_type, tmdb: item.id },
				}"
			>
				<b v-if="item.media_type === 'movie'">{{ item.title }}</b>
				<b v-else>{{ item.name }}</b>
			</CardLink>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount } from 'vue'
	import { useFetch } from '@vueuse/core'
	import CardLink from './CardLink.vue'
	import type { Item } from '../interfaces'
	import { useLang } from '../hooks'
	import { toImagePath, textToIcon } from '../utils'

	const { lang } = useLang()

	const { url } = defineProps<{
		title: string
		url: string
	}>()

	const path = `https://api.themoviedb.org/3${url}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${lang.value}`

	const { data, canAbort, abort } = await useFetch(path).json<{ results: Item[] }>()

	onBeforeUnmount(() => canAbort && abort())
</script>
