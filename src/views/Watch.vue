<template>
  <div>
    <div v-if="data && route.params.tmdb" class="bg-img" :style="`opacity: ${1.3 - y / 400}`">
      <v-img cover :src="toImagePath(data.backdrop_path)" />
    </div>
    <v-container style="position: relative">
      <template v-if="isFetching">
        <div style="height: 300px; display: grid; place-items: center">
          <v-progress-circular indeterminate />
        </div>
      </template>
      <template v-else-if="data && route.params.tmdb">
        <div style="padding: 15vh 10px 10px 10px">
          <h1 v-if="route.params.type === 'tv'">{{ data.name }}</h1>
          <h1 v-else>{{ data.title }}</h1>
          <p v-if="data.tagline" style="font-size: 14px; max-width: 500px">{{ data.tagline }}</p>
          <v-chip-group disabled column class="mb-1">
            <v-chip v-if="data.status" size="small" :ripple="false">{{ data.status }}</v-chip>
            <v-chip v-if="data.vote_average" size="small" :ripple="false">
              <v-icon start size="small" icon="mdi-star" />
              {{ data.vote_average }}
            </v-chip>
            <v-chip v-if="data.type" size="small" :ripple="false">{{ data.type }}</v-chip>
            <v-chip v-for="country in data.origin_country" size="small" :ripple="false">
              {{ country }}
            </v-chip>
            <v-chip v-for="genre in data.genres" size="small" :ripple="false">
              {{ genre.name }}
            </v-chip>
          </v-chip-group>
          <p style="font-size: 14px; max-width: 500px">{{ data.overview }}</p>
          <div style="display: flex; gap: 8px" class="my-2">
            <v-btn size="small" icon @click="toggleWatch">
              <v-slide-y-transition leave-absolute>
                <v-icon v-if="isInWatchList(Number(route.params.tmdb))" icon=" mdi-bookmark" />
              </v-slide-y-transition>
              <v-fade-transition hide-on-leave>
                <v-icon v-if="!isInWatchList(Number(route.params.tmdb))" icon="mdi-bookmark-outline" />
              </v-fade-transition>
            </v-btn>
            <v-btn v-if="isShareSupported" size="small" icon="mdi-share" @click="clickShare" />
            <v-btn v-else-if="isClipboardSupported" size="small" :icon="copied ? 'mdi-check' : 'mdi-content-copy'" @click="clickShare" />
          </div>
        </div>
        <display />
        <template v-if="route.params.type === 'tv'">
          <!-- force rerender to prevent incorrect tab v-model in seasons -->
          <!-- still has some bugs... -->
          <seasons :seasons="data.seasons" :id="data.id" />
        </template>
        <template v-if="data.belongs_to_collection">
          <my-suspense>
            <collections :id="data.belongs_to_collection.id" />
          </my-suspense>
        </template>
        <my-suspense>
          <movie-list title="Suggested" :url="`/${route.params.type}/${route.params.tmdb}/recommendations`" />
        </my-suspense>
      </template>
      <template v-else>
        <div style="text-align: center; padding: 64px 0">
          <h1 v-html="h1" style="font-weight: 400" />
          <h1>PLAYER</h1>
          <span v-if="route.params.tmdb" class="text-error">Movie not found</span>
        </div>
        <div style="text-align: center">
          <v-btn to="/search">Search</v-btn>
        </div>
      </template>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import { computed, onBeforeUnmount, onMounted, watch } from 'vue'
  import { useClipboard, useFetch, useShare, useTitle, useWindowScroll } from '@vueuse/core'
  import Display from '../components/Display.vue'
  import Seasons from '../components/Seasons.vue'
  import MovieList from '../components/MovieList.vue'
  import type { Info } from '../interfaces'
  import { useLang, useWatchList } from '../hooks'
  import { toImagePath } from '../utils'
  import { useRoute } from 'vue-router'
  import Collections from '../components/Collections.vue'
  import MySuspense from '../components/MySuspense.vue'

  const route = useRoute()
  const title = useTitle()
  const { y } = useWindowScroll()
  const { isSupported: isShareSupported, share } = useShare()
  const { isSupported: isClipboardSupported, copy, copied } = useClipboard()
  const { toggleInWatchList, isInWatchList } = useWatchList()
  const { lang } = useLang()
  const h1 = import.meta.env.VITE_APP_TITLE
  const url = computed(
    () =>
      `https://api.themoviedb.org/3/${route.params.type}/${route.params.tmdb}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=${
        lang.value
      }&append_to_response=recommendations`
  )
  const { data, execute, isFetching, canAbort, abort } = useFetch(url, {
    initialData: { name: '', id: NaN },
    // refetch: true,
    beforeFetch: ({ options, cancel }) => {
      clearDetails()
      if (!route.params.tmdb) cancel()
      return { options }
    },
    afterFetch: ({ response, data }) => {
      console.log(data)
      if (!data.backdrop_path) data.backdrop_path = data.poster_path
      return { response, data }
    },
    onFetchError: err => {
      console.log(err)
      return err
    },
  }).json<Info>()

  const clearDetails = () => {
    data.value = {
      name: '',
      id: NaN,
    }
  }

  const toggleWatch = () =>
    toggleInWatchList(Number(route.params.tmdb), {
      media_type: route.params.type,
      name: route.params.type === 'movie' ? data.value?.title : data.value?.name,
      image: toImagePath(data.value?.backdrop_path, 500) || toImagePath(data.value?.poster_path, 500),
    })

  const clickShare = () => {
    if (isShareSupported.value) {
      share({
        title: title.value,
        url: window.location.href,
      })
    } else if (isClipboardSupported.value) {
      copy(window.location.href).then(() => console.log('copied'))
    }
  }

  watch(
    () => data.value,
    () => (data.value?.name && (title.value = `${data.value.name} | Movie+`)) || (data.value?.title && (title.value = `${data.value.title} | Movie+`))
  )

  watch(url, () => execute())

  onMounted(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
  onBeforeUnmount(() => canAbort && abort())
</script>

<style scoped>
  .bg-img {
    position: fixed;
    z-index: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    transition: opacity 1s ease-out;
  }
  .bg-img .v-img::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    inset: 0px;
    background-image: radial-gradient(farthest-side at 73% 21%, transparent, #ffffff);
  }
  .v-theme--dark .bg-img .v-img::after {
    background-image: radial-gradient(farthest-side at 73% 21%, transparent, #121212);
  }
  .bg-img .v-img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100vw;
    min-width: 500px;
    /* min-height: 100vh; */
  }
</style>
