<template>
	<v-menu>
		<template #activator="{ props }">
			<span v-bind="props">
				<slot />
			</span>
		</template>
		<v-list min-width="170px" max-height="300px">
			<v-list-item v-for="(language, index) in languages" :key="index" @click="onClick(language.value)">
				<v-list-item-title>{{ language.text }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script setup lang="ts">
	import { useLang } from '../hooks'

	const { lang } = useLang()
	const languages = [
		{ text: 'English', value: 'en-US' },
		{ text: 'Español', value: 'es-ES' },
		{ text: 'Français', value: 'fr-FR' },
		{ text: 'Italiano', value: 'it-IT' },
		{ text: '日本語', value: 'ja-JP' },
		{ text: '한국어', value: 'ko-KR' },
		{ text: 'Nederlands', value: 'nl-NL' },
		{ text: 'Português', value: 'pt-BR' },
		{ text: 'Русский', value: 'ru-RU' },
		{ text: '中文 (繁體)', value: 'zh-TW' },
		{ text: '中文 (简体)', value: 'zh-CN' },
	]

	const onClick = (newVal: string) => (lang.value = newVal)
</script>
