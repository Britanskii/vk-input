import { FC, memo, useEffect, useRef } from "react"
import s from "./listItem.module.css"

interface UnsortedListProps {
	active: boolean
	value: string
	onSelect: (value: string) => void
	className?: string
}

export const ListItem: FC<UnsortedListProps> = memo(({ value, onSelect, active, className = "" }) => {
	const itemRef = useRef<HTMLLIElement>(null)

	const onValueSelect = () => onSelect(value)

	const onKeyDown = (event: KeyboardEvent) => {
		const code = event.code

		if (code === "Enter" || code === "Space") {
			onValueSelect()
		}
	}

	useEffect(() => {
		if (itemRef.current) {
			itemRef.current.addEventListener("keydown", onKeyDown)

			if (active) {
				itemRef.current.focus()
			}
		}


		return () => {
			if (itemRef.current) {
				itemRef.current.removeEventListener("keydown", onKeyDown)
			}
		}
	}, [itemRef.current, active])

	return (
		<li ref={itemRef} tabIndex={0} onClick={onValueSelect} className={`${s.item} ${className}`}>
			{value}
		</li>
	)
})

ListItem.displayName = "ListItem"
