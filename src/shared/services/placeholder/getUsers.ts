import { API_URL } from "./constants"

export interface User {
	id: number
	username: string
}

export const getUsers = async () => {
	const response = await fetch(`${API_URL}/users`)
	const json: User[] = await response.json()

	return json
}
