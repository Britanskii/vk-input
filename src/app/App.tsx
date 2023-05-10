import React, { useEffect, useState } from "react"
import "./styles/reset.css"
import s from "./app.module.css"
import { FormProvider } from "../shared/context/formContext/ui/FormProvider"
import { Dropdown, IListItem } from "../shared/ui/Dropdown/Dropdown"
import { Input } from "../shared/ui"
import { Album, getAlbums } from "../shared/services/placeholder/getAlbums"
import { parseToDropdownData } from "../shared/lib/parseToDropdownData"
import { getUsers, User } from "../shared/services/placeholder/getUsers"
import { Label } from "../shared/ui/Label/Label"

const App = () => {
	const [albumList, setAlbumList] = useState<IListItem[]>([])
	const [userList, setUserList] = useState<IListItem[]>([])

	useEffect(() => {
		getAlbums()
			.then((data) => parseToDropdownData<Album>(data, "id", "title"))
			.then(setAlbumList)
		getUsers()
			.then((data) => parseToDropdownData<User>(data, "id", "username"))
			.then(setUserList)
	}, [])

	return(
		<div className={s.app}>
			<FormProvider>
				<Label label={"Name"} name={"name"}>
					<Input placeholder={"Your name"} name={"name"}/>
				</Label>
				<Dropdown label={"Quotes"} placeholder={"Quote select"} initialList={albumList} name={"quotes"}/>
				<Dropdown label={"Favorites"}  placeholder={"Favorite select"} initialList={userList} name={"favorites"}/>
			</FormProvider>
		</div>
	)
}


export default App
