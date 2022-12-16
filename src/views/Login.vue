<template>
	{{ token }}
	<v-divider class="my-5" />
	{{ data }}
	<v-divider class="my-5" />
</template>

<script setup lang="ts">
	import { useFetch, useLocalStorage } from '@vueuse/core'

	const token = useLocalStorage<{
		expires_at: string
		request_token: string
		success: boolean
	}>('tmdb_token', {
		expires_at: '',
		request_token: '',
		success: false,
	})

	const { execute } = useFetch(`${import.meta.env.VITE_TMDB_API_URL}/authentication/token/new?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, {
		immediate: false,
		beforeFetch: ({ options, cancel }) => {
			if (token.value.expires_at && new Date(token.value.expires_at) > new Date()) cancel()
			return { options }
		},
		afterFetch: ({ response, data }) => {
			token.value = data
			return { response, data }
		},
	}).json()

	const { data } = useFetch(`${import.meta.env.VITE_TMDB_API_URL}/authentication/session/new?api_key=${import.meta.env.VITE_TMDB_API_KEY}`, {
		beforeFetch: async ({ options, cancel }) => {
			await execute()
			console.log(token)
			if (!token.value.request_token) cancel()
			options.body = JSON.stringify({ request_token: token.value.request_token })
			console.log(options)
			return { options }
		},
		afterFetch: ({ response, data }) => {
			console.log(data)
			return { response, data }
		},
		onFetchError: err => {
			console.log(err)
			return err
		},
	})
		.post()
		.json()
</script>

<style scoped></style>
