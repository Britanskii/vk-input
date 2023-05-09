import { FC, RefObject, useEffect, useState } from "react"
import { Item } from "./Item/Item"
import { IListItem } from "../Dropdown"

interface SelectedItemsProps {
	isDisallowNavigation: boolean
    deleteSelectedItem: (id: number) => void
	selectedItems: IListItem[]
	setSelectedItems: (value: IListItem[]) => void
	inputRef: RefObject<HTMLInputElement>
	onClick: () => void
}

export const SelectedItems: FC<SelectedItemsProps> = ({ isDisallowNavigation, onClick, inputRef,  selectedItems, setSelectedItems, deleteSelectedItem }) => {
	const [selectedIndex, setSelectedIndex] = useState(-1)

	const leftRightNavigation = (event: KeyboardEvent) => {
		const code = event.code

		if (isDisallowNavigation) {
			setSelectedIndex(-1)
			return
		}

		if (code === "Backspace") {
			if (selectedIndex !== selectedItems.length - 1) {
				setSelectedIndex(selectedItems.length - 1)
			} else {
				const newSelectedItems = [...selectedItems]
				newSelectedItems.pop()
				setSelectedItems(newSelectedItems)
			}
		}

		if (code === "ArrowLeft") {
			if (selectedIndex > 0) {
				setSelectedIndex(selectedIndex => selectedIndex -= 1)
			} else {
				setSelectedIndex(selectedItems.length - 1)
			}
		}

		if (code === "ArrowRight") {
			if (selectedIndex < selectedItems.length && selectedIndex !== -1) {
				event.preventDefault()
				setSelectedIndex(selectedIndex => selectedIndex += 1)
			}
		}
	}

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.addEventListener("keydown", leftRightNavigation)
		}

		return () => {
			if (inputRef.current) {
				inputRef.current.removeEventListener("keydown", leftRightNavigation)
			}
		}
	}, [selectedIndex, selectedItems, isDisallowNavigation])

	useEffect(() => {
		setSelectedIndex(selectedItems.length)
	}, [selectedItems])

	return (
		<>
			{selectedItems.map(({ value, id }, index) => {
				const active = index === selectedIndex

				return <Item onClick={onClick} index={index} inputRef={inputRef} setSelectedIndex={setSelectedIndex} active={active} deleteSelectedItem={deleteSelectedItem} id={id} key={id} value={value}/>
			})}
		</>
	)
}

