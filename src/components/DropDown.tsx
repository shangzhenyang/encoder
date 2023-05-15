import styles from "@/styles/DropDown.module.css";

import type { ChangeEvent } from "react";
import type Option from "@/types/Option";

interface Props {
	id: string;
	label: string;
	options: Option[];
	value: string;
	updateValue: (newValue: string) => void;
}

function DropDown({ id, label, options, value, updateValue }: Props) {
	const handleChange = (evt: ChangeEvent<HTMLSelectElement>) => {
		updateValue(evt.target.value);
	};

	const optionsElem = options.map(({ text, value }) => {
		return (
			<option key={value} value={value}>{text}</option>
		);
	});

	return (
		<div className={styles["dropdown-group"]}>
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
