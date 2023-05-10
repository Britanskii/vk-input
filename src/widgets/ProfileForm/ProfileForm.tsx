import s from "./profileForm.module.css"

import React, { FC, useEffect, useState } from "react"
import { Dropdown, IListItem, Input, SubmitButton, Label } from "shared/ui"
import { Album, getAlbums, getUsers, User } from "shared/services"
import { parseToDropdownData } from "shared/lib"
import { FormProvider } from "shared/context"

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
