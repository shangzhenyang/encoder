import { useAppDispatch } from "@/redux/hooks";
import { setAlertMessage } from "@/redux/reducers/app";
import styles from "@/styles/MenuPopup.module.css";
import { handleKeyboardClick } from "@/utils";
import {
	faCircleInfo,
	faDownload,
	faFolderOpen,
	faStar,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { t } from "i18next";
import ReactModal from "react-modal";

interface MenuPopupProps {
	show: boolean;
	exportAsFile: () => void;
	openLocalFile: () => void;
	updateShowMenu: (newValue: boolean) => void;
}

function MenuPopup({
	show,
	exportAsFile,
	openLocalFile,
	updateShowMenu,
}: MenuPopupProps): JSX.Element {
	const dispatch = useAppDispatch();

	const closeMenu = (): void => {
		updateShowMenu(false);
	};

	const items = [{
		icon: faFolderOpen,
		onClick: (): void => {
			openLocalFile();
			closeMenu();
		},
		title: t("importFromLocalFile"),
	}, {
		icon: faDownload,
		onClick: (): void => {
			exportAsFile();
			closeMenu();
		},
		title: t("exportAsFile"),
	}, {
		separator: true,
	}, {
		icon: faStar,
		onClick: (): void => {
			window.open("https://github.com/shangzhenyang/encoder");
			closeMenu();
		},
		title: t("starOnGithub"),
	}, {
		icon: faUser,
		onClick: (): void => {
			window.open("https://www.yangshangzhen.com/");
			closeMenu();
		},
		title: t("authorsPortfolio"),
	}, {
		icon: faCircleInfo,
		onClick: (): void => {
			setTimeout(() => {
				dispatch(setAlertMessage({
					text: "Developed by Shangzhen Yang.",
					title: t("about"),
				}));
			}, 1);
			closeMenu();
		},
		title: t("about"),
	}];
	const itemsElem = items.map((
		{ separator, title, icon, onClick },
		index,
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

		return (
			<div
				key={title}
				className={styles["menu-item"]}
				role="menuitem"
				tabIndex={0}
				onClick={onClick}
				onKeyDown={onClick && handleKeyboardClick(onClick)}
			>
				{icon && <FontAwesomeIcon icon={icon} fixedWidth />}
				<span>{title}</span>
			</div>
		);
	});

	return (
		<ReactModal
			isOpen={show}
			className={styles["menu-popup"]}
			overlayClassName="mask"
			role="menu"
			onRequestClose={closeMenu}
			shouldCloseOnOverlayClick={true}
		>
			{itemsElem}
		</ReactModal>
	);
}

export default MenuPopup;
