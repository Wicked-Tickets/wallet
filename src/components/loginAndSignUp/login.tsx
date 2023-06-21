import { useState } from "react"
import Input from "../shared/input"

const Login = () => {
	const [email, setEmail] = useState('')
	const [passphrase, setPassphrase] = useState('')

	const handleEmailAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value)
	}

	const handlePassphrase = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassphrase(event.target.value)
	}

	return (
		<form className="mt-8 space-y-6">
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
			<div className="flex justify-center">
				<button className="font-mono bg-[#FB2576] hover:bg-purple-500 text-white font-bold py-2 px-4 rounded">Send magic link</button>
			</div>
		</form>
	)
}

export default Login
