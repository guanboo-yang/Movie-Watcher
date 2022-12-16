<template>
	<div v-if="Object.keys(watchList).length">
		<v-divider class="my-5" />
		<h3>My Watchlist</h3>
		<div class="gallery">
			<template v-for="(item, id) in watchList" :key="id">
				<CardLink
					:image="toImagePath(item.image)"
					:aspect-ratio="16 / 9"
					:icon="textToIcon(item.media_type)"
					:to="{
						name: 'Watch',
						params: { type: item.media_type, tmdb: id },
					}"
				>
					<b>{{ item.name }}</b>
				</CardLink>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import CardLink from './CardLink.vue'
	import { useWatchList } from '../hooks'
	import { toImagePath, textToIcon } from '../utils'

	const { watchList, clearWatchList } = useWatchList()
</script>
