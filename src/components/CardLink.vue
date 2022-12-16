<template>
	<router-link class="card-item" @click="onClick" :to="to">
		<v-card link class="mb-3">
			<v-responsive :aspect-ratio="aspectRatio">
				<v-img v-if="image" :src="image" :aspect-ratio="aspectRatio" cover />
				<div v-else style="display: grid; place-items: center; height: 100%">
					<h3>Movie+</h3>
				</div>
			</v-responsive>
		</v-card>
		<div class="text">
			<div>
				<v-icon v-if="icon" :icon="icon" size="small" class="mr-2 pb-1" />
				<slot />
				<span v-if="time" class="time"> ({{ time }} min)</span>
			</div>
			<slot name="details" />
		</div>
	</router-link>
</template>

<script setup lang="ts">
	import { RouteLocationRaw } from 'vue-router'

	defineProps<{
		aspectRatio: number
		to: RouteLocationRaw
		image?: string
		onClick?: any
		icon?: string
		time?: number
	}>()
</script>

<style scoped>
	.card-item {
		cursor: pointer;
	}
	.card-item .v-card::after {
		content: '';
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: box-shadow 0.3s;
	}
	.card-item:hover .v-card::after {
		box-shadow: inset 0px 0px 0px 5px #ffffff90;
	}
	.text {
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	}
	.time {
		font-size: 14px;
		color: grey;
		white-space: nowrap;
	}
</style>
