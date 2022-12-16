type ItemTV = {
	media_type: 'tv'
	id?: number
	name?: string
	backdrop_path?: string
	poster_path?: string
}

export type ItemMovie = {
	media_type: 'movie'
	id?: number
	title?: string
	backdrop_path?: string
	poster_path?: string
}

type ItemPerson = {
	media_type: 'person'
	id?: number
	name?: string
	backdrop_path?: string
	poster_path?: string
}

export type Item = ItemTV | ItemMovie | ItemPerson

export type Episode = {
	episode_number: number
	name: string
	overview: string
	runtime: number
	season_number: number
	still_path?: string
}

export type Season = {
	name: string
	poster_path: string
	season_number: number
}

export type Info = {
	backdrop_path?: string
	belongs_to_collection?: {
		id: number
	}
	id: number
	name?: string
	title?: string
	genres?: {
		name: string
	}[]
	origin_country?: string[]
	overview?: string
	poster_path?: string
	recommendations?: {
		results: Item[]
	}
	seasons?: Season[]
	status?: string
	tagline?: string
	type?: string
	vote_average?: number
}
