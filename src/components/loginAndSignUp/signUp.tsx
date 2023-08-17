import { useState } from 'react'
import Input from '../shared/input'
import { sendEmail } from '@/services/api/email'
import { addUser } from '@/services/api/user'
import {
  createAccountKeyIdentityPrivate_SHA256,
  createAccountKeyMaster_AESCBC,
  decrypt,
  encrypt,
  generatePublicKey_secp256k1,
  stretchKey_PBKDF2,
} from '@/services/utils/cryptoHelper'
import { useRouter } from 'next/router'

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [salt, setSalt] = useState('')
  const [username, setUsername] = useState('')

  const handleSignup = async () => {
    const stretchedKey = await stretchKey_PBKDF2(salt, passphrase)
    const accountKeyMaster = await createAccountKeyMaster_AESCBC(stretchedKey)
    localStorage.setItem('passphrase', passphrase)
    localStorage.setItem('salt', salt)
    const user: User = {
      username: username,
      email: email,
      passprase: passphrase,
      salt: salt,
    }
    const addUserResponse = await addUser(user)
    if (addUserResponse.ok) {
      await sendEmail(user.email, 'Welcome to your wallet', 'Email to welcome you 😎, please verify your account')
    }
    router.push('/verifyUser')
  }

  return (
    <div className="mt-8 space-y-6">
      <Input
        value={username}
        labelText="Username"
        labelFor="username"
        id="username"
        name="username"
        type="text"
        isRequired={true}
        placeholder="Username"
        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
      />
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
      <Input
        value={passphrase}
        labelText="Passphrase"
        labelFor="passphrase"
        id="passphrase"
        name="passphrase"
        type="password"
        isRequired={true}
        placeholder="Passphrase"
        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassphrase(event.target.value)}
      />
      <Input
        value={salt}
        labelText="Salt"
        labelFor="salt"
        id="salt"
        name="salt"
        type="password"
        isRequired={true}
        placeholder="Salt"
        handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setSalt(event.target.value)}
      />
      <div className="flex justify-center">
        <button
          className="font-mono bg-[#FB2576] hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-[#FB2576] text-white font-bold py-2 px-4 rounded"
          onClick={handleSignup}
          disabled={!(username !== '' && passphrase !== '' && email !== '')}
        >
          Create account
        </button>
      </div>
    </div>
  )
}

export default Signup
