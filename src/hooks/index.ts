import { createGlobalState, useColorMode, useCycleList, usePreferredLanguages, useStorage } from '@vueuse/core'
import { useTheme } from 'vuetify'
import { watch } from 'vue'
// import { useRouter } from 'vue-router'

export const useLang = createGlobalState(() => {
	const defaultLang = usePreferredLanguages().value[0]
	const lang = useStorage('lang', defaultLang)
	// const router = useRouter()
	// watch(lang, () => {
	// 	router.go(0)
	// })
	return { lang }
})

export const useWatchList = createGlobalState(() => {
	const watchList = useStorage<{
		[key: number]: {
			media_type: 'movie' | 'tv'
			name: string
			image: string
		}
	}>('watch-list', {})
	const addToWatchList = (id: number, store: any) => {
		watchList.value[id] = store
	}
	const removeFromWatchList = (rid: number) => {
		delete watchList.value[rid]
	}
	const isInWatchList = (id: number) => {
		return watchList.value[id] !== undefined
	}
	const toggleInWatchList = (id: number, store: any) => {
		if (isInWatchList(id)) removeFromWatchList(id)
		else addToWatchList(id, store)
	}
	const clearWatchList = () => {
		watchList.value = {}
	}
	return { watchList, isInWatchList, toggleInWatchList, clearWatchList }
})

export const useMyTheme = createGlobalState(() => {
	const theme = useTheme()
	const mode = useColorMode({
		storageKey: 'color-mode',
	})
	const { next: nextMode } = useCycleList(['dark', 'light'], { initialValue: mode })
	watch(
		mode,
		newVal => {
			document.querySelector('meta[name="theme-color"]')!.setAttribute('content', newVal === 'dark' ? '#000000' : '#ffffff')
			theme.global.name.value = newVal
		},
		{ immediate: true }
	)
	return { mode, nextMode }
})
