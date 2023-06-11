import { useState } from "react"
import Input from "../shared/input"
import signUp from "@/firebase/auth/signUp"

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

	const handleSignup = async () => {
		const { result, error } = await signUp(email, passphrase)
		if (error) {
			return console.log(error)
		}

		console.log(result)
	}

	return (
		<div className="mt-8 space-y-6">
			<Input 
				value = {username}
				labelText = "Username"
				labelFor = "username"
				id = "username"
				name = "username"
				type = "text"
				isRequired = { true }
				placeholder= "Username"
				handleChange={handleUsername}
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
			<div className="flex justify-center">
				<button className="font-mono bg-[#FB2576] hover:bg-purple-500 text-white font-bold py-2 px-4 rounded" onClick={handleSignup}>
					Signup to wallet
				</button>
			</div>
		</div>
	)
}

export default Signup
