import { ChangeEvent, Dispatch, SetStateAction } from "react";

import type Option from "@/types/Option";

interface Props {
	id: string;
	label: string;
	options: Option[];
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

function DropDown({ id, label, options, value, setValue }: Props) {
	function handleChange(evt: ChangeEvent<HTMLSelectElement>) {
		setValue(evt.target.value);
	}

	const optionsElem = options.map(({ text, value }) => {
		return (
			<option key={value} value={value}>{text}</option>
		);
	});

	return (
		<div className="dropdown-group">
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				value={value}
				onChange={handleChange}>
				{optionsElem}
			</select>
		</div>
	);
}

export default DropDown;
