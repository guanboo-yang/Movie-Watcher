import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vuetify({
			autoImport: true,
			// styles: 'expose',
		}),
		VitePWA({
			injectRegister: 'inline',
			registerType: 'autoUpdate',
			manifest: {
				name: 'Movie+',
				short_name: 'Movie+',
				description: 'Watch Movies and TV Shows',
				theme_color: '#ffffff',
				display: 'standalone',
				icons: [
					{
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
