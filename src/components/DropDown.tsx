import styles from "@/styles/DropDown.module.css";
import { Option } from "@/types";
import { ChangeEvent } from "react";

interface DropDownProps {
	id: string;
	label: string;
	options: Option[];
	value: string;
	updateValue: (newValue: string) => void;
}

function DropDown({
	id,
	label,
	options,
	value,
	updateValue,
}: DropDownProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		updateValue(event.target.value);
	};

	const optionsElem = options.map(({ text, value }) => {
		return <option key={value} value={value}>{text}</option>;
	});

	return (
		<div className={styles["dropdown-group"]}>
			<label htmlFor={id}>{label}</label>
			<select
				id={id}
				value={value}
				onChange={handleChange}
			>
				{optionsElem}
			</select>
		</div>
	);
}

export default DropDown;
