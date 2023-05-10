import s from "./dropdown.module.css"

import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../Input/Input"
import { UnsortedList } from "./UnsortedList/UnsortedList"
import { useForm } from "../../context/formContext/lib/useForm"
import { SelectedItems } from "./SelectedItems/SelectedItems"
import arrow from "../../assets/icons/arrow_down.png"
import { Label } from "../Label/Label"
import { MobileList } from "./MobileList/MobileList"
import { useDevice } from "../../lib/useDevice/useDevice"

interface DropdownProps {
	name: string
	initialList: IListItem[]
	label?: string
	className?: string
	limit?: number
	placeholder?: string
}

export interface IListItem {
	id: number
	value: string
}

export const Dropdown: FC<DropdownProps> = ({ name, initialList, label, limit = 50, placeholder, className = "" }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [value, setValue] = useState("")
	const [list, setList] = useState<IListItem[]>(initialList)
	const [caretPosition, setCaretPosition] = useState(0)
	const [selectedItems, setSelectedItems] = useState<IListItem[]>([])
	const [activeIndex, setActiveIndex] = useState(0)
	const device = useDevice()
	const dropdownRef = useRef<HTMLDivElement>(null)
	const inputRef = useRef<HTMLInputElement>(null)
	const { setField } = useForm(name)
	const isDisallowNavigation = caretPosition !== 0 && !!value
	const isPrintingAndClosed = !isOpen && value !== ""
	const isNothingSelected = selectedItems.length === 0

	const onSelect = useCallback((selectedItem: IListItem) => {
		setActiveIndex(0)
		setSelectedItems(selectedItems => selectedItems = [...selectedItems, selectedItem].slice(0, limit))
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
		if (isOpen) {
			onClose()
		} else {
			onOpen()
		}
	}

	const onOpen = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
		setIsOpen(true)
	}

	const onClose = useCallback(() => {
		setActiveIndex(0)
		setIsOpen(false)
	}, [])

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

		if (isOpen && code === "Tab" || code === "Escape") {
			onClose()
		}
	}

	const filterListItem = (query: string, initialList: IListItem[], selectedList: IListItem[] = [],): IListItem[] => {
		const editedQuery = query.toLowerCase().replace(/\s/g, "")
		return initialList.filter(({ value, id }) => {
			const editedValue = value.toLowerCase().replace(/\s/g, "")

			const isNoExisted = !selectedList.some((item) => item.id === id)

			return editedValue.includes(editedQuery) && isNoExisted
		})
	}

	const filterAndSetList = (query: string) => setList(filterListItem(query, initialList, selectedItems))
	const filterWithoutItemsAndSetList = (query: string) => {
		const result = filterListItem(query, initialList)
		setList(result)
	}

	useEffect(() => {
		if (device === "DESKTOP") {
			if (dropdownRef.current) {
				dropdownRef.current.addEventListener("keydown", onTabOpen)
			}

			if (isOpen) {
				document.addEventListener("click", clickOutside)
			} else {
				document.removeEventListener("click", clickOutside)
			}
		}

		return () => {
			if (device === "DESKTOP") {
				if (dropdownRef.current) {
					dropdownRef.current.removeEventListener("keydown", onTabOpen)
				}

				document.removeEventListener("click", clickOutside)
			}
		}
	}, [isOpen, activeIndex, selectedItems])

	useEffect(() => {
		if (isPrintingAndClosed) {
			onOpen()
		}

		if (device === "DESKTOP") {
			filterAndSetList(value)
		}
	}, [value, selectedItems, initialList])

	useEffect(() => {
		setList(initialList)
	}, [initialList])

	return (
		<Label label={label} name={name}>
			<div ref={dropdownRef} className={`${s.dropdown} ${isOpen ? s.open : ""} ${className}`}>
				<button type={"button"} onClick={onToggle} className={s.button} ><img src={arrow} className={s.arrow} alt={"close"}/></button>
				<div className={s.input} onClick={onOpen}>
					<SelectedItems onClick={onClose} inputRef={inputRef} setSelectedItems={setSelectedItems}
						isDisallowNavigation={isDisallowNavigation} selectedItems={selectedItems}
						deleteSelectedItem={deleteSelectedItem}/>

					<Input disabled={device === "MOBILE"} placeholder={isNothingSelected ? placeholder : ""} onFocus={onOpen} setCaretPosition={setCaretPosition} classNameWrapper={s.innerInput}
						variant={"clear"} ref={inputRef} setValue={setValue} value={value} onClick={onOpen}
						name={name}/>
				</div>
				{device === "DESKTOP" && isOpen &&
					<UnsortedList inputRef={inputRef} list={list} setActiveIndex={setActiveIndex} activeIndex={activeIndex} onSelect={onSelect} className={s.list}/>
				}
				{device === "MOBILE"  &&
                    <MobileList selectedItems={selectedItems} setSelectedItems={setSelectedItems} list={list} setList={setList} onChange={filterWithoutItemsAndSetList} isOpen={isOpen} onClose={onClose} title={placeholder || ""}/>
				}
			</div>
		</Label>

	)
}
