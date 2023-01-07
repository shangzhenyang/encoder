import { Dispatch, SetStateAction, useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import AlertMessage from "../interfaces/AlertMessage";
import MenuPopup from "./MenuPopup";

interface Props {
	setAlertMessage: Dispatch<SetStateAction<AlertMessage | null>>;
}

function Menu({ setAlertMessage }: Props) {
	const [showMenu, setShowMenu] = useState(false);

	function openMenu() {
		setShowMenu(true);
	}

	return <>
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
			setAlertMessage={setAlertMessage}
		/>
	</>
}

export default Menu;
