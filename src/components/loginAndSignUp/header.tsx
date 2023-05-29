import Image from 'next/image'

const Header = () => {
	return (
		<>
			<Image
				src={"/skulls-back-skulls.png"}
				alt="Wicked Craniums"
				width={100}
				height={100}
				priority
			/>
		</>
	)
}

export default Header
