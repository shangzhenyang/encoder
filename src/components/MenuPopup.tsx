import { Dispatch, SetStateAction } from "react";
import { t } from "i18next";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faDownload,
	faFolderOpen,
	faGlobe
} from "@fortawesome/free-solid-svg-icons";

import AlertMessage from "../interfaces/AlertMessage";

interface Props {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	setAlertMessage: Dispatch<SetStateAction<AlertMessage | null>>;
}

function MenuPopup({ show, setShow, setAlertMessage }: Props) {
	function closeMenu() {
		setShow(false);
	}

	const items = [{
		title: t("importFromLocalFile"),
		icon: faFolderOpen,
		onClick: () => {

		}
	}, {
		title: t("importFromUrl"),
		icon: faGlobe,
		onClick: () => {

		}
	}, {
		title: t("exportAsFile"),
		icon: faDownload,
		onClick: () => {

		}
	}, {
		title: t("about"),
		icon: faCircleInfo,
		onClick: () => {
			setAlertMessage({
				title: t("about"),
				text: "Developed by Shangzhen Yang."
			});
			closeMenu();
		}
	}];
	const itemsElem = items.map(({ title, icon, onClick }) => {
		return <div
			key={title}
			className="menu-item"
			role="menuitem"
			tabIndex={0}
			onClick={onClick}>
			<FontAwesomeIcon icon={icon} fixedWidth />
			<span>{title}</span>
		</div>
	});

	return <Modal
		isOpen={show}
		className="modal"
		overlayClassName="mask"
		onRequestClose={closeMenu}
		shouldCloseOnOverlayClick={true}>
		<div className="menu-popup" role="menu">{itemsElem}</div>
	</Modal>
}

export default MenuPopup;
