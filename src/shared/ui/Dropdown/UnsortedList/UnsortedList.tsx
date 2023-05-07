import { Dispatch, FC, memo, SetStateAction, useEffect } from "react"
import s from "./unsortedList.module.css"
import { ListItem } from "./ListItem/ListItem"

interface UnsortedListProps {
	activeIndex: number
	onSelect: (value: string) => void
	onOpen: () => void
	setActiveIndex: Dispatch<SetStateAction<number>>
	list: any[]
    className?: string
}

export const UnsortedList: FC<UnsortedListProps> = memo(({ onSelect, setActiveIndex, onOpen, activeIndex, list, className = "" }) => {

	useEffect(() => {
		document.addEventListener("keydown", onTabSelect)

		return () => {
			document.removeEventListener("keydown", onTabSelect)
		}
	}, [activeIndex])

	const onTabSelect = (event: KeyboardEvent) => {
		const code = event.code

		if (code === "Tab" || code === "ArrowDown") {
			event.preventDefault()
			onOpen()
		}

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
		</ul>
	)
})

UnsortedList.displayName = "UnsortedList"
