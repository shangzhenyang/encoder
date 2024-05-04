export function handleKeyboardClick(
	onClick: () => void,
): ((event: KeyboardEvent | React.KeyboardEvent<Element>) => void) {
	return (event: KeyboardEvent | React.KeyboardEvent<Element>): void => {
		switch (event.key) {
			case "Enter":
			case " ": {
				onClick();
				event.preventDefault();
			} break;
			default: break;
		}
	};
}
