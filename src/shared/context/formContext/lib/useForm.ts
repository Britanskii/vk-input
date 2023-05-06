import { useContext } from "react"
import { FormContext } from "../ui/FormProvider"

type UseForm<T> = keyof T

export const useForm = <T>(field: UseForm<T>) => {
	const { form, setForm } = useContext(FormContext)

	const setField = (value: any) => {
		const newValues = { ...form.current, [field]: value }
		setForm?.(newValues)
	}

	return { values: form, setField }
}
