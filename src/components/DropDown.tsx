import Option from "../interfaces/Option";

interface Props {
	id: string;
	label: string;
	options: Option[];
}

function DropDown({ id, label, options }: Props) {
	const optionsElem = options.map(({ text, value }) => {
		return <option key={value} value={value}>{text}</option>
	});

	return <div className="dropdown-group">
		<label htmlFor={id}>{label}</label>
		<select id={id}>{optionsElem}</select>
	</div>
}

export default DropDown;
