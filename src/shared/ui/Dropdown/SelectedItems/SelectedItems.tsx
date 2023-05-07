import { FC, useEffect, useState } from "react"
import { Item } from "./Item/Item"

interface SelectedItemsProps {
	value: string
    deleteSelectedItem: (value: string) => void
	selectedItems: string[]
}

export const SelectedItems: FC<SelectedItemsProps> = ({ value,  selectedItems, deleteSelectedItem }) => {
	const [selectedIndex, setSelectedIndex] = useState(selectedItems.length)

	const leftRightNavigation = (event: KeyboardEvent) => {
		const code = event.code

		if (code === "ArrowLeft") {
			if (selectedIndex !== 0) {
				setSelectedIndex(selectedIndex => selectedIndex -= 1)
			} else {
				setSelectedIndex(selectedItems.length - 1)
			}
		}

		if (code === "ArrowRight") {
			if (selectedIndex < selectedItems.length) {
				setSelectedIndex(selectedIndex => selectedIndex += 1)
			} else {
				setSelectedIndex(-1)
			}
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", leftRightNavigation)

		return () => {
			document.removeEventListener("keydown", leftRightNavigation)
		}
	}, [selectedIndex, selectedItems, value])

	useEffect(() => {
		setSelectedIndex(selectedItems.length)
	}, [selectedItems])

	return (
		<>
			{selectedItems.map((value, index) => {
				const active = index === selectedIndex

				return <Item active={active} deleteSelectedItem={deleteSelectedItem} key={value} value={value}/>
			})}
		</>
	)
}

