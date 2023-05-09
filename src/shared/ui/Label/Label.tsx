import s from "./label.module.css"
import { FC, ReactNode } from "react"

interface LabelProps {
	label?: string
	name: string
	children: ReactNode
}

export const Label: FC<LabelProps> = ({ children, label, name }) => {

	return (
		<label htmlFor={name} className={`${s.label}`}>
			{label &&
                <div className={s.text}>{label}</div>
			}
			{children}
		</label>
	)
}
