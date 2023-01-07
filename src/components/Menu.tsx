import { useState } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import MenuPopup from "./MenuPopup";

function Menu() {
	const [showMenu, setShowMenu] = useState(false);

	function openMenu() {
		setShowMenu(true);
	}

	return <>
		<FontAwesomeIcon
			icon={faBars}
			size="xl"
			role="button"
			title={t("menu").toString()}
			onClick={openMenu}
		/>
		<MenuPopup show={showMenu} setShow={setShowMenu} />
	</>
}

export default Menu;
