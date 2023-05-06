import s from "./dropdown.module.css"

import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../Input/Input"
import { UnsortedList } from "./UnsortedList/UnsortedList"
import { useForm } from "../../context/formContext/lib/useForm"

interface DropdownProps {
	name: string
	label?: string
    className?: string
}

const mocked = ["Английский", "Русский", "Французкий", "Немецкий"]

export const Dropdown: FC<DropdownProps> = ({ name, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState("")
	const [activeIndex, setActiveIndex] = useState(-1)
	const dropdownRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const { setField } = useForm(name)

	const onSelect = useCallback((value: string) => {
		setActiveIndex(-1)
		setValue(value)
		setField(value)
		onClose()
		if (inputRef.current) {
			inputRef.current.focus()
		}
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
			document.addEventListener("keydown", onTabSelect)
		} else {
			document.removeEventListener("click", clickOutside)
			document.removeEventListener("keydown", onTabSelect)
		}

		return () => {
			if (dropdownRef.current) {
				dropdownRef.current.removeEventListener("keydown", onTabOpen)
			}

			document.removeEventListener("keydown", onTabSelect)
			document.removeEventListener("click", clickOutside)
		}
	}, [isOpen, activeIndex])

	const onTabOpen = (event: KeyboardEvent) => {
		const code = event.code

		if (!isOpen && (code === "Tab" || code === "ArrowDown")) {
			event.preventDefault()
			onOpen()
		}
	}

	const onTabSelect = (event: KeyboardEvent) => {
		const code = event.code

		if (!isOpen && (code === "Tab" || code === "ArrowDown")) {
			event.preventDefault()
			onOpen()
		}

		if (code === "ArrowUp") {
			if (activeIndex !== 0) {
				setActiveIndex(activeIndex => activeIndex -= 1)
			} else {
				setActiveIndex(mocked.length - 1)
			}

		}

		if (code === "ArrowDown") {
			if (activeIndex !== mocked.length - 1) {
				setActiveIndex(activeIndex => activeIndex += 1)
			} else {
				setActiveIndex(0)
			}

		}
	}

	return (
		<div ref={dropdownRef} className = {`${s.dropdown} ${isOpen && s.open} ${className}`}>
			<div className={s.arrow} onClick={onToggle}>{">"}</div>
			<Input ref={inputRef} changedValue={value} onClick={onOpen} name={name} className={isOpen && s.input}/>
			<UnsortedList list={mocked} activeIndex={activeIndex} onSelect={onSelect} className={s.list}/>
		</div>
	)
}
