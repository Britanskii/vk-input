import s from "./submitButton.module.css"
import { FC, MouseEvent } from "react"

import { useForm } from "../../context/formContext/lib/useForm"

interface SubmitButtonProps {
    className?: string
}

export const SubmitButton: FC<SubmitButtonProps> = (props) => {
	const { className = "" } = props

	const { values } = useForm()

	const onSubmit = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		console.log(values.current)
		alert("Your data!\n" + JSON.stringify(values.current))
	}

	return (
		<button type={"submit"} className={`${s.button} ${className}`} onClick={onSubmit}>Save</button>
	)
}
