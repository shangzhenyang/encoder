import MenuPopup from "@/components/MenuPopup";
import { handleKeyboardClick } from "@/utils";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import { useState } from "react";

interface MenuProps {
	exportAsFile: () => void;
	openLocalFile: () => void;
}

function Menu({
	exportAsFile,
	openLocalFile,
}: MenuProps): JSX.Element {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const openMenu = (): void => {
		setShowMenu(true);
	};

	const updateShowMenu = (newValue: boolean): void => {
		setShowMenu(newValue);
	};

	return (
		<>
			<FontAwesomeIcon
				icon={faBars}
				size="xl"
				role="button"
				tabIndex={0}
				title={t("menu").toString()}
				onClick={openMenu}
				onKeyDown={handleKeyboardClick(openMenu)}
			/>
			<MenuPopup
				show={showMenu}
				exportAsFile={exportAsFile}
				openLocalFile={openLocalFile}
				updateShowMenu={updateShowMenu}
			/>
		</>
	);
}

export default Menu;
