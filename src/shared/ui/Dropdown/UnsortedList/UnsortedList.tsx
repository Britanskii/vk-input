import { FC } from "react"
import s from "./unsortedList.module.css"
import { ListItem } from "./ListItem/ListItem"

interface UnsortedListProps {
	activeIndex: number
	onSelect: (value: string) => void
	list: any[]
    className?: string
}

export const UnsortedList: FC<UnsortedListProps> = ({ onSelect, activeIndex, list, className = "" }) => {

	return (
		<ul className={`${s.list} ${className}`}>
			{list.map((item, index) => {
				const active = activeIndex === index

				return <ListItem active={active} onSelect={onSelect} key={index} value={item}/>
			})}
		</ul>
	)
}
