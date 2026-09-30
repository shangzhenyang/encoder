import type { Option } from "@/types";
import type { Key } from "@heroui/react";
import { Label, ListBox, Select } from "@heroui/react";
import type { JSX } from "react";
import { useCallback } from "react";

interface SelectorProps {
	id: string;
	label: string;
	options: Option[];
	updateValue: (newValue: string) => void;
	value: string;
}

function Selector({
	id,
	label,
	options,
	updateValue,
	value,
}: SelectorProps): JSX.Element {
	const handleChange = useCallback(
		(newValue: Key | Key[] | null) => {
			if (typeof newValue !== "string") {
				return;
			}
			updateValue(newValue);
		},
		[updateValue],
	);

	const optionElements = options.map((option) => {
		return (
			<ListBox.Item
				id={option.value}
				key={option.value}
				textValue={option.text}
			>
				{option.text}
				<ListBox.ItemIndicator />
			</ListBox.Item>
		);
	});

	return (
		<Select
			className="w-full"
			id={id}
			onChange={handleChange}
			value={value}
		>
			<Label>{label}</Label>
			<Select.Trigger className="min-h-11 md:min-h-10">
				<Select.Value />
				<Select.Indicator />
			</Select.Trigger>
			<Select.Popover>
				<ListBox>{optionElements}</ListBox>
			</Select.Popover>
		</Select>
	);
}

export default Selector;
