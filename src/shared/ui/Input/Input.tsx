import s from "./input.module.css"
import { ChangeEvent, useState } from "react"

export const Input = () => {
	const [value, setValue] = useState("")

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value

		setValue(value)
	}

	return (
		<input onChange={onChange} value={value} className={s.input} type="text"/>
	)
}
