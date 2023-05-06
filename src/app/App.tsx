import React from "react"
import "./styles/reset.css"
import s from "./app.module.css"
import { Input } from "../shared/ui"
import { FormProvider } from "../shared/context/formContext/ui/FormProvider"
import { Dropdown } from "../shared/ui/Dropdown/Dropdown"

const App = () => (
	<div className={s.app}>
		<FormProvider>
			<Dropdown name={"drop"}/>
			<Input name={"input"}/>
		</FormProvider>
	</div>
)

export default App
