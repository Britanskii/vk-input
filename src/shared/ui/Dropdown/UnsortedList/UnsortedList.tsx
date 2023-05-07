import { Dispatch, FC, memo, SetStateAction, useEffect } from "react"
import s from "./unsortedList.module.css"
import { ListItem } from "./ListItem/ListItem"

interface UnsortedListProps {
	activeIndex: number
	onSelect: (value: string) => void
	setActiveIndex: Dispatch<SetStateAction<number>>
	list: any[]
    className?: string
}

export const UnsortedList: FC<UnsortedListProps> = memo(({ onSelect, setActiveIndex, activeIndex, list, className = "" }) => {
	const isListZeroLength = list.length === 0

	useEffect(() => {
		document.addEventListener("keydown", onArrowSelect)

		return () => {
			document.removeEventListener("keydown", onArrowSelect)
		}
	}, [activeIndex, list])

	const onArrowSelect = (event: KeyboardEvent) => {
		const code = event.code

		if (isListZeroLength) return

		if (code === "ArrowUp") {
			if (activeIndex !== 0) {
				setActiveIndex(activeIndex => activeIndex -= 1)
			} else {
				setActiveIndex(list.length - 1)
			}

		}

		if (code === "ArrowDown") {
			if (activeIndex !== list.length - 1) {
				setActiveIndex(activeIndex => activeIndex += 1)
			} else {
				setActiveIndex(0)
			}

		}
	}

	return (
		<ul className={`${s.list} ${className}`}>
			{list.map((item, index) => {
				const active = activeIndex === index

				return <ListItem active={active} onSelect={onSelect} key={index} value={item}/>
			})}
			{isListZeroLength && <li className={s.none}>Ничего не было найдено</li>}
		</ul>
	)
})

UnsortedList.displayName = "UnsortedList"
