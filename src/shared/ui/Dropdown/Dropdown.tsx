import s from "./dropdown.module.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../Input/Input"
import { UnsortedList } from "./UnsortedList/UnsortedList"
import { useForm } from "../../context/formContext/lib/useForm"
import { SelectedItems } from "./SelectedItems/SelectedItems"

interface DropdownProps {
	name: string
	label?: string
    className?: string
}

const mocked = ["Английский", "Русский", "Французкий", "Немецкий"]

export const Dropdown: FC<DropdownProps> = ({ name, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState("")
	const [list, setList] = useState(mocked)
	const [selectedItems, setSelectedItems] = useState(["Аниме", "Ахаё"])
	const [activeIndex, setActiveIndex] = useState(-1)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const { setField } = useForm(name)

	const onSelect = useCallback((value: string) => {
		setActiveIndex(-1)
		setSelectedItems(selectedItems => selectedItems = [...selectedItems, value])
		setValue(" ")
		setField(value)
		setList(mocked)
		onClose()
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}, [])

	const deleteSelectedItem = useCallback((value: string) => {
		setSelectedItems(selectedItems => selectedItems = selectedItems.filter(item => item !== value))
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

	const onTabOpen = (event: KeyboardEvent) => {
		const code = event.code

		if (!isOpen && (code === "Tab" || code === "ArrowDown")) {
			event.preventDefault()
			onOpen()
		}

		if (value === "" && code === "Backspace") {
			const newSelectedItems = [...selectedItems]
			newSelectedItems.pop()
			setSelectedItems(newSelectedItems)
		}
	}

	return (
		<div ref={dropdownRef} className = {`${s.dropdown} ${isOpen && s.open} ${className}`}>
			<div className={s.arrow} onClick={onToggle}>{">"}</div>
			<div className={s.input}>
				<SelectedItems selectedItems={selectedItems} deleteSelectedItem={deleteSelectedItem}/>
				<Input variant={"clear"} ref={inputRef} setValue={setValue} value={value} onClick={onOpen} name={name}/>
			</div>
			<UnsortedList list={list} onOpen={onOpen} setActiveIndex={setActiveIndex} activeIndex={activeIndex} onSelect={onSelect} className={s.list}/>
		</div>
	)
}
