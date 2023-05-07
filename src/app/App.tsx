import React from "react"
import "./styles/reset.css"
import s from "./app.module.css"
import { FormProvider } from "../shared/context/formContext/ui/FormProvider"
import { Dropdown } from "../shared/ui/Dropdown/Dropdown"
import { Input } from "../shared/ui"

const App = () => (
	<div className={s.app}>
		<FormProvider>
			<Input name={"name"}/>
			<Dropdown name={"drop"}/>
		</FormProvider>
	</div>
)

export default App
