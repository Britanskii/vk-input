import { FC, useEffect, useState } from "react"
import { Item } from "./Item/Item"

interface SelectedItemsProps {
    deleteSelectedItem: (value: string) => void
	selectedItems: string[]
}

export const SelectedItems: FC<SelectedItemsProps> = ({ selectedItems, deleteSelectedItem }) => {
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
			if (selectedIndex !== selectedItems.length - 1) {
				setSelectedIndex(selectedIndex => selectedIndex += 1)
			} else {
				setSelectedIndex(0)
			}
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", leftRightNavigation)

		return () => {
			document.removeEventListener("keydown", leftRightNavigation)
		}
	}, [selectedIndex])

	return (
		<>
			{selectedItems.map((value, index) => {
				const active = index === selectedIndex

				return <Item active={active} deleteSelectedItem={deleteSelectedItem} key={value} value={value}/>
			})}
		</>
	)
}

