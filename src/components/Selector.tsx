import { Option } from "@/types";
import { Select, SelectItem } from "@nextui-org/react";
import { ChangeEvent } from "react";

interface SelectorProps {
	id: string;
	label: string;
	options: Option[];
	values: string[];
	updateValue: (newValue: string) => void;
}

function Selector({
	id,
	label,
	options,
	values,
	updateValue,
}: SelectorProps): JSX.Element {
	const handleChange = (event: ChangeEvent<HTMLSelectElement>): void => {
		if (!event.target.value) {
			return;
		}
		updateValue(event.target.value);
	};

	const optionElements = options.map(({ text, value }) => {
		return (
			<SelectItem
				key={value}
				value={value}
			>
				{text}
			</SelectItem>
		);
	});

	return (
		<Select
			id={id}
			label={label}
			selectedKeys={values}
			onChange={handleChange}
		>
			{optionElements}
		</Select>
	);
}

export default Selector;
