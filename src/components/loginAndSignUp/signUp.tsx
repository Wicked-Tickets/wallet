import { useState } from "react"
import Input from "../shared/input"

const Signup = () => {
	const [email, setEmail] = useState('')
	const [passphrase, setPassphrase] = useState('')
	const [username, setUsername] = useState('')

	const handleEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const handlePassphrase = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassphrase(event.target.value)
	}

	const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(event.target.value)
	}

	return (
		<form className="mt-8 space-y-6">
			<Input 
				value = {username}
				labelText = "Username"
				labelFor = "username"
				id = "username"
				name = "username"
				type = "username"
				isRequired = { true }
				placeholder= "Username"
				handleChange={handleEmailAddress}
			/>
			<Input 
				value = {email}
				labelText = "Email address"
				labelFor = "email-address"
				id = "email-address"
				name = "email"
				type = "email"
				isRequired = { true }
				placeholder= "Email address"
				handleChange={handleEmailAddress}
			/>
			<Input 
				value = {passphrase}
				labelText = "Passphrase"
				labelFor = "passphrase"
				id = "passphrase"
				name = "passphrase"
				type = "password"
				isRequired = { true }
				placeholder= "Passphrase"
				handleChange={handlePassphrase}
			/>
		</form>
	)
}

export default Signup
