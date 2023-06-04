import Link from 'next/link'
import TwitterIcon from '../../icons/twitterIcon.svg'
import DiscordIcon from '../../icons/discordIcon.svg'
import MediumIcon from '../../icons/mediumIcon.svg'
import InstagramIcon from '../../icons/instagramIcon.svg'

const Footer = () => {
	return (
		<div className="flex flex-row">
			<Link
					href={'/auth/facebook'}
					className="btn btn-square flex rounded-xl p-4 hover:border-accent focus:outline-none"
				>
				<TwitterIcon />
			</Link>
			<Link
					href={'/auth/facebook'}
					className="btn btn-square flex rounded-xl p-4 hover:border-accent focus:outline-none"
				>
				<DiscordIcon />
			</Link>
			<Link
					href={'/auth/facebook'}
					className="btn btn-square flex rounded-xl p-4 hover:border-accent focus:outline-none"
				>
				<MediumIcon />
			</Link>
			<Link
					href={'/auth/facebook'}
					className="btn btn-square flex rounded-xl p-4 hover:border-accent focus:outline-none"
				>
				<InstagramIcon />
			</Link>
		</div>
	) 
}

export default Footer
