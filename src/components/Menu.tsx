import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import MenuPopup from "@/components/MenuPopup";

import type AlertMessage from "@/types/AlertMessage";

interface Props {
	exportAsFile: () => void;
	openLocalFile: () => void;
	updateAlertMessage: (newValue: AlertMessage | null) => void;
}

function Menu({ exportAsFile, openLocalFile, updateAlertMessage }: Props) {
	const [showMenu, setShowMenu] = useState<boolean>(false);

	const openMenu = () => {
		setShowMenu(true);
	};

	const updateShowMenu = (newValue: boolean) => {
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
			/>
			<MenuPopup
				show={showMenu}
				exportAsFile={exportAsFile}
				openLocalFile={openLocalFile}
				updateAlertMessage={updateAlertMessage}
				updateShowMenu={updateShowMenu}
			/>
		</>
	);
}

export default Menu;
