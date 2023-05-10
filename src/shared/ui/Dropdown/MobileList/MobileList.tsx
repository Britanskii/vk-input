import s from "./mobileList.module.css"
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../../Input/Input"

import { Modal } from "../../Modal/Modal"
import { IListItem } from "../Dropdown"
import { MobileListItem } from "./MobileListItem/MobileListItem"
import { ReactComponent as SearchIcon } from "../../../assets/icons/search.svg"
import { useForm } from "../../../context/formContext/lib/useForm"
import { useDebounce } from "../../../lib/useDebounce/useDebounce"

interface MobileListProps {
    title: string
	isOpen: boolean
	onClose: () => void
	setList: (list: IListItem[]) => void
	onChange: (value: string) => void
	list: IListItem[]
	name: string
	setSelectedItems: Dispatch<SetStateAction<IListItem[]>>
	selectedItems: IListItem[]
}

const mergeListsUnique = (firstList: IListItem[], secondList: IListItem[]) => {
	return [...firstList, ...secondList.filter((item) =>
		!firstList.some((selectedItem) => selectedItem.id === item.id))]
}

export const MobileList: FC<MobileListProps> = ({ title,  list, name, selectedItems, setSelectedItems, onChange, isOpen, onClose }) => {
	const [innerSelectedItems, setInnerSelectedItems] = useState<IListItem[]>(selectedItems)
	const [firstSelectedItemsList, setFirstSelectedItemsList] = useState<IListItem[]>(list)
	const [value, setValue] = useState("")
	const inputRef = useRef<HTMLInputElement>(null)
	const debouncedValue = useDebounce(value, 100)

	const { setField } = useForm(name)

	const onReturnSelectedItemsState = useCallback( () => {
		onClose()
		setValue("")
		setFirstSelectedItemsList(selectedItems)
		setInnerSelectedItems(selectedItems)
	}, [selectedItems])

	const deleteInnerSelectedItem = useCallback((id: number) => {
		setInnerSelectedItems(innerSelectedItems => innerSelectedItems = innerSelectedItems.filter((item) => item.id !== id))
	}, [])

	const onSubmit = useCallback(() => {
		setValue("")
		setFirstSelectedItemsList(mergeListsUnique(innerSelectedItems, list))
		setSelectedItems(innerSelectedItems)
		setField(innerSelectedItems)
	}, [innerSelectedItems])

	useEffect(() => {
		onChange(debouncedValue)
	}, [debouncedValue])

	useEffect(() => {
		setInnerSelectedItems(selectedItems)
	}, [selectedItems])

	useEffect(() => {
		if (isOpen) {
			setFirstSelectedItemsList(mergeListsUnique(selectedItems, list))
		}
	}, [isOpen, selectedItems, list])


	return (
		<Modal title={title} full={true} isOpen={isOpen} onClose={onReturnSelectedItemsState} onSubmit={onSubmit}>
			<Input icon={<SearchIcon className={s.icon}/>} ref={inputRef} placeholder={"Search"} value={value} setValue={setValue} name={"name"} className={s.input}/>
			<ul className={s.list}>
				{firstSelectedItemsList.map((item) => {
					const active = 	!!innerSelectedItems.find(selected => selected.id === item.id)

					return <MobileListItem active={active} key={item.id} item={item} deleteSelectedItem={deleteInnerSelectedItem} setInnerSelectedItems={setInnerSelectedItems}/>
				})}
			</ul>
		</Modal>
	)
}
