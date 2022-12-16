<template>
	<div v-if="data" class="gallery">
		<CardLink
			v-for="(episode, index) in data.episodes"
			:key="index"
			:image="toImagePath(episode.still_path, 500)"
			:aspect-ratio="16 / 9"
			:time="episode.runtime"
			:to="{
				name: 'Watch',
				query: { s: season.season_number, e: episode.episode_number },
			}"
			@click="clickEpisode"
		>
			<b>{{ index + 1 }}. {{ episode.name }}</b>
			<template #details>
				{{ episode.overview }}
			</template>
		</CardLink>
	</div>
</template>

<script setup lang="ts">
	import { onBeforeUnmount } from 'vue'
	import { useFetch } from '@vueuse/core'
	import { useRouter } from 'vue-router'
	import CardLink from './CardLink.vue'
	import type { Episode, Season } from '../interfaces'
	import { useLang } from '../hooks'
	import { toImagePath } from '../utils'

	const { lang } = useLang()
	const router = useRouter()

	const { season, id } = defineProps<{
		season: Season
		id: number
	}>()

	const episodesUrl = `https://api.themoviedb.org/3/tv/${id}/season/${season.season_number}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${lang.value}`

	const { data, canAbort, abort } = await useFetch(episodesUrl).json<{ episodes: Episode[] }>()

	const clickEpisode = () => {
		document.querySelector('#display')?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		})
	}

	onBeforeUnmount(() => canAbort && abort())
</script>
