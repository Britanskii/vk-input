import React from "react"
import "./styles/reset.css"
import s from "./app.module.css"
import { ProfileForm } from "../widgets/ProfileForm/ProfileForm"

const App = () => {


	return(
		<div className={s.app}>
			<ProfileForm/>
		</div>
	)
}


export default App
