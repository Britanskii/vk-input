import React from "react"
import "./styles/reset.css"
import s from "./app.module.css"
import { Input } from "../shared/ui"
import { FormProvider } from "../shared/context/formContext/ui/FormProvider"

const App = () => (
	<div className={s.app}>
		<FormProvider>
			<Input name={"name"}/>
			<Input name={"surname"}/>
			<Input name={"tel"}/>
		</FormProvider>
	</div>
)

export default App
