import s from "./dropdown.module.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../Input/Input"
import { UnsortedList } from "./UnsortedList/UnsortedList"
import { useForm } from "../../context/formContext/lib/useForm"
import { SelectedItems } from "./SelectedItems/SelectedItems"
import arrow from "../../assets/icons/arrow_down.png"

interface DropdownProps {
	name: string
	initialList: IListItem[]
	label?: string
    className?: string
}

export interface IListItem {
	id: number
	value: string
}

export const Dropdown: FC<DropdownProps> = ({ name, initialList, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState("")
	const [list, setList] = useState<IListItem[]>(initialList)
	const [caretPosition, setCaretPosition] = useState(0)
	const [selectedItems, setSelectedItems] = useState<IListItem[]>([])
	const [activeIndex, setActiveIndex] = useState(-1)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const { setField } = useForm(name)
	const isDisallowNavigation = caretPosition !== 0 && !!value
	const isPrintingAndClosed = !isOpen && value !== ""

	const onSelect = useCallback((selectedItem: IListItem) => {
		setActiveIndex(-1)
		setSelectedItems(selectedItems => selectedItems = [...selectedItems, selectedItem])
		setValue("")
		setField(value)
		setList(initialList)
		onClose()
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const deleteSelectedItem = useCallback((id: number) => {
		setSelectedItems(selectedItems => selectedItems = selectedItems.filter((item) => item.id !== id))
	}, [])

	const onToggle = () => {
		setIsOpen(isOpen => !isOpen)
	}

	const onOpen = () => {
		setIsOpen(true)
	}

	const onClose = () => {
		setIsOpen(false)
	}

	const clickOutside = (event: MouseEvent) => {
		const isClickOutside = dropdownRef.current
			&& !dropdownRef.current.contains(event.target as Node)
		if (isClickOutside) {
			onClose()
		}
	}

	const onTabOpen = (event: KeyboardEvent) => {
		const code = event.code

		if (!isOpen && code === "ArrowDown") {
			onOpen()
		}

		if (isOpen && code === "Tab" || activeIndex === -1 && code === "ArrowUp") {
			onClose()
		}
	}

	const filterListItem = (query: string,  initialList: IListItem[],  selectedList: IListItem[], ): IListItem[] => {
		const editedQuery = query.toLowerCase().replace(/\s/g, "")
		return  initialList.filter(({ value, id }) => {
			const editedValue = value.toLowerCase().replace(/\s/g, "")

			const isNoExisted = !selectedList.some((item) => item.id === id)

			return editedValue.includes(editedQuery) && isNoExisted
		})
	}

	useEffect(() => {
		if (dropdownRef.current) {
			dropdownRef.current.addEventListener("keydown", onTabOpen)
		}

		if (isOpen) {
			document.addEventListener("click", clickOutside)
		} else {
			document.removeEventListener("click", clickOutside)
		}

		return () => {
			if (dropdownRef.current) {
				dropdownRef.current.removeEventListener("keydown", onTabOpen)
			}

			document.removeEventListener("click", clickOutside)
		}
	}, [isOpen, activeIndex, selectedItems, value])

	useEffect(() => {
		if (isPrintingAndClosed) {
			onOpen()
		}

		setList(filterListItem(value, initialList, selectedItems ))
	}, [value, selectedItems, initialList])

	return (
		<div ref={dropdownRef} className = {`${s.dropdown} ${isOpen && s.open} ${className}`}>
			<img src={arrow} className={s.arrow} onClick={onToggle} alt={"close"}/>
			<div className={s.input}>
				<SelectedItems inputRef={inputRef} setSelectedItems={setSelectedItems} isDisallowNavigation={isDisallowNavigation} selectedItems={selectedItems} deleteSelectedItem={deleteSelectedItem}/>
				<Input setCaretPosition={setCaretPosition} className={s.innerInput} variant={"clear"} ref={inputRef} setValue={setValue} value={value} onClick={onOpen} name={name}/>
			</div>
			{isOpen &&
                <UnsortedList inputRef={inputRef} list={list} setActiveIndex={setActiveIndex} activeIndex={activeIndex} onSelect={onSelect} className={s.list}/>}
		</div>
	)
}
