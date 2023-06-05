import Header from '@/components/loginAndSignup/header'
import Login from '@/components/loginAndSignup/login'
import Signup from '@/components/loginAndSignup/signUp'
import Footer from '@/components/shared/footer'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [showSignup, setShowSignup] = useState(false)

  const handleShowSignUp = () => {
    setShowSignup(!showSignup)
  }

  return (
    <main
      className="min-h-screen p-24"
    >
      <div className="flex flex-row z-10 w-full items-center justify-between font-mono text-xl lg:flex">
        <h1 className="fixed left-0 top-0 flex w-full justify-center
         pb-6 pt-8 lg:static lg:w-auto  
         lg:p-4 lg:border-0">
          The wicked wallet
        </h1>
        <div className="fixed bottom-10 left-0 flex h-fit w-full items-end justify-center lg:static lg:h-auto lg:w-auto">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://www.wickedcranium.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src={"/wicked-craniums.webp"}
              alt="Wicked Craniums"
              width={200}
              height={200}
              priority
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col mt-40 relative place-items-center">
        <Header />
        <div className='lg:w-1/3'>
          {!showSignup 
          ? <>
              <p className='font-mono mt-8 text-md'>Don't have a public key? Create one{' '} 
                <span className='text-purple-500 cursor-pointer' onClick={handleShowSignUp}>here</span>
              </p>
              <Login />
            </> 
          : <>
              <p className='font-mono mt-8 text-md'>Already have a public key? Enter it{' '} 
                <span className='text-purple-500 cursor-pointer' onClick={handleShowSignUp}>here</span>
              </p>
              <Signup />
            </>}
        </div>
      </div>
      <Footer />
    </main>
  )
}
