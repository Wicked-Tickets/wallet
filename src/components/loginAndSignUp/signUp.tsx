import { useState } from "react"
import Input from "../shared/input"
import { addUser } from "@/firebase/collections/user"

const Signup = () => {
	const [email, setEmail] = useState('')
	const [passphrase, setPassphrase] = useState('')
	const [username, setUsername] = useState('')

	const handleSignup = async () => {
		const user : User = {
			username: username,
			email: email,
			passprase: passphrase
		}
		
		await addUser(user) 
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
				placeholder = "Username"
				handleChange = {
					(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)
				}
			/>
			<Input 
				value = {email}
				labelText = "Email address"
				labelFor = "email-address"
				id = "email-address"
				name = "email"
				type = "email"
				isRequired = { true }
				placeholder = "Email address"
				handleChange = {
					(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)
				}
			/>
			<Input 
				value = {passphrase}
				labelText = "Passphrase"
				labelFor = "passphrase"
				id = "passphrase"
				name = "passphrase"
				type = "password"
				isRequired = { true }
				placeholder = "Passphrase"
				handleChange = {
					(event: React.ChangeEvent<HTMLInputElement>) => setPassphrase(event.target.value)
				}
			/>
			<div className="flex justify-center">
				<button
					className="font-mono bg-[#FB2576] hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-[#FB2576] text-white font-bold py-2 px-4 rounded"
					onClick={handleSignup}
					disabled={!(username !== "" && passphrase !== "" && email !== "")}
				>
						Create account
				</button>
			</div>
		</div>
	)
}

export default Signup
