import { useState } from 'react'
import Input from '../shared/input'
import { sendEmail } from '@/services/api/email'

const Login = () => {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const handleSendLink = async () => {
    await sendEmail(email, 'Wicked wallet - Login', 'New request to login to your account 👉🏻 localhost:3000/login')
    setEmailSent(true)
  }

  return (
    <div className="mt-8 space-y-6">
      <Input
        value={email}
        labelText="Email address"
        labelFor="email-address"
        id="email-address"
        name="email"
        type="email"
        isRequired={true}
        placeholder="Email address"
        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
      />
      <div className="flex flex-col justify-center">
        <button
          className="font-mono bg-[#FB2576] hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-[#FB2576] text-white font-bold py-2 px-4 rounded"
          onClick={handleSendLink}
          disabled={email === ''}
        >
          Send magic link
        </button>
        {emailSent === true ? (
          <div className="mt-4">
            <p className="font-mono text-purple-500">Please check your email</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Login
