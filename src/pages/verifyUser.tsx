import Header from '@/components/loginAndSignUp/header'
import Footer from '@/components/shared/footer'
import Input from '@/components/shared/input'
import {
  createAccountKeyIdentityPrivate_SHA256,
  createAccountKeyMaster_AESCBC,
  decrypt,
  encrypt,
  generatePublicKey_secp256k1,
  stretchKey_PBKDF2,
} from '@/services/utils/cryptoHelper'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [passphrase, setPassphrase] = useState('')
  const [salt, setSalt] = useState('')
  const [passedVerification, setPassedVerification] = useState<boolean>()

  const handleVerify = async () => {
    let verified = false
    const msg = 'Gary is a doggy'
    const stretchedKey = await stretchKey_PBKDF2(salt, passphrase)
    const accountKeyMaster = await createAccountKeyMaster_AESCBC(stretchedKey)
    const encryptedText = await encrypt(msg, accountKeyMaster)
    const storedAccountKeyMasterString = localStorage.getItem('accountKeyMaster')
    if (storedAccountKeyMasterString) {
      //const decrypted = await decrypt(encryptedText, JSON.parse(storedAccountKeyMasterString))
      const storedPassphrase = localStorage.getItem('passphrase')
      const storedSalt = localStorage.getItem('salt')
      verified = storedPassphrase === passphrase && salt === storedSalt
      setPassedVerification(verified)
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
          <p className="font-mono mt-8 text-md">
            In order to create your account we need to verify that you know your passphrase and your salt
          </p>
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
              onClick={handleVerify}
              disabled={!(salt !== '' && passphrase !== '')}
            >
              Verify account
            </button>
            {passedVerification !== undefined ? (
              <div className="mt-4">
                {passedVerification ? (
                  <p className="font-mono text-purple-500">
                    Your account has been verified and created, you can login now 👉🏻 <Link href={'/'}>Lets go</Link>
                  </p>
                ) : (
                  <p className="font-mono text-purple-500">
                    Your account it is not passing the verification, try again?
                  </p>
                )}
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
