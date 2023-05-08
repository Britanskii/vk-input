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
import { ValueOf } from "../../../app/types/types"

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">

const InputVariant = {
	CLEAR: "clear",
	DEFAULT: "default"
} as const

type InputVariant = ValueOf<typeof InputVariant>

interface InputProps<T> extends HTMLInputProps {
	className?: string
	name: Extract<keyof T, string>
	variant?: InputVariant
	value?: string
	setValue?: (value: string) => void
	setCaretPosition?: (value: number) => void
}

const InputRef = forwardRef(<T,>(props: InputProps<T>, ref: ForwardedRef<HTMLInputElement>) => {
	const { name, variant = InputVariant.DEFAULT, className = "",  value = "", setValue, setCaretPosition, ...otherProps } = props
	const [innerValue, setInnerValue] = useState("")

	const { setField } = useForm<T>(name)

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value
		setField(value)
		setInnerValue(value)
		setValue?.(value)
	}

	useEffect(() => {
		setInnerValue(value)
	}, [value])

	const onCaretClick = (event: any) => {
		setCaretPosition?.(event?.target?.selectionStart || 0)
	}

	return (
		<input
			{...otherProps}
			ref={ref && ref}
			name={name}
			onSelect={onCaretClick}
			onChange={onChange}
			value={innerValue}
			className={`${s[variant]} ${className}`}
			type="text"
		/>
	)
})

InputRef.displayName = "InputRef"

export const Input = InputRef as unknown as <T>(props: InputProps<T> & RefAttributes<HTMLInputElement>) => JSX.Element
