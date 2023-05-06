
import { FC } from "react"

interface LabelProps {
    className?: string
}

export const Label: FC<LabelProps> = (props) => {
	const { className = "" } = props

	return (
		<div className = {"classNames([s.label, className])"}>

		</div>
	)
}
