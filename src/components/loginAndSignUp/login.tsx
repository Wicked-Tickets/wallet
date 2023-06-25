import { useState } from "react"
import Input from "../shared/input"

const Login = () => {
	const [email, setEmail] = useState('')

	const handleSendLink = async () => {
		console.log('send link')
	}

	return (
		<div className="mt-8 space-y-6">
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
			<div className="flex justify-center">
				<button
					className="font-mono bg-[#FB2576] hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-[#FB2576] text-white font-bold py-2 px-4 rounded"
					onClick={handleSendLink}
					disabled={email === ""}
				>
					Send magic link
				</button>
			</div>
		</div>
	)
}

export default Login
