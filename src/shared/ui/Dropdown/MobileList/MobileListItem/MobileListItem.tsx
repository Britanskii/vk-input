import s from "./mobileListItem.module.css"

import { Dispatch, FC, memo, SetStateAction,  useEffect, useState } from "react"
import { IListItem } from "../../Dropdown"
import { Checkbox } from "../../../Checkbox/Checkbox"

interface MobileListItemProps {
    item: IListItem
	setInnerSelectedItems: Dispatch<SetStateAction<IListItem[]>>
	deleteSelectedItem: (id: number) => void
	active: boolean
}

export const MobileListItem: FC<MobileListItemProps> = memo(({ item, active, setInnerSelectedItems, deleteSelectedItem }) => {
	const [isActive, setIsActive] = useState(false)

	useEffect(() => {
		setIsActive(active)
	}, [active])

	const onSelect = (item: IListItem) => {
		setInnerSelectedItems(selectedItems => selectedItems = [...selectedItems, item])
	}

	const onToggle = () => {
		if (isActive) {
			setIsActive(false)
			deleteSelectedItem(item.id)
		} else {
			setIsActive(true)
			onSelect(item)
		}
	}

	return (
		<li onClick={onToggle} className = {s.item}>
			<Checkbox setActive={setIsActive} active={isActive}/>
			{item.value}
		</li>
	)
})

MobileListItem.displayName = "MobileListItem"
