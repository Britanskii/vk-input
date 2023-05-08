import { API_URL } from "./constants"

export interface Album {
	id: number
	userId: number
	title: string
}

export const getAlbums = async () => {
	const response = await fetch(`${API_URL}/albums`)
	const json: Album[] = await response.json()

	return json
}
