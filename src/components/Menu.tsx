import { Dispatch, SetStateAction, useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import MenuPopup from "@/components/MenuPopup";

import type AlertMessage from "@/types/AlertMessage";

interface Props {
	exportAsFile: () => void;
	openLocalFile: () => void;
	setAlertMessage: Dispatch<SetStateAction<AlertMessage | null>>;
}

function Menu({ exportAsFile, openLocalFile, setAlertMessage }: Props) {
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		setShowMenu(true);
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
				setShow={setShowMenu}
				exportAsFile={exportAsFile}
				openLocalFile={openLocalFile}
				setAlertMessage={setAlertMessage}
			/>
		</>
	);
}

export default Menu;
