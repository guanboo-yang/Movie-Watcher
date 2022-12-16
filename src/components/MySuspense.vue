<template>
	<Suspense>
		<slot />
		<template #fallback>
			<div style="height: 230px; display: grid; place-items: center">
				<v-progress-circular indeterminate />
			</div>
		</template>
	</Suspense>
</template>
