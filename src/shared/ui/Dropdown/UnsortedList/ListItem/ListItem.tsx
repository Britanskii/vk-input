import { FC, memo, RefObject, useEffect, useRef } from "react"
import s from "./listItem.module.css"
import { IListItem } from "../../Dropdown"

interface UnsortedListProps {
	unsortedRef: RefObject<HTMLLIElement>
	inputRef: RefObject<HTMLInputElement>
	index: number
	active: boolean
	item: IListItem
	onSelect: (item: IListItem) => void
	setActiveIndex: (index: number) => void
	className?: string
}

const NAVIGATION_OFFSET = 10

export const ListItem: FC<UnsortedListProps> = memo(({
	item,
	unsortedRef,
	inputRef,
	setActiveIndex,
	onSelect,
	active,
	index,
	className = ""
}) => {
	const itemRef = useRef<HTMLLIElement>(null)

	const onMouseEnter = () => setActiveIndex(index)
	const onValueSelect = () => onSelect(item)

	const onKeyDown = (event: KeyboardEvent) => {
		const code = event.code

		if (code === "Enter" || code === "Space") {
			onValueSelect()
		}
	}

	useEffect(() => {
		const isActiveAndMounted = active && !!inputRef.current && !!itemRef.current && !!unsortedRef.current

		if (isActiveAndMounted) {
			inputRef.current.addEventListener("keydown", onKeyDown)

			const listBounds = unsortedRef.current.getBoundingClientRect()
			const itemBounds = itemRef.current.getBoundingClientRect()

			if (itemBounds.y + NAVIGATION_OFFSET > listBounds.bottom) {
				itemRef.current.scrollIntoView({ block: "end" })
			}
			if (itemBounds.y - NAVIGATION_OFFSET < listBounds.y) {
				itemRef.current.scrollIntoView()
			}
		}

		return () => {
			if (isActiveAndMounted) {
				inputRef.current.removeEventListener("keydown", onKeyDown)
			}
		}
	}, [active])

	return (
		<li ref={itemRef} onMouseEnter={onMouseEnter} onClick={onValueSelect}
			className={`${s.item} ${active ? s.active : ""} ${className}`}>
			{item.value}
		</li>
	)
})

ListItem.displayName = "ListItem"
