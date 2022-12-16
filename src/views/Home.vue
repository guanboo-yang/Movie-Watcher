<template>
	<v-container>
		<div style="text-align: center; padding: 64px 0">
			<h1 v-html="h1" style="font-weight: 400" />
			<h1>WATCHER</h1>
		</div>
		<watch-list />
		<my-suspense>
			<movie-list title="Today Highlight" url="/trending/all/day" />
		</my-suspense>
		<my-suspense>
			<movie-list title="TV Shows of the Week" url="/trending/tv/week" />
		</my-suspense>
		<my-suspense>
			<movie-list title="Movies of the Week" url="/trending/movie/week" />
		</my-suspense>
	</v-container>
</template>

<script setup lang="ts">
	import WatchList from '../components/WatchList.vue'
	import MovieList from '../components/MovieList.vue'
	import MySuspense from '../components/MySuspense.vue'
	// import Login from './Login.vue'

	const h1 = import.meta.env.VITE_APP_TITLE
</script>
