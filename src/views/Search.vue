<template>
	<v-container>
		<div style="text-align: center; padding: 64px 0">
			<h1 v-html="h1" style="font-weight: 400" />
			<h1>SEARCHER</h1>
		</div>
		<div class="text-center d-flex" style="max-width: 400px; margin: 0 auto">
			<v-text-field label="Search" v-model="input" variant="solo" clearable autofocus />
		</div>
		<div class="search-gallery">
			<template v-for="item in lists">
				<CardLink
					v-if="item.media_type !== 'person'"
					:image="toImagePath(item.poster_path, 500)"
					:aspect-ratio="9 / 16"
					:icon="textToIcon(item.media_type)"
					:to="{
						name: 'Watch',
						params: { type: item.media_type, tmdb: item.id },
					}"
				>
					<template v-if="item.media_type === 'tv'">
						{{ item.name }}
					</template>
					<template v-else-if="item.media_type === 'movie'">
						{{ item.title }}
					</template>
				</CardLink>
			</template>
		</div>
		<div ref="target">
			<div v-if="isFetching" style="display: grid; place-items: center">
				<v-progress-circular indeterminate />
			</div>
		</div>
	</v-container>
</template>

<script setup lang="ts">
	import { computed, onBeforeUnmount, ref } from 'vue'
	import { useFetch, useIntersectionObserver } from '@vueuse/core'
	import { watchDebounced, whenever } from '@vueuse/shared'
	import { useRouter } from 'vue-router'
	import { useLang } from '../hooks'
	import CardLink from '../components/CardLink.vue'
	import { toImagePath, textToIcon } from '../utils'
	import { Item } from '../interfaces'

	const router = useRouter()
	const { lang } = useLang()
	const h1 = import.meta.env.VITE_APP_TITLE
	const input = ref('')
	const lists = ref<Item[]>([])
	const target = ref(null)
	const visible = ref(true)
	const page = ref(1)
	const total_pages = ref(5)
	const searchUrl = computed(
		() => `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${lang.value}&query=${input.value}&page=${page.value}`
	)

	const { execute, isFetching, canAbort, abort } = useFetch(searchUrl, {
		refetch: false,
		immediate: false,
		beforeFetch: ({ options, cancel }) => {
			if (!input.value || page.value < 1 || page.value > total_pages.value) cancel()
			return { options }
		},
		afterFetch: ({ response, data }) => {
			lists.value.push(...data.results)
			total_pages.value = data.total_pages
			// console.log(data)
			// // keep fetching?
			// if (visible.value) {
			// 	page.value++
			// 	execute()
			// }
			return { response }
		},
		onFetchError: err => {
			console.log(err)
			return err
		},
	}).json()

	useIntersectionObserver(
		target,
		([{ isIntersecting }]) => {
			visible.value = isIntersecting
		},
		{ rootMargin: '0px 0px 200px 0px' }
	)

	whenever(
		() => visible.value,
		() => {
			page.value++
			execute()
		}
	)

	watchDebounced(
		input,
		() => {
			page.value = 1
			total_pages.value = 5
			lists.value = []
			execute()
		},
		{ debounce: 500 }
	)

	onBeforeUnmount(() => canAbort && abort())
</script>

<style scoped>
	.search-gallery {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	}
</style>
