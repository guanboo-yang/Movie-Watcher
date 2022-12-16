export const toImagePath = (path?: string, width?: number) => {
	return path ? `https://image.tmdb.org/t/p/${width ? `w${width}` : 'original'}${path}` : undefined
}

export const textToIcon = (type: string) => {
	const map: {
		[key: string]: string
	} = {
		movie: 'mdi-movie',
		tv: 'mdi-television-classic',
		person: 'mdi-account',
	}
	return map[type]
}
