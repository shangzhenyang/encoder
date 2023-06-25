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

import styles from "@/styles/MenuPopup.module.css";

import type { KeyboardEvent } from "react";
import type AlertMessage from "@/types/AlertMessage";

interface Props {
	show: boolean;
	exportAsFile: () => void;
	openLocalFile: () => void;
	updateAlertMessage: (newValue: AlertMessage | null) => void;
	updateShowMenu: (newValue: boolean) => void;
}

function MenuPopup({
	show,
	exportAsFile,
	openLocalFile,
	updateAlertMessage,
	updateShowMenu
}: Props): JSX.Element {
	const closeMenu = (): void => {
		updateShowMenu(false);
	};

	const items = [{
		title: t("importFromLocalFile"),
		icon: faFolderOpen,
		onClick: (): void => {
			openLocalFile();
			closeMenu();
		}
	}, {
		title: t("exportAsFile"),
		icon: faDownload,
		onClick: (): void => {
			exportAsFile();
			closeMenu();
		}
	}, {
		separator: true
	}, {
		title: t("starOnGithub"),
		icon: faStar,
		onClick: (): void => {
			window.open("https://github.com/shangzhenyang/encoder");
			closeMenu();
		}
	}, {
		title: t("authorsPortfolio"),
		icon: faUser,
		onClick: (): void => {
			window.open("https://www.yangshangzhen.com/");
			closeMenu();
		}
	}, {
		title: t("about"),
		icon: faCircleInfo,
		onClick: (): void => {
			updateAlertMessage({
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
				<hr
					key={index}
					className={styles["separator"]}
					aria-hidden={true}
				/>
			);
		}

		const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
			if (event.key === "Enter") {
				onClick?.();
			}
		};

		return (
			<div
				key={title}
				className={styles["menu-item"]}
				role="menuitem"
				tabIndex={0}
				onClick={onClick}
				onKeyDown={handleKeyDown}
			>
				{icon && <FontAwesomeIcon icon={icon} fixedWidth />}
				<span>{title}</span>
			</div>
		);
	});

	return (
		<Modal
			isOpen={show}
			className={styles["menu-popup"]}
			overlayClassName="mask"
			role="menu"
			onRequestClose={closeMenu}
			shouldCloseOnOverlayClick={true}
		>
			{itemsElem}
		</Modal>
	);
}

export default MenuPopup;
