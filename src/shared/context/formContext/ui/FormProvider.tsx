import { createContext, ReactNode, useRef } from "react"

export interface FormContextProps {
	form?: any,
	setForm?: (form: any) => void
}

interface FormProviderProps {
	className?: string
	children: ReactNode
}

export const FormContext = createContext<FormContextProps>({})

export const FormProvider = (props: FormProviderProps) => {
	const { children, className = "" } = props

	const form = useRef({})

	const setForm = (value: string) => {
		form.current = value
	}

	const initialValue = { form: form, setForm }

	return (
		<FormContext.Provider value={initialValue}>
			<form className={className}>
				{children}
			</form>
		</FormContext.Provider>
	)
}
