import { Dispatch, SetStateAction } from "react";
import { t } from "i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faDownload, faFolderOpen, faGlobe } from "@fortawesome/free-solid-svg-icons";

interface Props {
	show: boolean;
	setShow: Dispatch<SetStateAction<boolean>>;
}

function MenuPopup({ show, setShow }: Props) {
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

		}
	}];
	const itemsElem = items.map(({ title, icon, onClick }) => {
		return <div
			key={title}
			className="menu-item"
			role="button"
			onClick={onClick}>
			<FontAwesomeIcon icon={icon} fixedWidth />
			<span>{title}</span>
		</div>
	});

	if (!show) {
		return null;
	}
	return <div className="mask" onClick={closeMenu}>
		<div className="menu-popup">{itemsElem}</div>
	</div>
}

export default MenuPopup;
