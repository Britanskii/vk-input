import s from "./input.module.css"
import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	InputHTMLAttributes,
	RefAttributes,
	useEffect,
	useState
} from "react"
import { useForm } from "../../context/formContext/lib/useForm"

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">

interface InputProps<T> extends HTMLInputProps {
	className?: string
	name: Extract<keyof T, string>
	changedValue?: string
}

const InputRef = forwardRef(<T,>(props: InputProps<T>, ref: ForwardedRef<HTMLInputElement>) => {
	const { name, changedValue = "", className = "", ...otherProps } = props
	const [value, setValue] = useState("")

	const { setField } = useForm<T>(name)

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setField(value)
		setValue(value)
	}

	useEffect(() => {
		setValue(changedValue)
	}, [changedValue])

	return (
		<input
			{...otherProps}
			ref={ref && ref}
			name={name}
			onChange={onChange}
			value={value}
			className={`${s.input} ${className} 1`}
			type="text"
		/>
	)
})

InputRef.displayName = "InputRef"

export const Input = InputRef as unknown as <T>(props: InputProps<T> & RefAttributes<HTMLInputElement>) => JSX.Element
