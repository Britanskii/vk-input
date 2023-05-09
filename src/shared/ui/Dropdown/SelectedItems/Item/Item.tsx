import s from "./item.module.css"

import { FC, memo, MouseEvent, RefObject, useCallback, useEffect } from "react"

import { ReactComponent as Close } from "../../../../assets/icons/close.svg"

interface ItemProps {
	deleteSelectedItem: (id: number) => void
	value: string
	id: number
	active: boolean
	index: number
	inputRef: RefObject<HTMLInputElement>
	onClick: () => void
	setSelectedIndex: (index: number) => void
}

export const Item: FC<ItemProps> = memo(({ value, inputRef, onClick, setSelectedIndex, index, id, active, deleteSelectedItem }) => {

	const onDeleteItem = () => deleteSelectedItem(id)

	const onSelectItem = (event: MouseEvent<HTMLDivElement> ) => {
		event.stopPropagation()
		onClick()
		setSelectedIndex(index)
	}

	const changeItem = (event: KeyboardEvent) => {
		const code = event.code

		if (code === "Delete") {
			onDeleteItem()
		}
	}

	useEffect(() => {
		if (active) {
			if (inputRef.current) {
				inputRef.current.addEventListener("keydown", changeItem)
			}
		}

		return () => {
			if (active) {
				if (inputRef.current) {
					inputRef.current.removeEventListener("keydown", changeItem)
				}
			}
		}
	}, [active])

	return (
		<div onClick={onSelectItem} className={`${s.item} ${active ? s.active : ""}`}>
			{value}
			<Close onClick={onDeleteItem} className={s.close}/>
		</div>
	)
})

Item.displayName = "SelectedItem"
