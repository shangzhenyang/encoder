import { Option } from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

interface SelectorProps {
	id: string;
	label: string;
	options: Option[];
	value: string;
	updateValue: (newValue: string) => void;
}

function Selector({
	id,
	label,
	options,
	value,
	updateValue,
}: SelectorProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		updateValue(event.target.value);
	};

	const optionElements = options.map(({ text, value }) => {
		return <SelectItem key={value} value={value}>{text}</SelectItem>;
	});

	return (
		<Select
			defaultSelectedKeys={[value]}
			id={id}
			label={label}
			value={value}
			onChange={handleChange}
		>
			{optionElements}
		</Select>
	);
}

export default Selector;
