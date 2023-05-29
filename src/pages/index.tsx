import Image from 'next/image'

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24"
    >
      <div className="z-10 w-full items-center justify-between font-mono text-lg lg:flex">
        <h1 className="fixed left-0 top-0 flex w-full justify-center
         pb-6 pt-8 lg:static lg:w-auto  
         lg:p-4 lg:border-0">
          The wicked wallet
        </h1>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
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

      <div className="relative flex place-items-center">
        <div>
          <Image
            src={"/skulls-back-skulls.png"}
            alt="Wicked Craniums"
            width={100}
            height={100}
            priority
          />
        </div>
        <div>
          
        </div>
      </div>
    </main>
  )
}
