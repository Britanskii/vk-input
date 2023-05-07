import s from "./dropdown.module.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../Input/Input"
import { UnsortedList } from "./UnsortedList/UnsortedList"
import { useForm } from "../../context/formContext/lib/useForm"
import { SelectedItems } from "./SelectedItems/SelectedItems"
import arrow from "../../assets/icons/arrow_down.png"

interface DropdownProps {
	name: string
	label?: string
    className?: string
}

const mocked = ["Английский", "Русский", "Французкий", "Немецкий", "Русский1", "Французкий2", "Немецкий3"]

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
		setValue("")
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

		if (!isOpen && code === "ArrowDown") {
			onOpen()
		}

		if (isOpen && code === "Tab" || activeIndex === -1 && code === "ArrowUp") {
			onClose()
		}

		if (value === "" && code === "Backspace") {
			const newSelectedItems = [...selectedItems]
			newSelectedItems.pop()
			setSelectedItems(newSelectedItems)
		}
	}

	const onFilter = (query: string, arr: string[], list: string[]): string[] => {
		const lowerCaseQuery: string = query.toLowerCase().replace(/\s/g, "")
		return arr.filter((word: string) => {
			const lowerCaseWord: string = word.toLowerCase().replace(/\s/g, "")
			return lowerCaseWord.includes(lowerCaseQuery) &&  !list.includes(word)
		})
	}

	useEffect(() => {
		if (!isOpen && value !== "") {
			onOpen()
		}
		setList(onFilter(value, mocked, selectedItems))
	}, [value, selectedItems])


	return (
		<div ref={dropdownRef} className = {`${s.dropdown} ${isOpen && s.open} ${className}`}>
			<img src={arrow} className={s.arrow} onClick={onToggle}/>
			<div className={s.input}>
				<SelectedItems value={value} selectedItems={selectedItems} deleteSelectedItem={deleteSelectedItem}/>
				<Input className={s.innerInput} variant={"clear"} ref={inputRef} setValue={setValue} value={value} onClick={onOpen} name={name}/>
			</div>
			<UnsortedList list={list} setActiveIndex={setActiveIndex} activeIndex={activeIndex} onSelect={onSelect} className={s.list}/>
		</div>
	)
}
