import s from "./item.module.css"

import { FC, memo, useEffect } from "react"

import { ReactComponent as Close } from "../../../../assets/icons/close.svg"

interface ItemProps {
	deleteSelectedItem: (value: string) => void
	value: string
	active: boolean
}

export const Item: FC<ItemProps> = memo(({ value, active, deleteSelectedItem }) => {

	const onDeleteItem = () => deleteSelectedItem(value)

	const changeItem = (event: KeyboardEvent) => {
		const code = event.code

		if (code === "Delete") {
			onDeleteItem()
		}
	}

	useEffect(() => {
		if (active) {
			document.addEventListener("keydown", changeItem)
		}

		return () => {
			if (active) {
				document.removeEventListener("keydown", changeItem)
			}
		}
	}, [active])

	return (
		<div className={`${s.item} ${active ? s.active : ""}`}>
			{value}
			<Close onClick={onDeleteItem} className={s.close}/>
		</div>
	)
})

Item.displayName = "SelectedItem"
