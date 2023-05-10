import s from "./profileForm.module.css"

import React, { FC, useEffect, useState } from "react"

import { FormProvider } from "../../shared/context/formContext/ui/FormProvider"
import { Label } from "../../shared/ui/Label/Label"
import { Input } from "../../shared/ui"
import { Dropdown, IListItem } from "../../shared/ui/Dropdown/Dropdown"
import { SubmitButton } from "../../shared/ui/SubmitButton/SubmitButton"
import { Album, getAlbums } from "../../shared/services/placeholder/getAlbums"
import { parseToDropdownData } from "../../shared/lib/parseToDropdownData"
import { getUsers, User } from "../../shared/services/placeholder/getUsers"

interface ProfileFormProps {
    className?: string
}

export const ProfileForm: FC<ProfileFormProps> = () => {
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

	return (
		<FormProvider className={s.form}>
			<h2 className={s.title}>Profile edit</h2>
			<Label label={"Name"} name={"name"}>
				<Input placeholder={"Your name"} name={"name"}/>
			</Label>
			<Dropdown label={"Quotes"} placeholder={"Quote select"} initialList={albumList} name={"quotes"}/>
			<Dropdown label={"Favorites"}  placeholder={"Favorite select"} initialList={userList} name={"favorites"}/>
			<SubmitButton className={s.submit}/>
		</FormProvider>
	)
}
