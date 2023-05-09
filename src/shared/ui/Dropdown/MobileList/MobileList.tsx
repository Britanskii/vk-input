import s from "./mobileList.module.css"
import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from "react"
import { Input } from "../../Input/Input"

import { Modal } from "../../Modal/Modal"
import { IListItem } from "../Dropdown"
import { MobileListItem } from "./MobileListItem/MobileListItem"

interface MobileListProps {
    title: string
	isOpen: boolean
	onClose: () => void
	setList: (list: IListItem[]) => void
	onChange: (value: string) => void
	list: IListItem[]
	setSelectedItems: Dispatch<SetStateAction<IListItem[]>>
	selectedItems: IListItem[]
}

export const MobileList: FC<MobileListProps> = ({ title, list, selectedItems, setSelectedItems, onChange, isOpen, onClose }) => {
	const [innerSelectedItems, setInnerSelectedItems] = useState<IListItem[]>(selectedItems)
	const [value, setValue] = useState("")

	const onReturnSelectedItemsState = useCallback( () => {
		setValue("")
		setInnerSelectedItems(selectedItems)
	}, [])

	const deleteInnerSelectedItem = useCallback((id: number) => {
		setInnerSelectedItems(innerSelectedItems => innerSelectedItems = innerSelectedItems.filter((item) => item.id !== id))
	}, [])

	const onSubmit = useCallback(() => {
		setValue("")
		setSelectedItems(innerSelectedItems)
	}, [])

	const onSelect = useCallback((item: IListItem) => {
		setInnerSelectedItems(selectedItems => selectedItems = [...selectedItems, item])
	}, [])

	useEffect(() => {
		setInnerSelectedItems(selectedItems)
	}, [selectedItems])

	useEffect(() => {
		onChange(value)
	}, [value])

	return (
		<Modal title={title} full={true} isOpen={isOpen} closeFunction={onReturnSelectedItemsState} onClose={onClose} onSubmit={onSubmit}>
			<Input placeholder={"Поиск"} value={value} setValue={setValue} name={"name"}/>
			<ul className={s.list}>
				{list.map((item) =>
					<MobileListItem selectedItems={innerSelectedItems} key={item.id} item={item} deleteSelectedItem={deleteInnerSelectedItem} onSelect={onSelect}/>)}
			</ul>
		</Modal>
	)
}
