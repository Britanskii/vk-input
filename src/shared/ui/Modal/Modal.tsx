import s from "./modal.module.css"

import { FC, ReactNode, MouseEvent, useState, useRef, useEffect } from "react"

import { Portal } from "../Portal/Portal"
import { classNames } from "../../lib/classNames/classNames"

interface ModalProps {
    className?: string
	full?: boolean
	title?: string
    children: ReactNode
	isOpen: boolean
	onSubmit?: () => void
	onClose?: () => void
	closeFunction?: () => void
	lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal: FC<ModalProps> = (props) => {
	const { children, isOpen, onClose,  onSubmit, closeFunction, title, full = false, lazy = true, className = "" } = props

	const [isMounted, setIsMounted] = useState(false)
	const [isClosing, setIsClosing] = useState(false)

	const timeRef = useRef<ReturnType<typeof setTimeout>>()

	const mods: Record<string, boolean> = {
		[s.opened]: isOpen,
		[s.isClosing]: isClosing,
		[s.full]: full
	}

	const closeAnimation = () => {
		if (onClose) {
			setIsClosing(true)
			timeRef.current = setTimeout(() => {
				onClose()
				setIsClosing(false)
			}, ANIMATION_DELAY)
		}
	}

	const closeHandler = () => {
		closeFunction?.()
		closeAnimation()
	}

	const submitHandler = () => {
		closeAnimation()
		onSubmit?.()
	}

	const onContentClick = (event: MouseEvent) => {
		event.stopPropagation()
	}

	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			closeAnimation()
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
				<div className={s.overlay} onClick={closeAnimation}>
					<div className={s.content} onClick={onContentClick}>
						<div className={s.navigation}>
							<div className={s.close} onClick={closeHandler}>Cancel</div>
							<div className={s.title}>{title}</div>
							<div className={s.select} onClick={submitHandler}>Done</div>
						</div>
						{children}
					</div>
				</div>
			</div>
		</Portal>
	)
}
