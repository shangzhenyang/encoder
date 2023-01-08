import { Dispatch, SetStateAction } from "react";
import { t } from "i18next";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import ImageInfo from "../interfaces/ImageInfo";

interface Props {
	imageInfo: ImageInfo | null;
	setImageInfo: Dispatch<SetStateAction<ImageInfo | null>>;
}

function ImageViewer({ imageInfo, setImageInfo }: Props) {
	function closeDialog() {
		setImageInfo(null);
	}

	if (!imageInfo) {
		return null;
	}
	return <Modal
		isOpen={true}
		className="popup image-viewer"
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
}

export default ImageViewer;
