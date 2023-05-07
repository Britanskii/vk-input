import { createContext, ReactNode, useMemo, useRef } from "react"

export interface FormContextProps {
	form?: any,
	setForm?: (form: any) => void
}

interface FormProviderProps {
	children: ReactNode
}

export const FormContext = createContext<FormContextProps>({})

export const FormProvider= (props: FormProviderProps) => {
	const { children } = props

	const form = useRef({})

	const setForm = (value: any) => {
		form.current = value
	}

	const initialValue = useMemo(() => ({ form, setForm }), [])


	return (
		<FormContext.Provider value={initialValue}>
			{children}
		</FormContext.Provider>
	)
}
