import s from "./mobileListItem.module.css"

import { FC, memo, useEffect, useState } from "react"
import { IListItem } from "../../Dropdown"
import { Checkbox } from "../../../Checkbox/Checkbox"

interface MobileListItemProps {
    item: IListItem
	onSelect: (item: IListItem) => void
	deleteSelectedItem: (id: number) => void
	selectedItems: IListItem[]
}

export const MobileListItem: FC<MobileListItemProps> = memo(({ item, selectedItems, onSelect, deleteSelectedItem }) => {
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (selectedItems.find(selected => selected.id === item.id)) {
			setActive(true)
		} else {
			setActive(false)
		}
	}, [selectedItems])

	const onToggle = () => {
		if (active) {
			setActive(false)
			deleteSelectedItem(item.id)
		} else {
			setActive(true)
			onSelect(item)
		}
	}

	return (
		<li onClick={onToggle} className = {s.item}>
			<Checkbox setActive={setActive} active={active}/>
			{item.value}
		</li>
	)
})

MobileListItem.displayName = "MobileListItem"
