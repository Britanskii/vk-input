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
		if (active) {
			if (itemRef.current) {
				itemRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
			}
			document.addEventListener("keydown", onKeyDown)
		}

		return () => {
			if (active) {
				document.removeEventListener("keydown", onKeyDown)
			}
		}
	}, [active])

	return (
		<li ref={itemRef} onClick={onValueSelect} className={`${s.item} ${active ? s.active : ""} ${className}`}>
			{value}
		</li>
	)
})

ListItem.displayName = "ListItem"
