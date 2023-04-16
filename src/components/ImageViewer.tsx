import { Dispatch, SetStateAction } from "react";
import { t } from "i18next";
import classnames from "classnames";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import styles from "@/styles/ImageViewer.module.css";

import type ImageInfo from "@/types/ImageInfo";

interface Props {
	imageInfo: ImageInfo | null;
	setImageInfo: Dispatch<SetStateAction<ImageInfo | null>>;
}

function ImageViewer({ imageInfo, setImageInfo }: Props) {
	const closeDialog = () => {
		setImageInfo(null);
	};

	if (!imageInfo) {
		return null;
	}
	return (
		<Modal
			isOpen={true}
			className={classnames("popup", styles["image-viewer"])}
			overlayClassName="mask"
			onRequestClose={closeDialog}
			shouldCloseOnOverlayClick={true}>
			<header>
				<h1>{t("imageViewer")}</h1>
				<FontAwesomeIcon
					icon={faClose}
					size="lg"
					role="button"
					tabIndex={0}
					title={t("close").toString()}
					onClick={closeDialog}
				/>
			</header>
			<img src={imageInfo.src} alt={imageInfo.alt} />
		</Modal>
	);
}

export default ImageViewer;
