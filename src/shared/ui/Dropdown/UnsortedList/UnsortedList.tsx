import { Dispatch, FC, memo, RefObject, SetStateAction, useEffect, useRef } from "react"
import s from "./unsortedList.module.css"
import { ListItem } from "./ListItem/ListItem"
import { IListItem } from "../Dropdown"
import { EventCode } from "../../../../app/types/eventCode"

interface UnsortedListProps {
	activeIndex: number
	inputRef: RefObject<HTMLInputElement>
	onSelect: (item: IListItem) => void
	setActiveIndex: Dispatch<SetStateAction<number>>
	list: IListItem[]
    className?: string
}

export const UnsortedList: FC<UnsortedListProps> = memo(({ onSelect, inputRef, setActiveIndex, activeIndex, list, className = "" }) => {
	const unsortedRef = useRef(null)
	const isListZeroLength = list.length === 0

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.addEventListener("keydown", onArrowSelect)
		}

		return () => {
			if (inputRef.current) {
				inputRef.current.removeEventListener("keydown", onArrowSelect)
			}
		}
	}, [activeIndex, list])

	const onArrowSelect = (event: KeyboardEvent) => {
		const code = event.code as EventCode

		if (isListZeroLength) return

		if (code === "ArrowUp") {
			if (activeIndex > 0) {
				setActiveIndex(activeIndex => activeIndex -= 1)
			}
		}

		if (code === "ArrowDown") {
			if (activeIndex !== list.length - 1) {
				setActiveIndex(activeIndex => activeIndex += 1)
			}
		}
	}

	return (
		<ul ref={unsortedRef} className={`${s.list} ${className}`}>
			{list.map((item, index) => {
				const active = activeIndex === index

				return <ListItem inputRef={inputRef} unsortedRef={unsortedRef} setActiveIndex={setActiveIndex} active={active} index={index} onSelect={onSelect} key={item.id} item={item}/>})}
			{isListZeroLength && <li className={s.none}>No results found</li>}
		</ul>
	)
})

UnsortedList.displayName = "UnsortedList"
