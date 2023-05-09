import s from "./checkbox.module.css"

import { Dispatch, FC, SetStateAction } from "react"
import { classNames } from "../../lib/classNames/classNames"
import {  ReactComponent as Check } from "../../assets/icons/check.svg"


interface CheckboxProps {
	active: boolean
	setActive?: Dispatch<SetStateAction<boolean>>
}

export const Checkbox: FC<CheckboxProps> = ({ active, setActive }) => {

	const onToggle = () => {
		setActive?.(active => active = !active)
	}

	const mods = {
		[s.checkbox_active]: active
	}

	return (
		<div onClick={onToggle} className = {classNames([s.checkbox], mods)}>
			{active && <Check className={s.arrow}/>}
		</div>
	)
}
