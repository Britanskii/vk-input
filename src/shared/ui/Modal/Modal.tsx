import s from "./modal.module.css"

import { FC, ReactNode, MouseEvent, useState, useRef, useEffect } from "react"

import { Portal } from "../Portal/Portal"
import { classNames } from "../../lib"

interface ModalProps {
    className?: string
	full?: boolean
	title?: string
    children: ReactNode
	isOpen: boolean
	onSubmit?: () => void
	onClose?: () => void
	lazy?: boolean
}

export const Modal: FC<ModalProps> = (props) => {
	const { children, isOpen, onClose,  onSubmit, title, full = false, lazy = true, className = "" } = props

	const [isMounted, setIsMounted] = useState(false)

	const timeRef = useRef<ReturnType<typeof setTimeout>>()

	const mods: Record<string, boolean> = {
		[s.opened]: isOpen,
		[s.full]: full
	}

	const closeHandler = () => {
		onClose?.()
	}

	const submitHandler = () => {
		closeHandler()
		onSubmit?.()
	}

	const onContentClick = (event: MouseEvent) => {
		event.stopPropagation()
	}

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			closeHandler()
		}
	}

	useEffect(() => {
		if (isOpen) {
			setIsMounted(true)
			window.addEventListener("keydown", onKeyDown)
		}

		return () => {
			clearTimeout(timeRef.current)
			window.removeEventListener("keydown", onKeyDown)
		}
	}, [isOpen])

	if (lazy && !isMounted) {
		return null
	}

	return (
		<Portal>
			<div className = {classNames([s.modal, className], mods)}>
				<div className={s.overlay} onClick={closeHandler}>
					<div className={s.content} onClick={onContentClick}>
						<div className={s.navigation}>
							<button type={"button"} className={s.close} onClick={closeHandler}>Cancel</button>
							<div className={s.title}>{title}</div>
							<button type={"button"}  className={s.select} onClick={submitHandler}>Done</button>
						</div>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	)
}
