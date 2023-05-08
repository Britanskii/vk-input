import { TypeKeys } from "../../app/types/types"

export const parseToDropdownData = <T>(array: T[], idField: TypeKeys<T, number>, valueField: TypeKeys<T, string>) => {
	return array.map((item) => (
		{ id: item[idField], value: item[valueField] }
	))
}
