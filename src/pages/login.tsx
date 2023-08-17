import Header from '@/components/loginAndSignUp/header'
import Footer from '@/components/shared/footer'
import Input from '@/components/shared/input'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [passphrase, setPassphrase] = useState('')
  const [salt, setSalt] = useState('')
  const [passedLogin, setPassedLogin] = useState<boolean>()

  const handleLogin = async () => {
    const storedPassphrase = localStorage.getItem('passphrase')
    const storedSalt = localStorage.getItem('salt')
    const passed = storedPassphrase === passphrase && storedSalt === storedSalt
    setPassedLogin(passed)
    if (passed) {
      router.push('/account')
    }
  }

  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-row z-10 w-full items-center justify-between font-mono text-xl lg:flex">
        <h1
          className="fixed left-0 top-0 flex w-full justify-center
         pb-6 pt-8 lg:static lg:w-auto  
         lg:p-4 lg:border-0"
        >
          The wicked wallet
        </h1>
        <div className="fixed bottom-10 left-0 flex h-fit w-full items-end justify-center lg:static lg:h-auto lg:w-auto">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.wickedcranium.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <Image src={'/wicked-craniums.webp'} alt="Wicked Craniums" width={200} height={200} priority />
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-40 relative place-items-center">
        <Header />
        <div className="lg:w-1/3">
          <p className="font-mono mt-8 text-md">Enter your passphrase and salt</p>
        </div>
        <div className="mt-8 space-y-6 w-full">
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
          <div className="flex flex-col justify-center">
            <button
              className="font-mono bg-[#FB2576] hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-[#FB2576] text-white font-bold py-2 px-4 rounded"
              onClick={handleLogin}
              disabled={!(salt !== '' && passphrase !== '')}
            >
              Login
            </button>
            {passedLogin === false ? (
              <div className="mt-4">
                <p className="font-mono text-purple-500">Wrong passphrase and salt, try again?</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
