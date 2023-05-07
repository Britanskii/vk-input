import s from "./item.module.css"

import { FC, memo } from "react"

interface ItemProps {
	deleteSelectedItem: (value: string) => void
	value: string
	active: boolean
}

export const Item: FC<ItemProps> = memo(({ value, active, deleteSelectedItem }) => {

	const onClick = () => deleteSelectedItem(value)

	return (
		<div className={`${s.item} ${active ? s.active : ""}`}>{value}<span className={s.close} onClick={onClick}>X</span></div>
	)
})

Item.displayName = "SelectedItem"
