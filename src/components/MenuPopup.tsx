import { Dispatch, SetStateAction } from "react";
import { t } from "i18next";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleInfo,
	faDownload,
	faFolderOpen,
	faStar,
	faUser
} from "@fortawesome/free-solid-svg-icons";

import AlertMessage from "../types/AlertMessage";

interface Props {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
	exportAsFile: () => void;
	openLocalFile: () => void;
	setAlertMessage: Dispatch<SetStateAction<AlertMessage | null>>;
}

function MenuPopup({
	show,
	setShow,
	exportAsFile,
	openLocalFile,
	setAlertMessage
}: Props) {
	function closeMenu() {
		setShow(false);
	}

	const items = [{
		title: t("importFromLocalFile"),
		icon: faFolderOpen,
		onClick: () => {
			openLocalFile();
			closeMenu();
		}
	}, {
		title: t("exportAsFile"),
		icon: faDownload,
		onClick: () => {
			exportAsFile();
			closeMenu();
		}
	}, {
		separator: true
	}, {
		title: t("starOnGithub"),
		icon: faStar,
		onClick: () => {
			window.open("https://github.com/shangzhenyang/encoder");
			closeMenu();
		}
	}, {
		title: t("authorsPortfolio"),
		icon: faUser,
		onClick: () => {
			window.open("https://www.yangshangzhen.com/");
			closeMenu();
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
	const itemsElem = items.map((
		{ separator, title, icon, onClick },
		index
	) => {
		if (separator) {
			return (
				<hr key={index} aria-hidden={true} />
			);
		}
		return (
			<div
				key={title}
				className="menu-item"
				role="menuitem"
				tabIndex={0}
				onClick={onClick}>
				{icon && <FontAwesomeIcon icon={icon} fixedWidth />}
				<span>{title}</span>
			</div>
		);
	});

	return (
		<Modal
			isOpen={show}
			className="menu-popup"
			overlayClassName="mask"
			role="menu"
			onRequestClose={closeMenu}
			shouldCloseOnOverlayClick={true}>
			{itemsElem}
		</Modal>
	);
}

export default MenuPopup;
