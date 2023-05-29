interface IInput {
	handleChange?: () => void
	value: string
	labelText: string
	labelFor: string
	id: string
	name: string
	type: string
	isRequired: boolean
	placeholder: string
	customClass?: string
}

const Input = (props: IInput) => {
	const { handleChange, value, labelText, labelFor, id,
		name, type, isRequired, placeholder, customClass } = props
	
	return (
		<div className="my-5">
			<label htmlFor={labelFor} className="sr-only">
				{labelText}
			</label>
			<input
				onChange={handleChange ? handleChange : () => {}}
				value={value}
				id={id}
				name={name}
				type={type}
				required={isRequired}
				className={`rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 
				placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 
				focus:z-10 sm:text-sm ${customClass ? customClass : ''}`}
				placeholder={placeholder}
			/>
		</div>
	)
}

export default Input
